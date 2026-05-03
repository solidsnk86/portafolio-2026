Julio 12, 2025

# Solid Geolocation: una API para programadores

En el desarrollo web moderno, muchas veces nos olvidamos del enorme potencial que tiene la **geolocalización** para crear experiencias más personalizadas y útiles.  
Por eso decidí crear **Solid Geolocation**, una API sencilla pero poderosa para obtener información de ubicación basada en tu dirección IP o en tus coordenadas GPS.

Hoy te cuento un poco sobre cómo surgió la idea, cómo funciona y qué la hace especial.

---

## ✨ La motivación

Muchas aplicaciones necesitan saber dónde estás: para mostrarte servicios cercanos, calcular distancias, ajustar horarios a tu zona o simplemente para ofrecer una experiencia más local.  
Pero no siempre es fácil acceder a una API gratuita, clara y rápida que devuelva exactamente los datos que necesitas.

Con esa premisa nació **Solid Geolocation**:  
una API REST construida con **Node.js** y **Express**, que devuelve información detallada en formato JSON sobre tu ubicación actual.

---

## 🧭 ¿Qué hace Solid Geolocation?

En esencia, la API ofrece dos formas de consultar:

- Por **IP pública**: simplemente accediendo al endpoint `/location`, la API detecta tu dirección IP y devuelve un objeto con ciudad, país, coordenadas, idioma del sistema, navegador que usás… incluso con el emoji de la bandera.
- Por **coordenadas GPS**: si tu aplicación ya obtiene la latitud y longitud (por ejemplo, usando la API de geolocalización del navegador), podés consultar al endpoint `/geolocation` con esos parámetros y recibir información enriquecida de esa posición exacta.

En ambos casos, la respuesta es clara y amigable, ideal para integrarla en un frontend o en una aplicación móvil.

---

## 🚀 Pensada para desarrolladores

Uno de los objetivos desde el principio fue que fuera cómoda para los desarrolladores.  
Por eso:

- No necesitas autenticación.
- Responde rápido.
- Incluye un limitador de tasa para proteger el servidor, pero suficientemente generoso para testing y desarrollo.
- Devuelve datos fáciles de consumir: ciudad, departamento, provincia, país, coordenadas, distancia a la plaza central y hasta el aeropuerto más cercano.

Me aseguré de que las respuestas incluyeran no solo los datos técnicos, sino también detalles útiles para usuarios finales.

---

## 📊 Datos curiosos

Uno de los puntos más interesantes al desarrollar esta API fue calcular también qué tan lejos está el usuario de lugares emblemáticos, como la **plaza central** de su ciudad o el **aeropuerto más cercano**.  
Estos pequeños detalles pueden hacer que una app sea más útil para turistas, repartidores, viajeros frecuentes, etc.

---

## 🌍 Probarla en vivo

La API está desplegada y lista para usarse en cualquier proyecto. Podés probarla ahora mismo visitando:

👉 [https://solid-geolocation.vercel.app/location](https://solid-geolocation.vercel.app/location)

O, si ya tenés tus propias coordenadas GPS, podés probar con el endpoint `/geolocation` de la siguiente manera.

```javascript
async function getCurrentLocation() {
  return await new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        resolve(coords);
      });
    } else {
      reject(new Error("Navigator doesn't allowed geolocation"));
    }
  });
}

async function getApiDataLocation({ latitude, longitude }) {
  return await fetch(
    `https://solid-geolocation.vercel.app/geolocation?lat=${latitude}&lon=${longitude}`,
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.log(error.message));
}

const coords = await getCurrentLocation();
const data = await getApiDataLocation({
  latitude: coords.latitude,
  longitude: coords.longitude,
});

console.log(JSON.stringify(data, null, 2));
```

## 👀 Vista de la web API

<div>
    <img src="https://raw.githubusercontent.com/solidsnk86/portfolio-2025-mgc/refs/heads/master/public/geo-location.png" width="100%" height="600px" alt="" />
</div>

---

**@solidSnk86 — 2024**

¡Espero que te resulte útil y, si tenés ideas o feedback, siempre son bienvenidos!
