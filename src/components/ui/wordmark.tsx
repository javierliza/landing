interface WordmarkProps {
  light?: boolean;
  className?: string;
}

/** Wordmark tipográfico provisorio (Public Sans) hasta contar con el logo del Brand kit v4. */
export function Wordmark({ light = false, className = "" }: WordmarkProps) {
  return (
    <span
      className={`inline-flex items-baseline font-bold tracking-[-0.04em] ${
        light ? "text-white" : "text-ink"
      } ${className}`}
    >
      proel<span className="ml-[0.06em] inline-block size-[0.2em] bg-primary" aria-hidden />
    </span>
  );
}
