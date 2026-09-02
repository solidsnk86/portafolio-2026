import { NextResponse } from "next/server";
import OpenAI from "openai";
import nodemailer from "nodemailer";
import { template } from "./template";
import { instruction } from "./const";

const client = new OpenAI({
  apiKey: process.env.SOLID_SNK_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});
const ownEmail = process.env.GMAIL_USER ?? "clacagni.gabriel86@gmail.com";

const browserSearchTool = {
  type: "browser_search",
} as unknown as OpenAI.ChatCompletionTool;

const sendEmailTool: OpenAI.ChatCompletionTool = {
  type: "function",
  function: {
    name: "send_confirmation_email",
    description:
      "Envía automáticamente el mail de confirmación de contacto al visitante del portafolio. Usala cuando el usuario comparta su dirección de correo o pida ser contactado.",
    parameters: {
      type: "object",
      properties: {
        email: {
          type: "string",
          description: "Dirección de correo electrónico válida del visitante.",
        },
      },
      required: ["email"],
    },
  },
};

function stripCitations(text: string | null) {
  return text?.replace(/ ?【\d+†[^】]*】/g, "") ?? null;
}

async function sendConfirmationEmail(userEmail: string, createdAt: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: ownEmail,
      pass: process.env.GMAIL_USER_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: ownEmail,
    to: userEmail,
    subject: "¡Gracias por contactarme " + userEmail.split("@")[0],
    html: template({
      userEmail,
      userName: userEmail.split("@")[0],
      ownEmail,
      message:
        "Me encantaría coordinar una reunión para escuchar bien tu idea y ver cómo puedo ayudarte. ¿Cuándo te queda cómodo?. Agendamos una videollamada de 15-20 min esta semana?",
      date: new Date(createdAt).toLocaleDateString("es-AR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      portfolioUrl: "http://gabrielcalcagni.vercel.app/",
    }),
  });
}

export async function POST(request: Request) {
  const { query, historyChat, city, country, lang, time, createdAt } =
    await request.json();

  if (!query || !city || !country || !lang || !time) {
    return NextResponse.json({ message: "Faltan parámetros" });
  }

  let emailStatus = "no_aplica" as "no_aplica" | "enviado" | "fallo";

  const params = {
    time,
    city,
    country,
    lang,
  };
  const messages: OpenAI.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: instruction({ params }),
    },
    ...(Array.isArray(historyChat) ? historyChat : []),
    { role: "user", content: query },
  ];

  async function runChat(model: string) {
    const tools = [browserSearchTool, sendEmailTool];
    let response = await client.chat.completions.create({
      model,
      messages,
      tools,
    });
    let usage = response.usage;
    let message = response.choices[0].message;

    const fnCalls = (message.tool_calls ?? []).filter(
      (c): c is OpenAI.ChatCompletionMessageFunctionToolCall =>
        c.type === "function",
    );

    if (fnCalls.length > 0) {
      const followUpMessages: OpenAI.ChatCompletionMessageParam[] = [
        ...messages,
        {
          role: "assistant",
          content: message.content,
          tool_calls: message.tool_calls,
        } as OpenAI.ChatCompletionAssistantMessageParam,
      ];

      for (const call of fnCalls) {
        if (call.function.name !== "send_confirmation_email") continue;
        let result: string;
        try {
          const args = JSON.parse(call.function.arguments || "{}") as {
            email?: string;
          };
          const email = args.email?.trim() ?? "";
          if (/^[^\s]+@[^\s]+\.[^\s]+$/.test(email)) {
            await sendConfirmationEmail(email, createdAt);
            emailStatus = "enviado";
            result = `OK: el correo de confirmación fue enviado exitosamente a ${email}.`;
          } else {
            result =
              "ERROR: la dirección de correo proporcionada no es válida. Pedile al usuario que la corrija.";
          }
        } catch (err) {
          console.error("Error enviando correo:", err);
          emailStatus = "fallo";
          result =
            "ERROR: no se pudo enviar el correo en este momento. Disculpate y sugerile escribir directo a " +
            ownEmail +
            ".";
        }
        followUpMessages.push({
          role: "tool",
          tool_call_id: call.id,
          content: result,
        });
      }

      response = await client.chat.completions.create({
        model,
        messages: followUpMessages,
        tools,
      });
      message = response.choices[0].message;
      usage = response.usage;
    }

    return {
      context: stripCitations(message.content),
      usedSearch: !!(message as unknown as { executed_tools?: unknown[] })
        .executed_tools?.length,
      model: response.model,
      usage
    };
  }

  try {
    const result = await runChat("openai/gpt-oss-120b");

    return NextResponse.json({
      context: result.context,
      emailSent: emailStatus === "enviado",
      createdAt,
      usedSearch: result.usedSearch,
      model: result.model,
      usage: result.usage
    });
  } catch (error) {
    if ((error as TypeError).message.includes("429")) {
      try {
        const result = await runChat("openai/gpt-oss-20b");

        return NextResponse.json({
          context: result.context,
          emailSent: emailStatus === "enviado",
          createdAt,
          usedSearch: result.usedSearch,
          model: result.model,
          catch: true,
        });
      } catch (subErr) {
        return NextResponse.json({
          message: "Error en el servidor: " + (subErr as TypeError).message,
        });
      }
    }
    return NextResponse.json({
      message: "Error en el servidor: " + (error as TypeError).message,
    });
  }
}
