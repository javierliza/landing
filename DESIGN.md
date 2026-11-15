# Proel Medical Technologies — Guía de diseño

Referencia visual: canvas de Claude Design "Landing v7 (paleta C)" y "Brand kit v4".
Este archivo manda sobre cualquier otra decisión de estilo. Leerlo antes de tocar la UI.

## Identidad
Tono de voz: voseo rioplatense en toda la página ("Pedí", "Conocé", "Obtené", "tus necesidades"); nunca "usted".
Corporativo, sobrio, de agencia profesional. No debe parecer hecho con IA.
Fuente: Public Sans (400/500/600/700). Títulos peso 600, tracking levemente negativo.
Botones y chips con radio 4px (no pill). Sombras sutiles, nunca glows.

## Colores y paletas
Los colores viven en un solo lugar: `src/styles/palettes.css` (14 variables `--pal-*` por paleta). `globals.css` los expone a Tailwind como `--color-*` (`bg-primary`, `text-ink`, `border-line`…). Los componentes nunca escriben hexadecimales: usan estas utilidades o `var(--color-*)`. Los degradés que dependen de la paleta son utilidades `bg-grad-*` en `globals.css`, armadas con `color-mix` sobre los tokens.
Paleta vigente (`turquesa`): ink #111827 · ink-2 #1F2A3C · primary #0E7490 · primary-dark #0A5A72 · primary-light #1A93B3 · accent #67C8DA · slate #404B5A · gray #5B6675 · bg #F4F6F8 · chip #ECEFF2 · line #DDE3E9 · line-strong #CBD3DB · on-dark #D6E6EC / #BCC6D2.
Estados (no cambian con la paleta): verde #1B6B49 sobre #DCEFE6, ámbar #8A5A00 sobre #FDF0CF.
Turquesa primario para acción; turquesa claro solo sobre grafito.

### Variantes de paleta (revisión)
Hay cuatro (`turquesa`, `azul`, `verde`, `indigo`). Un selector fijo abajo a la derecha las cambia en vivo; la elección queda en la URL (`?paleta=azul`) y en el navegador. Para publicar la versión final: definir `NEXT_PUBLIC_PALETTE_SWITCHER=off` en el hosting (el selector y su script desaparecen) y dejar en `palettes.css` solo la paleta elegida.
Agregar una paleta: copiar un bloque de `palettes.css`, cambiar nombre y valores, y sumarla en `src/lib/palettes.ts`. Exigir contraste AA: texto sobre fondo ≥ 4.5:1 (blanco sobre `primary`, `gray` sobre `bg`, `on-dark-muted` sobre `ink-2`).
El favicon (`src/app/icon.svg`) y el fondo WebGL de Productos (recibe `ink` y `primary` por props) son los únicos colores que no son CSS: el favicon queda fijo en turquesa.

## Estructura de la landing (en este orden)
Grilla editorial de 12 columnas (contenedor 1280 px). Cada sección abre con un rótulo (cuadrado turquesa + nombre); en Nosotros y Clientes el rótulo ocupa 3 columnas y el contenido 9. Todas las secciones tienen su `h2` (en Nosotros y Clientes el rótulo es el `h2`).
1. Header fijo, borde inferior fino. Enlaces Nosotros · Productos · Clientes · Contacto, todos con el mismo estilo de texto (Contacto no es un botón) y, a la derecha, el menú "Acceso usuarios".
2. Hero: fondo grafito a pantalla completa, titular blanco a gran escala (hasta 92 px) que dice qué hace Proel ("Gestionamos tratamientos médicos de punta a punta"), regla fina y, debajo, firma a la izquierda y bajada + dos CTAs a la derecha ("Pedí una demo" → contacto, "Conocé los productos"). De fondo, líneas de flujo: un haz de curvas finas turquesa (SVG propio) que nace abajo a la izquierda y se abre hacia arriba a la derecha, con tres puntos cuadrados que las recorren; se apaga de forma gradual hacia la izquierda (máscara). Reemplazó a la trama de anillos (`neon-circle-grid` ya no se usa). Los bloques sólidos, el circuito en miniatura y el bloque "ventana" se probaron y se quitaron: no volver a agregarlos.
3. (Eliminada) La franja grafito bajo el hero se quitó; no volver a agregarla.
4. Nosotros: una oración grande con cifras en línea + timeline de 4 columnas (2009 / 2011 / 2016 / Hoy).
5. Productos y plataforma (una sola sección, grafito; no volver a separarlas), contada como circuito: una línea con las etapas de la gestión (Receta, Auditoría, Dispensa, Recupero) y los tres productos como botones iguales en una sola línea (en escritorio siempre una línea), cada uno nombrando las etapas que cubre (`stages` en PRODUCTS). Al elegir un producto (cursor, clic o teclado) se ilumina su tramo en turquesa claro y se abre debajo su detalle en un panel blanco: público, nombre, descripción, "Incluye/Módulos", CTA y espacio para la captura (`ImageSlot`; completar `image`). Al pie, una sola pieza translúcida (fondo blanco al 4 % con desenfoque) con "Plataforma Proel" y los organismos con los que conecta: el turquesa de la plataforma se funde en degradé hacia los organismos, sin división entre ambos. Es una excepción deliberada a la regla de no usar degradés ni desenfoques. En móvil los productos son botones en fila y el resto se mantiene. Etapas por producto: RP Speciality = Receta (deducido, a confirmar); Leannec = Auditoría, Dispensa (deducido, a confirmar); TurboSurge = Recupero (confirmado por Proel: Recupero es solo de TurboSurge).
7. Clientes: un testimonio grande a la vez, con controles compactos (segmentos finos de avance, pausa y flechas sin borde); debajo, "Confían en nosotros": una sola línea de clientes que se desliza. Al pasar el cursor la fila se detiene, el cliente señalado se resalta (tinta + subrayado turquesa; el logo recupera su color) y los demás se atenúan. Con reducción de movimiento queda fija. Muestra el nombre hasta tener el archivo de logo (public/clients/). Los testimonios tienen botón de pausa/reanudar; la fila de clientes no lleva controles (se detiene al pasar el cursor).
8. Contacto: fondo en degradé vertical de turquesa a grafito (se funde con el pie) con dos halos de luz suaves (degradés radiales; no repetir aquí la trama de anillos de la portada); formulario como panel translúcido (vidrio con desenfoque, campos translúcidos y botón blanco). Es una excepción deliberada a la regla de no usar degradés ni desenfoques. Dos columnas: titular, texto, correo y teléfono a la izquierda; formulario "Pedí una demo" a la derecha (nombre, organización, email, producto de interés, mensaje). Sin servidor: al enviar abre el correo del visitante con la consulta redactada. Footer sobrio (columnas de enlaces y copyright, sin wordmark gigante).

Lenguaje común de toda la página (aplicado tras la auditoría; mantenerlo en secciones nuevas):
- Encabezado fijo: sobre la portada, vidrio oscuro (grafito al 75 % con desenfoque y línea inferior fina) con texto blanco pleno, para que no se pierda sobre la trama; al bajar, vidrio claro (blanco al 90 % con desenfoque).
- Fondos de sección planos: Nosotros en blanco y Clientes en gris claro (`bg`), sin degradés ni halos; los cambios de sección son cortes limpios de color. El único degradé de fondo es el de Contacto, que baja de turquesa a grafito y se funde con el pie. No agregar más degradés de fondo ni transiciones fundidas entre secciones (se probó y se descartó por exceso).
- Paneles translúcidos con brillo fino en el borde superior: detalle de producto, pieza de plataforma, testimonio y formulario. No usar tarjetas blancas sólidas sobre fondos oscuros.
- Líneas con nodos cuadrados que se llenan: circuito de Productos y trayectoria de Nosotros comparten el mismo dibujo.
- Detalle de producto: texto, módulos y CTA a la izquierda; a la derecha la captura dentro de un marco de ventana (barra con tres cuadrados) que se sale por el borde inferior derecho del panel. Sin `image` cargada, el marco muestra un espacio reservado oscuro con el rótulo; no quitar el marco.

## Movimiento
La página no debe sentirse estática: el movimiento responde al scroll y a la interacción, nunca es decorativo.
- Header: barra de progreso de lectura y enlace de la sección activa subrayado. En pantallas de 1440 px o más, un riel lateral fijo a la derecha marca la sección actual, muestra una vista previa al pasar el cursor y salta al hacer clic (también con teclado).
- Hero: los bloques de color se despliegan, el titular entra palabra por palabra (máscara), luego la regla y la bajada.
- Nosotros: la oración se "enciende" palabra por palabra con el scroll; los hitos de la timeline se activan en secuencia.
- Productos y plataforma: al cambiar de producto el tramo de la línea cambia de color y el panel de detalle entra con `rise`.
- Clientes: los testimonios cambian con transición y avanzan solos cada 7 s (se pausa con el cursor encima).
- Revelados generales con CSS scroll-driven (`animation-timeline: view()`), fallback IntersectionObserver.
Implementado con `motion`. Con `prefers-reduced-motion` todo queda visible y sin animación, sin avance automático ni sección fijada.

## Prohibido (look de IA)
Gradientes, glows, blobs borrosos y glassmorphism como recurso propio (solo se admiten dentro de un bloque de Ruixen elegido a propósito, ver abajo) · palabras en cursiva de color en titulares ·
etiquetas mono en mayúsculas numeradas ("01 —") · grillas bento · botones pill ·
tarjetas con borde izquierdo de color · íconos decorativos · placeholders con rayado ·
tarjetas idénticas en grilla de 3.
Bloques de `components/ruixen/`: se evalúan por lo que aportan, sin descartarlos por traer degradés, desenfoques o íconos; se usan cuando suman calidad de agencia, siempre recoloreados a la paleta, con radio de 4 px y sin competir con el texto. En uso (la carpeta contiene solo estos): `chapter-scrubber` (riel lateral), `animated-link` (enlaces del pie y correo), `cloud-background` (fondo animado tenue en Productos, al 25 % de opacidad, con los colores de la paleta) y `button-copy` (copiar el correo en Contacto). Evaluados y descartados: `neon-circle-grid`, `trusted-clients-showcase`, `dual-tone-rain-background`, `rising-glow`, `ripple-circles`, `glass-form`. El instalador de Ruixen puede agregar CSS roto al final de `globals.css`: revisarlo después de instalar.

## Contenido
Ya cargado (tomado de proelmedtech.com, leannec.com y rp-speciality): descripción y módulos de Leannec, funciones de RP Speciality, los tres testimonios (OSPIA, OSTEL, Farmacia Gran Pacífico), correo y teléfono.
Pendiente: descripción ampliada de TurboSurge (hoy solo "Bot de automatización de gestión en Surge") · capturas reales de los tres productos · logos de clientes · logo del Brand kit v4.
No inventar contenido: lo que falte se omite del diseño en lugar de mostrar un placeholder.

## Verificación
Revisar a 1440 px y 390 px. Sin scroll horizontal. Contraste AA.
