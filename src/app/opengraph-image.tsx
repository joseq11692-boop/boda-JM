import { ImageResponse } from "next/og";
import { nombresCortos, nombresPareja } from "@/config/boda";
import { getWeddingDetails } from "@/lib/wedding-details";

// Imagen que aparece al compartir el enlace (WhatsApp, redes...). Se genera
// con los datos de src/config/boda.ts; cambia aquí colores y composición.
export const runtime = "edge";
export const alt = nombresPareja;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const VINO = "#5a1a34";
const ROSA = "#ecd6de";
const ROSA_SUAVE = "#c99aac";

export default async function Image() {
  const d = getWeddingDetails("es");
  const [script, bodoni] = await Promise.all([
    fetch(new URL("../fonts/pinyon-script.ttf", import.meta.url)).then((r) => r.arrayBuffer()),
    fetch(new URL("../fonts/bodoni-moda-italic.ttf", import.meta.url)).then((r) => r.arrayBuffer())
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: VINO,
          color: ROSA
        }}
      >
        <div style={{ display: "flex", fontFamily: "Bodoni", fontStyle: "italic", fontSize: 40, color: ROSA_SUAVE }}>¡nos casamos!</div>
        <div style={{ display: "flex", alignItems: "baseline", fontFamily: "Pinyon", fontSize: 150, lineHeight: 1.1, marginTop: 10 }}>
          {nombresCortos.uno}
          <span style={{ fontSize: 110, margin: "0 26px", color: ROSA_SUAVE }}>&amp;</span>
          {nombresCortos.dos}
        </div>
        <svg width="150" height="38" viewBox="0 0 120 30" style={{ marginTop: 18 }}>
          <path d="M4 20 C 14 22, 22 21, 28 17" fill="none" stroke={ROSA_SUAVE} strokeWidth="2.2" strokeLinecap="round" />
          <path
            d="M60 15 C 50 4, 28 3, 28 15 C 28 27, 50 26, 60 15 C 70 4, 92 3, 92 15 C 92 27, 70 26, 60 15 Z"
            fill="none"
            stroke={ROSA_SUAVE}
            strokeWidth="2.2"
          />
        </svg>
        <div style={{ display: "flex", marginTop: 30, fontFamily: "Bodoni", fontStyle: "italic", fontSize: 34, color: ROSA }}>
          {d.dateShort} · {d.city}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Pinyon", data: script, weight: 400, style: "normal" },
        { name: "Bodoni", data: bodoni, weight: 400, style: "italic" }
      ]
    }
  );
}
