# Better Call Dante — Ecosistema judicial

Plataforma privada para abogados que centraliza el ecosistema judicial de un estudio en un único dashboard: correo, calendario, planilla de casos, documentos por expediente y jurisprudencia, con un asistente de IA que ejecuta acciones reales sobre esos servicios.

> **Estado:** v0.3.0 · en producción interna para tres clientes reales del estudio · acceso con login de Google.

## Stack

| Componente | Detalle |
|---|---|
| Frontend | Next.js (App Router) + TypeScript + Tailwind CSS |
| Auth & DB | Supabase (OAuth de Google) |
| Integraciones Google | `googleapis` (Calendar, Drive, Sheets) |
| IA | API de Groq + cadena de modelos con rotación por cuota/error |
| Email | Nodemailer (Gmail) |
| Voz | Web Speech API del navegador (dictado al asistente) |
| Scraping judicial | Playwright |
| Background jobs | Node.js (workflows y tareas periódicas) |
| Deploy | Vercel |

## Módulos del panel

Cada módulo se alimenta de una fuente externa y se resuelve en paralelo. Si una falla, el panel degrada con valores por defecto en lugar de tumparse.

| Módulo | Fuente | Qué resuelve |
|---|---|---|
| Correo | Gmail | Notificaciones del estudio resumidas por IA, sin entrar a la bandeja |
| Calendario | Google Calendar | Eventos del estudio, con creación y gestión |
| Planilla | Google Sheets | Casos y clientes como fuente de datos editable |
| Documentos | Google Drive | Archivos generados y archivados por expediente |
| Jurisprudencia | Scraper (Playwright) | Fallos judiciales y jurisprudencia consultables desde el panel |

## Herramientas del agente

El asistente se maneja por lenguaje natural y opera sobre los mismos servicios que los módulos del panel.

| Herramienta | Acciones |
|---|---|
| Calendario | Consultar, crear, modificar y eliminar eventos |
| Planilla | Leer, actualizar, completar y organizar registros |
| Documentos | Generar documentos a partir de la información del caso, listos para archivar |
| Jurisprudencia | Traer fallos relevantes directo al chat |
| Correo | Resumir, organizar y agendar sin salir del panel |

### Cadena de modelos

El modelo por defecto es Groq, elegido por velocidad de respuesta. Para no agotar rápido los tokens del plan gratuito, la app mantiene una **cadena de modelos** que rota automáticamente cuando uno se queda sin cuota o devuelve error, extendiendo la vida del agente dentro de los límites del free tier.

## Personalización

Panel de configuración visual con:

- Tonos de fondo y *accent colors* configurables.
- Opacidad regulable.
- Tema claro/oscuro y diseño responsive.
- Preferencias persistentes entre sesiones.
- Tooltips accesibles y microanimaciones sutiles.

## Estabilidad

- Carga en paralelo de todas las fuentes con degradación segura por módulo.
- Estados vacíos por módulo cuando la fuente no devuelve datos.
- Tolerancia a caídas de red y manejo de errores diferenciado por origen.
- Optimización de renderizado, carga inicial y navegación.

## Notas

- Separación de información por usuario: calendarios, archivos y datos asociados a cada integrante del estudio.
- Origen del proyecto: una automatización de scraping judicial que, al conectar las piezas, se transformó en el entorno integrado que es hoy.
