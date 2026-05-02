<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Guía rápida: colores, Tailwind, estado y arquitectura

- **Colores (variables CSS):** usar siempre las variables definidas en `app/globals.css` para colores de texto y fondos. Variables principales disponibles: `--foreground`, `--muted-foreground`, `--secondary`, `--border-color`, `--accent`, `--bg-card`. No usar colores hex hardcodeados en componentes.

- **Cómo referenciar desde Tailwind:** preferir mapear las variables en `tailwind.config.js` o usar valores arbitrarios cuando haga falta. Ejemplos:
	- En `tailwind.config.js` (recomendado):
		```js
		// tailwind.config.js
		module.exports = {
			theme: {
				extend: {
					colors: {
						foreground: 'var(--foreground)',
						muted: 'var(--muted-foreground)',
						bgCard: 'var(--bg-card)',
					},
				},
			},
		};
		```
	- En clases Tailwind directamente (cuando no se mapeó): `className="text-[color:var(--foreground)]"` o `className="bg-[color:var(--bg-card)]"`.

- **Tipografía:** usar las variables de fuente que definimos (por ejemplo `--font-poppins` y `--font-playfair`) y mapearlas a las utilidades de Tailwind (`font-sans`, `font-serif`) para consistencia.

- **Estado global:** usamos `zustand` para gestionar estado local/global ligero. Convenciones:
	- Carpeta `store/` con un archivo por dominio (ej. `store/useAuthStore.ts`).
	- Exportar selectores y funciones encapsuladas (no exponer el store entero si no es necesario).
	- Si se persiste, hacerlo explícito y documentado (ej. `persist` middleware).

- **Patrones de arquitectura:** seguir un patrón por características (feature folders). Estructura sugerida:
	- `components/` — UI puros y reutilizables (subcarpeta `common/`).
	- `features/` — paquetes funcionales con `ui/`, `hooks/`, `services/`, `types/`.
	- `utils/` o `lib/` — helpers independientes (API clients, formaters).
	- `services/` — integraciones externas (Supabase client, wrappers API).
	- `store/` — Zustand stores.
	- `hooks/` — hooks reutilizables.

- **Convenciones:** componentes pequeños y responsables de una única cosa; separar presentación (pure components) de lógica (containers/services); tipar todo con `TypeScript`; exportar a través de `index.ts` barrels donde tenga sentido.

Agregar estas reglas en el README o docs del repo ayuda a mantener consistencia entre colaboradores.

