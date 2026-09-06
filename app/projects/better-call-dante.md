# Better Call Dante

Una plataforma privada para un estudio de abogados que centraliza el ecosistema judicial en un solo panel: notificaciones de correo, calendario de Google, planilla de casos y clientes en Sheets, documentos archivados y jurisprudencia consultada de forma integrada. Incluye un asistente de IA con herramientas reales capaz de ejecutar acciones sobre esos servicios.

> **Estado:** v0.1.1 · uso interno de un estudio · acceso con login de Google.

## Qué resuelve

Antes, revisar el día implicaba abrir el correo, el calendario, las planillas, los archivos y los sistemas judiciales por separado. Better Call Dante junta todo eso en un único dashboard que se lee de un vistazo:

- **Notificaciones de correo:** mensajes del estudio resumidos automáticamente, sin entrar a la bandeja.
- **Calendario de Google:** agenda con gestión de eventos.
- **Sheets:** planilla de casos y clientes del estudio, editable.
- **Documentos:** archivos generados y archivados por cada caso.
- **Jurisprudencia:** fallos judiciales consultados de forma integrada.

## Asistente de IA

Chat con un agente con herramientas reales: agendar eventos en Calendar, operar sobre la planilla del estudio, generar documentos y consultar notificaciones y jurisprudencia. Usa la API de Groq por su velocidad, con una **cadena de modelos** que rota automáticamente cuando uno del free tier se queda sin cuota, estirando el presupuesto de tokens.

## Stack

- **Frontend:** Next.js (App Router) · TypeScript · Tailwind CSS
- **Auth & DB:** Supabase (OAuth de Google)
- **APIs de Google:** googleapis (Calendar, Drive, Sheets)
- **IA:** API de Groq con cadena de modelos (incluye la herramienta de búsqueda web del modelo)
- **Email:** Nodemailer (Gmail)
- **Voz:** Web Speech API del navegador (transcripción de voz a texto)
- **Backend:** Node.js (workflows y tareas periódicas)

## Funcionalidades

- Login con Google.
- Dashboard con carga en paralelo de todas las fuentes y degradación segura si un servicio externo falla.
- CRUD sobre Google Calendar, Sheets y Drive.
- Notificaciones de correo con resumen generado por IA.
- Consulta integrada de jurisprudencia.
- Asistente IA con herramientas: agenda, planilla, notificaciones, jurisprudencia y generación de documentos.
- Entrada por voz con la Web Speech API del navegador para dictar al asistente.
- Panel de configuración visual: tonos de fondo, accent colors, opacidad.
- Temas claro/oscuro, diseño responsive, tooltips accesibles.

## En una frase

Un solo entorno para todo un ecosistema judicial, que nació resolviendo una tarea puntual y terminó siendo una herramienta sólida con un asistente IA integrado.
