import type { ReactNode } from "react";
import { Container } from "./container";
import { Label } from "./label";

interface SplitProps {
  label: string;
  children: ReactNode;
  dark?: boolean;
}

/** Grilla editorial: rótulo en 3 columnas, contenido en 9. */
export function Split({ label, children, dark = false }: SplitProps) {
  return (
    <Container className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-10">
      <div className="lg:col-span-3">
        <div className="lg:sticky lg:top-28">
          <Label dark={dark} as="h2">{label}</Label>
        </div>
      </div>
      <div className="min-w-0 lg:col-span-9">{children}</div>
    </Container>
  );
}
