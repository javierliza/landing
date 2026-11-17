# Proel Medical Technologies · landing

Landing de Proel (productos Leannec, RP Speciality, Onco-Office y TurboSurge). Next.js 16 (App Router), React 19, Tailwind CSS 4 y `motion`.

> Antes de tocar la interfaz, leer [DESIGN.md](DESIGN.md): manda sobre cualquier otro estilo.

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # build de producción
```

## Estructura (Senior Clean Architecture)

| Ruta | Contenido |
| --- | --- |
| `src/app` | Layout, página principal (`page.tsx`), favicon y estilos globales (`globals.css`) |
| `src/components/ui` | Primitivas y componentes atómicos de UI (Container, Wordmark, Label, Split, AnimatedLink, etc.) |
| `src/components/layout` | Componentes estructurales de diseño (Navbar, Footer, SectionRail) |
| `src/components/sections` | Secciones modulares de la landing (`hero`, `about`, `products`, `clients`, `contact`) |
| `src/components/common` | Observadores y utilidades de renderizado transversal (`RevealObserver`) |
| `src/constants` | Constantes de la aplicación (enlaces, accesos, navegación, testimonios, clientes) |
| `src/hooks` | Hooks personalizados de React (`usePalette`) |
| `src/lib` | Utilidades puras (`cn` / `utils.ts`, configuración de `palettes.ts`) |
| `src/styles` | Tokens de diseño y paletas de color (`palettes.css`) |
| `src/types` | Definiciones e interfaces de TypeScript |

## Paleta de color

La paleta institucional rige en modo **Petróleo** por defecto en `:root` dentro de `src/styles/palettes.css`. El selector flotante ha sido retirado de la vista frontal.
