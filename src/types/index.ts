export interface NavItem {
  label: string;
  href: string;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  who: string;
  org: string;
}

export interface Client {
  name: string;
  logo?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  audience: string;
  description: string;
  includesTitle: string;
  includes: string[];
  cta: string;
  href: string;
  external: boolean;
  stages: number[];
  optionalStages?: number[];
  conns?: number[];
  image?: string;
}
