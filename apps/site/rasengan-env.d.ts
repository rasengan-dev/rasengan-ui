/// <reference types="rasengan/types/client" />
/// <reference types="@rasenganjs/mdx/types/client" />

/** When the site was built, in milliseconds (rasengan.config.js). */
declare const __BUILD_TIME__: number;

/** A file imported with `?source`: its code and its shiki HTML (rasengan.config.js). */
declare module '*?source' {
  const source: { code: string; html: string };
  export default source;
}
