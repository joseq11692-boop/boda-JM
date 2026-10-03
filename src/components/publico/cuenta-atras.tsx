"use client";

import { useEffect, useState } from "react";
import type { WeddingLocale } from "@/config/boda";
import { textosWeb } from "@/lib/textos-web";

const SEGUNDO = 1000;
const MINUTO = 60 * SEGUNDO;
const HORA = 60 * MINUTO;
const DIA = 24 * HORA;

/**
 * Cuenta atrás en días, horas, minutos y segundos. Se calcula en el
 * navegador: la página es estática y una cifra pintada en el servidor
 * quedaría congelada el día del despliegue. Hasta que hidrata enseña guiones.
 */
export function CuentaAtras({ fechaIso, locale }: { fechaIso: string; locale: WeddingLocale }) {
  const [restante, setRestante] = useState<number | null>(null);

  useEffect(() => {
    const objetivo = new Date(fechaIso).getTime();
    const actualizar = () => setRestante(objetivo - Date.now());
    actualizar();
    const id = window.setInterval(actualizar, SEGUNDO);
    return () => window.clearInterval(id);
  }, [fechaIso]);

  const t = textosWeb[locale].inicio;

  if (restante !== null && restante <= 0) {
    return <p className="eyebrow text-gold">{t.hoy}</p>;
  }

  const valores =
    restante === null
      ? null
      : [
          Math.floor(restante / DIA),
          Math.floor((restante % DIA) / HORA),
          Math.floor((restante % HORA) / MINUTO),
          Math.floor((restante % MINUTO) / SEGUNDO)
        ];
  const etiquetas = [t.unidades.dias, t.unidades.horas, t.unidades.minutos, t.unidades.segundos];

  return (
    <div role="group" aria-label={t.cuentaAtras}>
      {/* Para lectores de pantalla, solo los días: los segundos serían ruido. */}
      {valores ? <p className="sr-only">{t.faltan(valores[0])}</p> : null}
      <ol aria-hidden className="flex items-start justify-center">
        {etiquetas.map((etiqueta, i) => (
          <li key={etiqueta} className="flex items-start">
            {i > 0 ? <span className="mx-3 mt-2 h-8 w-px bg-gold/40 sm:mx-6 sm:h-10" /> : null}
            <span className="flex min-w-[3.25rem] flex-col items-center sm:min-w-[4.5rem]">
              <span className="font-display text-4xl font-light tabular-nums leading-none sm:text-5xl">
                {valores ? String(valores[i]).padStart(i === 0 ? 1 : 2, "0") : "–"}
              </span>
              <span className="eyebrow mt-3 text-[0.6rem] text-night-muted">{etiqueta}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
