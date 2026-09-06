# Inmobiliaria Daeva — Frontend

SPA del front de **Inmobiliaria Daeva**: propiedades en venta/alquiler, reservas con seña vía MercadoPago, panel de agente y panel de administración.

> **Estado:** SPA en React + Vite, con endpoints serverless en Vercel para carga de imágenes.

## Stack

| Componente | Detalle |
|---|---|
| Build | Vite 7 + `@vitejs/plugin-react` |
| Lenguaje | TypeScript + algunos `.jsx` heredados |
| UI | React 19 + Tailwind CSS 4 (`@tailwindcss/vite`) |
| Iconos | `lucide-react`, `react-icons` |
| Carruseles | Swiper 12 |
| Server state | TanStack Query v5 |
| Client state | Zustand v5 (`persist` donde aplica) |
| Router | react-router-dom v7 |
| SEO | react-helmet-async |
| Validación | zod v4 (uso mínimo aún) |
| Pagos | `@mercadopago/sdk-react` (seña de reserva) |
| Imágenes | `@vercel/blob` + `browser-image-compression` (serverless en `api/`) |

## Rutas principales

### Públicas

| Ruta | Página |
|---|---|
| `/` | Home |
| `/properties` | Catálogo de propiedades |
| `/property/:id` | Detalle de propiedad |
| `/search` | Resultados de búsqueda |
| `/login` | Iniciar sesión |
| `/register` | Registrarse |
| `/about` | Sobre nosotros |
| `/help` | Ayuda |

### Protegidas — Cliente

| Ruta | Página |
|---|---|
| `/user/profile` | Mi perfil |
| `/reservations/mine` | Mis reservas |

### Protegidas — Agente

| Ruta | Página |
|---|---|
| `/agent/dashboard` | Panel de agente |
| `/agent/properties` | Gestión de propiedades |
| `/agent/properties/new` | Crear propiedad |
| `/agent/properties/edit/:id` | Editar propiedad |
| `/agent/reservations` | Historial de reservas |
| `/agent/reservations/:id` | Detalle de reserva |

## Arquitectura

```
services/         ← Fetch puro: una función por endpoint, sin React
hooks/queries/    ← useQuery/useMutation por dominio, invalidaciones y toasts
store/            ← Solo estado de cliente: auth, favoritos, tema
types/            ← Contratos TS espejo del schema DB
pages/            ← Vistas, sin lógica de fetch directa
```

**Reglas clave:**
- Ningún componente llama a `fetch` directamente: siempre `service → hook query`.
- Queries keys por dominio: `["properties", filters]`, `["favorites"]`, etc.
- Mutations invalidan la key correspondiente.
- Zustand con `persist` solo donde tiene sentido (favoritos offline, theme).
- La sesión viaja en cookie httpOnly, nunca en localStorage.

## Enums del sistema

| Campo | Valores |
|---|---|
| `listing_operation` | `venta`, `alquiler`, `alquiler_temporal` |
| `listing_type` | `casa`, `departamento`, `ph`, `terreno`, `local`, `oficina`, `campo`, `quinta` |
| `listing_status` | `disponible`, `reservada`, `vendida`, `alquilada`, `pausada`, `borrador` |
| `reservation_status` | `pendiente`, `aprobada`, `cancelada`, `expirada`, `completada` |
| `currency_code` | `USD`, `ARS` |
| `roles` | `admin`, `agente`, `cliente` |

## Deploy

Configurado para **Vercel**, con `vercel.json` que redirige todas las rutas al `index.html` (SPA rewrite).

## Notas

- Backend en repositorio separado (`backend-inmobiliaria`).
- Roles con rutas protegidas por tipo de usuario (guard por rol).
- Migración de un e-commerce anterior hacia inmobiliaria, con progreso documentado.