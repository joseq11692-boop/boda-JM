import { ImageResponse } from "next/og";
import { iniciales, nombresPareja, pareja } from "@/config/boda";
import { getWeddingDetails } from "@/lib/wedding-details";

// Imagen que aparece al compartir el enlace (WhatsApp, redes...). Se genera
// con los datos de src/config/boda.ts; cambia aquí colores y composición.
export const runtime = "edge";
export const alt = nombresPareja;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NOCHE = "#0c1626";
const DORADO = "#c2a26a";
const DORADO_CLARO = "#e6cf9f";
const MARFIL = "#f6f1e7";

export default async function Image() {
  const d = getWeddingDetails("es");
  const [uno, dos] = iniciales.split("&");
  const [ligera, cursiva] = await Promise.all([
    fetch(new URL("../fonts/cormorant-garamond-light.ttf", import.meta.url)).then((r) => r.arrayBuffer()),
    fetch(new URL("../fonts/cormorant-garamond-italic.ttf", import.meta.url)).then((r) => r.arrayBuffer())
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 28,
          background: `radial-gradient(circle at 50% 120%, #3a3322 0%, ${NOCHE} 55%)`,
          fontFamily: "Cormorant"
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: `1.5px solid ${DORADO}`,
            color: MARFIL
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 104,
              height: 104,
              borderRadius: 999,
              border: `1.5px solid ${DORADO}`,
              color: DORADO_CLARO,
              fontSize: 40
            }}
          >
            {uno}
            <span style={{ fontStyle: "italic", fontSize: 30, margin: "0 3px", color: DORADO }}>&amp;</span>
            {dos}
          </div>
          <div style={{ display: "flex", marginTop: 34, fontSize: 22, letterSpacing: 9, color: DORADO }}>NOS CASAMOS</div>
          <div style={{ display: "flex", alignItems: "baseline", marginTop: 16, fontSize: 74, lineHeight: 1 }}>
            {pareja.uno}
            <span style={{ fontStyle: "italic", color: DORADO, margin: "0 22px", fontSize: 66 }}>&amp;</span>
            {pareja.dos}
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 34, fontSize: 30, color: MARFIL }}>
            <div style={{ display: "flex", width: 70, height: 1, background: DORADO, marginRight: 24 }} />
            {d.dateLabel}
            <div style={{ display: "flex", width: 70, height: 1, background: DORADO, marginLeft: 24 }} />
          </div>
          <div style={{ display: "flex", marginTop: 12, fontSize: 28, fontStyle: "italic", color: "#cfc4ae" }}>
            {d.city}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant", data: ligera, weight: 300, style: "normal" },
        { name: "Cormorant", data: cursiva, weight: 400, style: "italic" }
      ]
    }
  );
}
