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
    return <p className="font-display text-xl">{t.hoy}</p>;
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
      <ol aria-hidden className="flex items-start justify-center gap-7 sm:gap-10">
        {etiquetas.map((etiqueta, i) => (
          <li key={etiqueta} className="flex min-w-[2.75rem] flex-col items-center">
            <span className="text-[1.75rem] font-normal tabular-nums leading-none tracking-tight">
              {valores ? String(valores[i]).padStart(i === 0 ? 1 : 2, "0") : "–"}
            </span>
            <span className="mt-2 font-display text-[0.8rem] lowercase text-night-muted">{etiqueta}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
