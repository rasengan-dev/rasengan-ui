/// <reference types="rasengan/types/client" />
/// <reference types="@rasenganjs/mdx/types/client" />

/** A file imported with `?source`: its code and its shiki HTML (rasengan.config.js). */
declare module '*?source' {
  const source: { code: string; html: string };
  export default source;
}
