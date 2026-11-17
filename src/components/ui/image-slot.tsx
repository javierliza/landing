interface ImageSlotProps {
  label: string;
  src?: string;
  dark?: boolean;
  className?: string;
}

/**
 * Espacio reservado para una imagen. Mientras no haya archivo muestra un recuadro neutro con su descripción;
 * al pasar `src` muestra la imagen con el mismo tamaño, sin mover el diseño.
 */
export function ImageSlot({ label, src, dark = false, className = "" }: ImageSlotProps) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={label} className={`w-full rounded-[4px] object-cover ${className}`} />;
  }
  return (
    <div
      role="img"
      aria-label={`Espacio reservado: ${label}`}
      className={`grid w-full place-items-center rounded-[4px] border ${
        dark
          ? "border-white/20 bg-white/[0.06] text-on-dark-muted"
          : "border-line-strong bg-bg text-gray"
      } ${className}`}
    >
      <p className="px-6 text-center text-sm font-medium">{label}</p>
    </div>
  );
}
