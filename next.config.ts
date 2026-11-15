import type { NextConfig } from "next";

// EXPORT_STATIC=1 genera un sitio estático en /out (para revisión externa). Sin la variable, todo queda como antes.
const isExport = process.env.EXPORT_STATIC === "1";

const nextConfig: NextConfig = {
  ...(isExport
    ? { output: "export", images: { unoptimized: true } }
    : { cacheComponents: true, partialPrefetching: true }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
