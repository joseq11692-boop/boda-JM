import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { nombresPareja, pareja, textos } from "@/config/boda";
import { ThemeNoFlashScript } from "@/components/theme-toggle";
import { ToastHost } from "@/components/toast-host";
import { getPublicBaseUrl } from "@/lib/env";
import { DEFAULT_THEME } from "@/lib/theme";
import { getWeddingDetails } from "@/lib/wedding-details";
import "./globals.css";
// tokens.css DESPUÉS de globals.css a propósito: define los temas [data-theme]
// y gana en la cascada sobre el :root de globals.css.
import "@/styles/tokens.css";

// Tipografía de la web de invitados (archivos en src/fonts, licencia OFL).
// Solo se aplica dentro de .web-boda (ver globals.css): el panel conserva su letra.
const serif = localFont({
  src: [
    { path: "../fonts/cormorant-garamond.woff2", weight: "300 700", style: "normal" },
    { path: "../fonts/cormorant-garamond-italic.woff2", weight: "300 700", style: "italic" }
  ],
  variable: "--font-boda-serif",
  display: "swap",
  fallback: ["Georgia", "serif"]
});
const sans = localFont({
  src: "../fonts/jost.woff2",
  weight: "100 900",
  variable: "--font-boda-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"]
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1b2e" }
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

// Metadatos base en el idioma principal; cada rama de idioma (/es, /ca) los
// afina en su propio layout.
export const metadata: Metadata = (() => {
  const d = getWeddingDetails("es");
  const title = `${nombresPareja} · ${d.dateShort}`;

  return {
    title: { default: title, template: `%s · ${nombresPareja}` },
    description: textos.es.descripcionSeo,
    metadataBase: new URL(getPublicBaseUrl()),
    applicationName: nombresPareja,
    authors: [{ name: pareja.uno }, { name: pareja.dos }],
    openGraph: {
      type: "website",
      locale: "es_PA",
      siteName: nombresPareja,
      title,
      description: textos.es.descripcionSeo
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: textos.es.descripcionSeo
    },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
      apple: "/icons/apple-touch-icon-180.png"
    }
  };
})();

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Ni cookies ni cabeceras aquí: leerlas obligaría a renderizar TODAS las
  // páginas en el servidor en cada visita. El idioma viaja en la URL y el
  // panel pone su propio tema en su contenedor.
  return (
    <html lang="es" data-theme={DEFAULT_THEME} className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <ThemeNoFlashScript />
      </head>
      <body>
        {children}
        <ToastHost />
      </body>
    </html>
  );
}
