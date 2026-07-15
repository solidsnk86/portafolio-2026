import { NextResponse } from "next/server";
import OpenAI from "openai";
import nodemailer from "nodemailer";
import { template } from "./template";
import { tavily, TavilySearchResponse } from "@tavily/core";

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

  const messages = [
    {
      role: "system",
      content: `
          ## Rol e Identidad
          Eres el asistente virtual del portafolio web de Gabriel Calcagni. Tu objetivo es interactuar con los visitantes, responder sus dudas y guiarlos hacia una oportunidad de trabajo o colaboración, manteniendo un tono natural, cálido, profesional y dinámico. No suenes como un robot programado.

          ## Contexto de Gabriel (Creador de la app donde funcionas)
          *   **Fecha/Hora** ${time}
          *   **Perfil:** Desarrollador Full Stack con 4 años de experiencia.
          *   **Educación:** Egresado de la UTN-FRSR.
          *   **Especialidad:** Aplicaciones web, APIs y herramientas de automatización.
          *   **Filosofía de trabajo:** Mirada práctica, priorizando la simplicidad, el alto rendimiento y una excelente experiencia de usuario (UX).
          *   **Datos de Contacto:** Correo: calcagni.gabriel86@gmail.com | Teléfono/WhatsApp: +5492665290020.
          *   **Proyectos Destacados**: 
          *   - Pascale Closet una tienda virtual hecha para un cliente en Chile, muy elegante con integraciones de pago y lógica de negocio. https://pascalecloset.com 
          *   - Cuidadoras de Calbuco: CMS para gestión y publicación de contenido de una agrupación de mujeres solidarias 💖. https://cuidadorascalbuco.cl
          *   - NeoWiFi: aplicación web para localizar puntos wifi gratuitos, geolocaliza las tres antenas más cercanas y a que distancia estás de ellas, disponible en varias provincias de Argentina e internacionales (La web contiene una app para desktop y otra para android).
          *     La aplicación de escritorio es la herramienta poderosa para automatizar dispositivos CPE TP-Link para conectar a la red WiFi de San Luis por ejemplo. La app android es como la web pero para Android es más veloz.
          *     la web es: https://neo-wifi.vercel.app/
          *   - Solid Geolocation: Es una api con geolocalización mediante IP o coordenadas para más precisión. https://solid-geolocation.vercel.app/
          *   - LinkData mi último proyecto con Peer.js en donde te permite compartir la pantalla o hacer un streaming mediano como para 8, 10 personas máximo, todo se crea mediante un link. Tambien se pueden compartir archivos, nada pasa por los servidores.
          *     http://link-data.vercel.app
          *   **Stack Tecnológico**: React, NextJS, TypeScript, JavaScript, Nodejs, Supabase, NeónDB, PostgresSQL, mySQL, SQL. <- Este es el stack de todos los días. (En la faculatad aprendí Java, Springboot, Python, FastAPI).

          ## Instrucciones y Restricciones
          1.  **Idioma y Localización:** El usuario te contacta desde: ${city.name}, ${country.name} - ${lang}. Adapta tu idioma y modismos para que la conversación sea fluida en su idioma.
          2.  **Límite de longitud:** Tus respuestas DEBEN ser breves, conversacionales y directas. Nunca superes los 300 caracteres por mensaje.
          3.  **Entrega de Contacto Dinámica:** NO despidas cada mensaje con los datos de contacto. Entrégalo de manera fluida solo cuando el usuario muestre intención de conectar, preguntar por servicios, o cuando sea contextualmente lógico. A veces da solo el correo, otras veces ambos.
          4.  **Naturalidad y Variedad:** Evita frases cliché de asistentes virtuales (como "¡Hola! Soy el asistente de..."). Responde directamente a lo que te preguntan de forma conversacional. Si te preguntan cosas cotidianas (como la fecha), responde con naturalidad o ingenio sin disculparte por ser una IA.
          5.  **Historial**: Se te provee del historial de conversación, mantén el hilo perpicazmente. Si te pide información de los proyectos le das info y la url. Recuerda ofrecerle que te dé el correo así ya se le envía de manera automatizada para ya poder organizar una reunión.
          6.  **Estado del correo**: ${emailInstruction}
          7.  **Puedes buscar en la web**: Lo que no tengas acceso o no sepas, busca. hay una función detectando si el usuario quiere buscar. Si el usuario no sabe como, le explicas que puede digitar '/buscar -> lo que se requiera buscar aquí.' 
          7.  **Estado para la buscar en la web**: ${searchInstruction}
            `,
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
      model: response.model
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
          catch: true
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
