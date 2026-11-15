# Proel Medical Technologies · landing

Landing de Proel (productos Leannec, RP Speciality y TurboSurge). Next.js 16 (App Router), React 19, Tailwind CSS 4 y `motion`.

> Antes de tocar la interfaz, leer [DESIGN.md](DESIGN.md): manda sobre cualquier otro estilo.

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # build de producción
```

## Estructura

| Ruta | Contenido |
| --- | --- |
| `src/app` | Layout, página única y estilos globales (`globals.css`) |
| `src/components/site` | Secciones de la landing (hero, nosotros, productos, clientes, contacto) |
| `src/components/ruixen` | Bloques de Ruixen en uso, adaptados a la paleta |
| `src/styles/palettes.css` | Colores de la marca: una paleta por bloque |
| `src/lib` | Paletas, hook de paleta y utilidades |

## Paletas de color

Los colores se definen una sola vez en `src/styles/palettes.css`. Hay un selector de paleta para revisión interna (abajo a la derecha); la elección se comparte con `?paleta=azul|verde|indigo|turquesa`.

Para **publicar la versión final** sin selector, definir en el hosting la variable de entorno:

```
NEXT_PUBLIC_PALETTE_SWITCHER=off
```

y volver a desplegar (se aplica en el build). Detalle en [DESIGN.md](DESIGN.md#variantes-de-paleta-revisión).

## Contenido pendiente

Capturas reales de los productos (`image` en `PRODUCTS`, `src/components/site/products.tsx`), logos de clientes (`logo` en `CLIENTS`, `src/components/site/proof.tsx`), logo oficial y datos de contacto de Proel. Ver DESIGN.md → Contenido.
