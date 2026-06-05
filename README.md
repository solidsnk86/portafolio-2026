# Portafolio 2026 - Gabriel Calcagni

Este proyecto es mi portafolio personal, diseñado para mostrar mi trayectoria, habilidades y proyectos como Desarrollador Full Stack. El objetivo es ofrecer una experiencia de usuario limpia, moderna y eficiente, reflejando mi enfoque en el desarrollo de productos escalables y útiles.

## ¿Qué muestra este proyecto?

Este portafolio no es solo una carta de presentación, sino una muestra funcional de mis capacidades técnicas y de diseño:

- **Perfil Profesional:** Una descripción detallada de mi enfoque de trabajo orientado a la simplicidad y el rendimiento.
- **Galería de Proyectos:** Exposición de trabajos realizados, con detalles técnicos y enlaces a repositorios o demos en vivo.
- **Blog Técnico:** Espacio donde comparto conocimientos y experiencias sobre desarrollo web, APIs y automatización.
- **Interactividad:** Sistema de tracking de vistas (CV y locación) integrado de forma transparente para análisis de alcance.
- **Diseño Adaptable:** Interfaz optimizada para cualquier dispositivo, con soporte para temas (claro/oscuro) y detalles visuales personalizados.

## Stack Técnico

He seleccionado estas herramientas para garantizar un desarrollo ágil y un producto final de alta calidad:

- **Framework:** [Next.js](https://nextjs.org/) (App Router) para una navegación rápida y SEO optimizado.
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) para un diseño responsivo y consistente.
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) para un código robusto y tipado.
- **Backend & Base de Datos:** [Supabase](https://supabase.com/) para la gestión de datos y métricas en tiempo real.
- **Blog:** Sistema basado en archivos **Markdown** locales para facilitar la creación de contenido.
- **Gestor de Paquetes:** [pnpm](https://pnpm.io/) para una gestión de dependencias eficiente y rápida.

## Integraciones y APIs

Este proyecto se alimenta de diversas fuentes de datos para mantener el contenido actualizado y dinámico:

- **GitHub API:** Se utiliza para obtener automáticamente la lista de mis repositorios públicos, estadísticas y el contenido de los archivos `README.md` para la renderización detallada de cada proyecto dentro del portafolio.
- **APIs Personales y CDN:** Utilizo servicios propios alojados en CDNs (como `cdn-js`) y endpoints personalizados para gestionar recursos dinámicos como frases aleatorias, configuraciones de visualización y metadatos que no requieren una base de datos pesada.


## Estructura del Proyecto

El proyecto sigue la arquitectura recomendada de Next.js:

- `app/`: Contiene las rutas, páginas principales y la lógica de la API.
- `components/`: Componentes modulares y reutilizables de la UI.
- `context/`: Proveedores de contexto para el manejo de estados globales (Tema, Locación).
- `utils/`: Utilidades compartidas y configuración de clientes externos (Supabase).
- `public/`: Recursos estáticos como imágenes y texturas.

## Configuración y Desarrollo

### Requisitos Previos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) y [pnpm](https://pnpm.io/).

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/solidsnk86/portafolio-2026.git
   ```
2. Instala las dependencias:
   ```bash
   pnpm install
   ```
3. Configura las variables de entorno:
   Crea un archivo `.env.local` en la raíz del proyecto. Estas variables son esenciales para que el proyecto pueda consultar las APIs de GitHub, Supabase y otros servicios:

   ```bash
   # GitHub API para renderización de proyectos
   GITHUB_TOKEN=tu_token_de_github
   GITHUB_OWNER=solidsnk86

   # Supabase para métricas y base de datos
   NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon_de_supabase

   # Notificaciones por Email (Gmail)
   GMAIL_USER=tu_correo@gmail.com
   GMAIL_USER_PASSWORD=tu_password_de_aplicacion

   # Otros servicios
   NEXT_PUBLIC_WEATHER_KEY=tu_api_key_de_clima
   COHERE_TRIAL_APIKEY=tu_api_key_de_cohere
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

### Ejecución en local

Inicia el servidor de desarrollo:

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Contacto

Si estás interesado en mi trabajo o tienes alguna propuesta, no dudes en contactarme:

- **Email:** [calcagni.gabriel86@gmail.com](mailto:calcagni.gabriel86@gmail.com)
- **LinkedIn:** [Gabriel](https://linkedin.com/in/gabriel)
- **GitHub:** [solidsnk86](https://github.com/solidsnk86)
- **Twitter/X:** [@CalcagniGabriel](https://x.com/CalcagniGabriel)
- **Web de Referencia:** [pascalecloset.com](http://pascalecloset.com/)

