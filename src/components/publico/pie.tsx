import Link from "next/link";
import { nombresPareja, type WeddingLocale } from "@/config/boda";
import { Filete, Monograma } from "@/components/publico/adornos";
import { getWeddingDetails } from "@/lib/wedding-details";
import { menuPublico, rutaPublica, textosWeb } from "@/lib/textos-web";

export function Pie({ locale }: { locale: WeddingLocale }) {
  const t = textosWeb[locale];
  const d = getWeddingDetails(locale);

  return (
    <footer className="cielo-noche grano mt-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6">
        <Monograma tamano={72} />
        <p className="font-display text-2xl font-light sm:text-3xl">{nombresPareja}</p>
        <p className="eyebrow text-night-muted">
          {d.dateShort} · {d.city}
        </p>
        <Filete />
        <nav aria-label={t.pie} className="flex flex-wrap justify-center gap-x-7 gap-y-3">
          {menuPublico.map((seccion) => (
            <Link
              key={seccion}
              href={rutaPublica(locale, seccion)}
              className="eyebrow enlace-dorado pb-1 text-[0.65rem] text-night-muted hover:text-night-foreground"
            >
              {t.menu[seccion]}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
