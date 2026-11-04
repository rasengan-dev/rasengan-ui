import { type TemplateProps } from 'rasengan';
import { settingsKey } from '@/settings';

/* Before the first paint: the village the toolbar saved, or light/dark from the system. */
const restoreSettings = `try {
  var s = JSON.parse(localStorage.getItem(${JSON.stringify(settingsKey)}) || 'null'), h = document.documentElement;
  if (s) { h.dataset.village = s.village; h.dataset.nature = s.nature; h.dataset.tint = s.tint; }
  if (s ? s.dark : matchMedia('(prefers-color-scheme: dark)').matches) h.classList.add('dark');
} catch (e) {}`;

export default function Template({ Head, Body, Script }: TemplateProps) {
  return (
    <html lang="en" data-village="konoha" data-nature="katon" data-tint="village">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/rasengan.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="light dark" />
        <script dangerouslySetInnerHTML={{ __html: restoreSettings }} />
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
