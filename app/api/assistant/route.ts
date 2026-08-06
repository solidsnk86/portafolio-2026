import { NextResponse } from "next/server";
import OpenAI from "openai";
import nodemailer from "nodemailer";
import { template } from "./template";
import { tavily, TavilySearchResponse } from "@tavily/core";
import { instruction } from "./const";

const client = new OpenAI({
  apiKey: process.env.SOLID_SNK_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});
const tvly = tavily({ apiKey: process.env.TVLY_API_KEY });
const ownEmail = process.env.GMAIL_USER ?? "clacagni.gabriel86@gmail.com";

function detectEmail(text: string) {
  const match = text.match(/[^\s]+@[^\s]+\.[^\s]+/);
  return match?.[0]?.replace(/[.,;:!?]+$/, "");
}

function searchDetected(text: string) {
  const match =
    text.toLowerCase().match("buscar") ||
    text.toLowerCase().match("búsqueda") ||
    text.toLowerCase().match("/buscar");
  return match?.[0];
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

  const userEmail = detectEmail(query);
  const search = searchDetected(query);

  let emailStatus: "no_aplica" | "enviado" | "fallo" = "no_aplica";
  let searchStatus: "no_aplica" | "buscado" | "fallo" = "no_aplica";
  let responseTime: number = 0;
  let searchResult: TavilySearchResponse["results"] = [];

  if (userEmail) {
    try {
      await sendConfirmationEmail(userEmail, createdAt);
      emailStatus = "enviado";
    } catch (err) {
      console.error("Error enviando correo:", err);
      emailStatus = "fallo";
    }
  }

  if (search) {
    try {
      const searchResponse = await tvly.search(query);
      const results = searchResponse.results;
      searchResult = results;
      responseTime = searchResponse.responseTime;
      searchStatus = "buscado";
    } catch (error) {
      console.log("Error al buscar en la web:", error);
      searchStatus = "fallo";
      responseTime = 0;
      searchResult = [];
    }
  }

  const emailInstruction =
    emailStatus === "enviado"
      ? `Se detectó el correo [${userEmail}] y el envío fue EXITOSO. Avisale al usuario que el mail de confirmación ya está en camino.`
      : emailStatus === "fallo"
        ? `Se detectó el correo [${userEmail}] pero el envío FALLÓ. Pedile disculpas breves y decile que te escriba directo a ${ownEmail} o por WhatsApp +5492665290020 para coordinar.`
        : `No se detectó ningún correo en el mensaje del usuario.`;

  const searchInstruction =
    searchStatus === "buscado"
      ? `Se detectó que el usuario quiere realizar una búsqueda, por lo que la búsqueda con tavily devuelve el resultado: [${JSON.stringify(searchResult, null, 2)}] -> Los resultados deben ser presentados en markdown usando y mapeando todo el array del results y quede bien estilado usando los estilos markdown disponibles para una buena presentación con, title, content, url, ...etc.
  `
      : searchStatus === "fallo"
        ? `Se detectó la sugerencia de búsqueda del usuario pero terminó en error o FALLÓ, se le pide disculpas y se sugiere buscar de nuevo.`
        : `No se detectó o se sugerió ninguna busqueda por parte del usuario.`;

  const params = {
    time,
    city,
    country,
    lang,
    emailInstruction,
    searchInstruction,
  };
  const messages = [
    {
      role: "system",
      content: instruction({ params }),
    },
    ...(Array.isArray(historyChat) ? historyChat : []),
    { role: "user", content: query },
  ];

  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
    });

    return NextResponse.json({
      context: response.choices[0].message?.content,
      emailSent: emailStatus === "enviado",
      createdAt,
      searched: searchStatus === "buscado",
      searchResult,
      responseTime,
      model: response.model,
    });
  } catch (error) {
    if ((error as TypeError).message.includes("429")) {
      try {
        const response = await client.chat.completions.create({
          model: "llama-3.1-8b-instant",
          messages,
        });

        return NextResponse.json({
          context: response.choices[0].message?.content,
          emailSent: emailStatus === "enviado",
          createdAt,
          searched: searchStatus === "buscado",
          searchResult,
          responseTime,
          model: response.model,
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
