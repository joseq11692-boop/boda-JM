import { iniciales } from "@/config/boda";
import { cn } from "@/lib/utils";

/**
 * Piezas decorativas de la web de invitados. Son ornamentales: llevan
 * aria-hidden para que los lectores de pantalla las salten.
 */

/** Monograma: las iniciales en caligrafía, entrelazadas, dentro de un óvalo fino. */
export function Monograma({ className, tamano = 44 }: { className?: string; tamano?: number }) {
  const [uno, dos] = iniciales.split("&");

  return (
    <span
      aria-hidden
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: tamano, height: tamano * 1.22 }}
    >
      <svg viewBox="0 0 100 122" className="absolute inset-0 size-full" fill="none" stroke="currentColor">
        <ellipse cx="50" cy="61" rx="47" ry="58" strokeWidth="1.6" opacity="0.75" />
        <ellipse cx="50" cy="61" rx="42" ry="53" strokeWidth="0.8" opacity="0.5" />
      </svg>
      <span className="font-script leading-none" style={{ fontSize: tamano * 0.5, transform: "translateY(4%)" }}>
        {uno}
        <span style={{ marginLeft: "-0.28em" }}>{dos}</span>
      </span>
    </span>
  );
}

/** Infinito con una pequeña cola, el adorno que separa las secciones. */
export function Filete({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("flex justify-center", className)}>
      <svg viewBox="0 0 120 30" className="h-6 w-auto" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M4 20 C 14 22, 22 21, 28 17" />
        <path d="M60 15 C 50 4, 28 3, 28 15 C 28 27, 50 26, 60 15 C 70 4, 92 3, 92 15 C 92 27, 70 26, 60 15 Z" />
      </svg>
    </span>
  );
}

/** Borde ondulado de un sello de lacre: un círculo con irregularidades suaves. */
function bordeLacre() {
  const puntos: string[] = [];
  for (let i = 0; i <= 96; i++) {
    const a = (i / 96) * Math.PI * 2;
    const r = 46 + Math.sin(a * 7) * 1.6 + Math.sin(a * 13 + 1.3) * 1.1 + Math.sin(a * 3 + 0.4) * 1.4;
    puntos.push(`${(50 + Math.cos(a) * r).toFixed(2)},${(50 + Math.sin(a) * r).toFixed(2)}`);
  }
  return `M${puntos.join(" L")} Z`;
}

const BORDE_LACRE = bordeLacre();

/** Sello de lacre vino con las iniciales grabadas. */
export function SelloLacre({ className }: { className?: string }) {
  const [uno, dos] = iniciales.split("&");

  return (
    <svg aria-hidden viewBox="0 0 100 100" className={cn("drop-shadow-[0_10px_14px_rgba(20,4,10,0.55)]", className)}>
      <defs>
        <radialGradient id="lacre-cuerpo" cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#8c2c47" />
          <stop offset="0.55" stopColor="#6b1d34" />
          <stop offset="1" stopColor="#3f0c1c" />
        </radialGradient>
        <radialGradient id="lacre-centro" cx="60%" cy="65%" r="70%">
          <stop offset="0" stopColor="#7a2440" />
          <stop offset="1" stopColor="#4c1225" />
        </radialGradient>
      </defs>
      <path d={BORDE_LACRE} fill="url(#lacre-cuerpo)" />
      <circle cx="50" cy="50" r="34" fill="url(#lacre-centro)" />
      <circle cx="50" cy="50" r="34" fill="none" stroke="#a54866" strokeOpacity="0.55" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="31" fill="none" stroke="#2c0612" strokeOpacity="0.4" strokeWidth="0.8" />
      <text
        x="50"
        y="60"
        textAnchor="middle"
        fontSize="30"
        fill="#9e4561"
        stroke="#3a0a19"
        strokeOpacity="0.35"
        strokeWidth="0.4"
        style={{ fontFamily: "var(--font-script)" }}
      >
        {uno}
        <tspan dx="-6">{dos}</tspan>
      </text>
    </svg>
  );
}

/**
 * Sobre de terciopelo verde oliva visto por detrás, con la solapa cerrada.
 * El contenido (título, sello, botón) va encima.
 */
export function Sobre({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grano relative overflow-hidden bg-[#55553a]", className)} style={{ ["--grano" as string]: "0.16" }}>
      <svg aria-hidden viewBox="0 0 600 380" preserveAspectRatio="none" className="absolute inset-0 -z-10 size-full">
        <defs>
          <linearGradient id="sobre-solapa" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4c4c31" />
            <stop offset="1" stopColor="#5e5e40" />
          </linearGradient>
          <linearGradient id="sobre-lado" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#4a4a30" />
            <stop offset="1" stopColor="#5a5a3d" />
          </linearGradient>
        </defs>
        {/* Pliegues laterales e inferior. */}
        <polygon points="0,0 300,215 0,380" fill="url(#sobre-lado)" />
        <polygon points="600,0 300,215 600,380" fill="#525236" />
        <polygon points="0,380 300,190 600,380" fill="#5b5b3e" />
        {/* Solapa superior con su sombra. */}
        <polygon points="0,0 600,0 300,225" fill="#2e2e1c" opacity="0.35" transform="translate(0 8)" />
        <polygon points="0,0 600,0 300,222" fill="url(#sobre-solapa)" />
        <polyline points="0,0 300,222 600,0" fill="none" stroke="#8a8a62" strokeOpacity="0.35" strokeWidth="1.5" />
        <polyline points="0,380 300,190 600,380" fill="none" stroke="#2e2e1c" strokeOpacity="0.35" strokeWidth="1.5" />
      </svg>
      {children}
    </div>
  );
}
