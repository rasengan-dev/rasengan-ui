import { type TemplateProps } from 'rasengan';

export default function Template({ Head, Body, Script }: TemplateProps) {
  return (
    <html lang="en" data-village="konoha" data-nature="katon" data-tint="village">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/rasengan.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="light dark" />
        {/* Village faces. Self-hosting them is RFC-0002 open question 2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        />
      </Head>

      <Body>
        <Script />
      </Body>
    </html>
  );
}
