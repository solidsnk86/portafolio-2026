Junio 19, 2026

# LinkData: una forma simple de compartir archivos y transmitir en vivoa

A lo largo de los años utilicé distintas herramientas para compartir archivos o mostrar mi pantalla de forma remota. Algunas requerían instalar aplicaciones, otras obligaban a crear una cuenta y muchas ofrecían más funciones de las que realmente necesitaba.

Con esa idea nació **LinkData**: una aplicación web enfocada en resolver dos problemas muy concretos de la manera más simple posible.

- Compartir la cámara o la pantalla en tiempo real mediante un enlace.
- Compartir un archivo temporal con un enlace de descarga.

Sin registros, sin instalaciones y con el menor número de pasos posible.

---

## Transmitiendo directamente entre navegadores

Para la funcionalidad de streaming decidí utilizar **WebRTC**, una tecnología que permite establecer conexiones directas entre navegadores.

Cuando un usuario inicia una transmisión, la aplicación genera un código único de sala que puede compartirse mediante un enlace. Quien reciba ese enlace simplemente lo abre en su navegador y comienza a visualizar la transmisión.

Una de las ventajas de este enfoque es que el contenido multimedia no pasa por mi servidor.

El video viaja directamente entre ambos navegadores (peer-to-peer), reduciendo la latencia y evitando consumir recursos innecesarios de infraestructura.

Para establecer esa conexión utilizo el servidor público de **PeerJS** únicamente como servidor de señalización. Su función es ayudar a que ambos navegadores puedan encontrarse; una vez creada la conexión, el video continúa viajando de forma directa.

Este enfoque resulta ideal para demostraciones, reuniones pequeñas, soporte remoto o simplemente compartir una pantalla entre pocas personas.

---

## Compartiendo archivos temporales

La segunda característica de LinkData busca resolver otra necesidad cotidiana: enviar archivos rápidamente.

En lugar de mantener archivos almacenados indefinidamente, decidí implementar un sistema de enlaces temporales.

El usuario selecciona un archivo, la aplicación genera un enlace y el destinatario puede descargarlo desde cualquier navegador.

Una vez realizada la descarga, el archivo se elimina automáticamente junto con el enlace asociado.

De esta manera se evita acumular archivos antiguos y se simplifica la gestión del almacenamiento.

---

## ¿Por qué utilizar Vercel Blob?

Para la subida de archivos elegí **Vercel Blob**.

Una de las razones principales es que el navegador puede subir los archivos directamente al almacenamiento, sin necesidad de enviarlos primero a una función Serverless.

Esto reduce el consumo de recursos del servidor y evita las limitaciones habituales relacionadas con el tamaño del payload en muchas APIs tradicionales.

Además, la integración con Next.js resulta bastante sencilla y permite mantener una arquitectura limpia.

---

## Decisiones de diseño

Durante el desarrollo hubo varias decisiones que tomé conscientemente.

El streaming está pensado para grupos pequeños de usuarios.

Aunque WebRTC funciona muy bien para este escenario, una aplicación destinada a cientos o miles de espectadores requeriría una arquitectura completamente diferente basada en un SFU, utilizando soluciones como LiveKit, Agora o Mux.

También decidí mantener el proyecto sin autenticación.

El objetivo era priorizar la rapidez de uso: generar un enlace y compartirlo inmediatamente, sin obligar al usuario a registrarse o iniciar sesión.

Por esa misma razón, los enlaces de descarga son temporales y desaparecen después del primer uso.

---

## Tecnologías utilizadas

Para construir LinkData utilicé un conjunto de herramientas que se complementan muy bien entre sí.

- **Next.js** como framework principal.
- **TypeScript** para mantener un código más robusto y fácil de mantener.
- **WebRTC** para las transmisiones en tiempo real.
- **PeerJS** para simplificar la señalización entre navegadores.
- **Vercel Blob** para el almacenamiento temporal de archivos.

Cada una cumple una función específica y permite mantener la aplicación relativamente simple sin perder flexibilidad.

---

## Lo que aprendí desarrollando LinkData

Uno de los aspectos más interesantes de este proyecto fue trabajar con tecnologías que normalmente no forman parte de una aplicación web tradicional.

Implementar conexiones WebRTC me permitió comprender mejor cómo se establece una comunicación peer-to-peer y cuál es el verdadero papel de un servidor de señalización.

También resultó interesante diseñar un flujo de transferencia de archivos que no dependiera completamente del servidor de la aplicación, aprovechando la subida directa hacia Vercel Blob.

Más allá de las tecnologías utilizadas, el proyecto reforzó una idea que intento aplicar cada vez más: muchas veces la mejor solución no es la que tiene más funcionalidades, sino la que resuelve un problema concreto con la menor complejidad posible.

---

## Conclusión

LinkData nació como un proyecto personal para resolver necesidades cotidianas de una forma simple y directa.

El resultado es una aplicación que combina transmisión en tiempo real y transferencia temporal de archivos en una misma plataforma, aprovechando tecnologías modernas como WebRTC, Next.js y Vercel Blob para ofrecer una experiencia rápida, sin instalaciones y basada únicamente en compartir un enlace.

Como todo proyecto, todavía tiene margen para crecer, pero también representa una excelente oportunidad para explorar arquitecturas de comunicación en tiempo real y diferentes estrategias de almacenamiento en aplicaciones web modernas.