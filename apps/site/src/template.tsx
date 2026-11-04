import { type TemplateProps } from 'rasengan';
import { settingsKey } from '@/settings';

/* Before the first paint: the village the toolbar saved, or light/dark from the system. */
const restoreSettings = `try {
  var s = JSON.parse(localStorage.getItem(${JSON.stringify(settingsKey)}) || 'null'), h = document.documentElement;
  if (s) { h.dataset.village = s.village; h.dataset.nature = s.nature; h.dataset.tint = s.tint; }
  if (s ? s.dark : matchMedia('(prefers-color-scheme: dark)').matches) h.classList.add('dark');
} catch (e) {}`;

/*
 * Google Analytics, when the build has a measurement ID: RASENGAN_GA_ID, a build variable of the production
 * environment on Hiraiship, so local and preview builds send nothing. GA4 counts client-side navigations itself
 * (enhanced measurement, browser history changes). Anything but a G-… ID is ignored: it goes into a script.
 */
const gaId = /^G-[A-Z0-9]+$/.test(import.meta.env.RASENGAN_GA_ID ?? '') ? (import.meta.env.RASENGAN_GA_ID as string) : null;
const gaSetup = `window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', '${gaId}');`;

export default function Template({ Head, Body, Script }: TemplateProps) {
  return (
    <html lang="en" data-village="konoha" data-nature="katon" data-tint="village">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/rasengan.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="light dark" />
        <script dangerouslySetInnerHTML={{ __html: restoreSettings }} />
        {gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script dangerouslySetInnerHTML={{ __html: gaSetup }} />
          </>
        )}
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
