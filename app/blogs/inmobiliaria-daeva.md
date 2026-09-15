Septiembre 14, 2026

# Inmobiliaria Daeva

Una inmobiliaria me pidió una web donde sus propiedades estuvieran bien presentadas y el equipo pudiera trabajar sobre ellas sin depender de una sola persona. Eso es Daeva.

## Qué tiene

Del lado del público:

- Grilla de propiedades con filtros de búsqueda.
- Detalle de cada propiedad con su información cargada.
- Comentarios en cada propiedad: los interesados dejan su consulta o mensaje ahí mismo.

Del lado del equipo:

- Registro y login de agentes.
- Panel de agente: cada quien ve y gestiona sus propiedades y responde los comentarios.
- Panel de administración: la inmobiliaria controla lo que se publica y modera los comentarios.

Los dos paneles están separados a propósito: el que busca ve las propiedades, y el que trabaja ve solo lo suyo. Nada se mezcla.

## Cómo lo armé

Lo primero que se definió fue la separación de perfiles. No tenía sentido que un agente viera el panel del administrador ni que el público se topara con las herramientas internas. Cada rol tiene lo suyo y nada más.

La parte de autenticación fue de las primeras: registro y login para que cada agente entre a su panel y las propiedades queden ligadas a quien las gestiona. Sin eso, no había forma de saber de quién era cada operación.

Los comentarios vinieron después, cuando el cliente pidió que la gente pudiera dejar su consulta en la propiedad, sin mails. Ahí el equipo también tiene la respuesta: el agente o el administrador contestan, y si un comentario es inapropiado, se bloquea. La conversación queda en el sitio, no afuera.

## En una frase

Una web de inmobiliaria con propiedades publicadas y filtrables, comentarios en cada una con respuesta y moderación, y dos paneles separados —agente y administración— para que el equipo trabaje sobre lo suyo.

---

👉 [Visitar el sitio](https://daeva.vercel.app)