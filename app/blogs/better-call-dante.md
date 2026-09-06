Septiembre 06, 2026

# Better Call Dante, el ecosistema judicial en un solo panel

Al principio era una simple automatización. Un proceso que recolectaba información judicial y la traía de vuelta para ahorrarle horas a un estudio de abogados. Pero cuando arrancás a conectar piezas, una cosa lleva a la otra, y sin darme cuenta estaba construyendo mucho más que un bot: estaba armando un solo entorno que concentra todo el ecosistema judicial de un estudio.

Así nació **Better Call Dante**: no como un proyecto pensado de arriba hacia abajo con diagramas y requerimientos, sino diseñado en base a necesidades reales que iban apareciendo. Y de esa manera, creativa y orgánica, terminó quedando una herramienta sólida, con mucho potencial y hoy en funcionamiento para tres clientes reales del estudio.

## De qué se trata

Better Call Dante es una plataforma privada para abogados, pensada para el uso interno de un estudio. Hoy está en su versión **0.1.1**, desplegada en modo prueba con login de Google. Reúne, en un único dashboard, todo lo que antes requería abrir varias pestañas distintas:

- las **notificaciones de correo** del estudio, resumidas automáticamente para no tener que abrir la bandeja;
- los **eventos del calendario** de Google;
- la **planilla de Google Sheets** con los casos y clientes del estudio;
- los **documentos** generados y archivados por cada caso;
- y los **fallos judiciales y jurisprudencia** consultados de forma integrada.

Todo eso se ve de un vistazo desde el panel principal. A eso se le suma la parte que le da el carácter: un asistente de IA con una cantidad enorme de herramientas, capaz de ejecutar acciones reales sobre todos esos servicios.

## Un panel que centraliza todo

El dashboard es el corazón. En lugar de saltar entre el correo, el calendario, las planillas, los archivos y los sistemas judiciales, el abogado abre un solo lugar y tiene el estado completo del estudio.

El dashboard carga todas estas fuentes en paralelo y, si algún servicio externo falla, degrada con valores por defecto en vez de tumbar todo el panel. Un detalle que se nota cuando trabajás con servicios de terceros reales.

## El asistente con herramientas reales

La parte que más potencial tiene es el agente. Le hablás en lenguaje natural y ejecuta tareas concretas sobre los servicios y los datos del estudio.

- _"Agendame un evento en el calendario para las 21:00, reservar cena en tal lugar, con tal duración"_ → el agente ya tiene la herramienta esperando para esa instrucción.
- Trabajar sobre la planilla del estudio → puede leer y escribir lo que se le pida.
- Generar documentos → con la información que tiene a disposición, puede crearlos.

Para el modelo uso la API de Groq por su velocidad de respuesta enorme. Y acá está una de las picardías que se me ocurrió sobre la marcha: para no agotar tan rápido los tokens del plan gratuito, armo una **cadena de modelos** que rota automáticamente cuando uno se queda sin cuota o devuelve error. Así el agente se mantiene vivo mucho más tiempo con los límites del free tier.

## Un entorno configurable

También le di una configuración visual cuidada a toda la app: se pueden cambiar los tonos de fondo, los accent colors y regular la opacidad. Tema claro y oscuro, todo responsive, con tooltips accesibles y animaciones. No es solo funcionalidad: la experiencia de uso también importa cuando es una herramienta que se usa todos los días.

## Lo que aprendí

Este proyecto me dejó algo claro: **el valor no está siempre en la complejidad inicial, sino en resolver un problema real de forma integrada**. Lo que empezó resolviendo una tarea puntual terminó siendo un entorno único que le da al estudio un panorama completo sin saltar entre herramientas. Las soluciones que más terminan gustando son las que surgen de la necesidad, se prueban en el campo con usuarios reales y crecen de a poco.

Better Call Dante sigue en crecimiento. Quedó una base muy sólida, y la sensación es que estoy desarrollando una app con mucho más potencial del que me di cuenta mientras la construía.
