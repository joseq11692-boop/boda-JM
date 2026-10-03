import { iniciales } from "@/config/boda";
import { cn } from "@/lib/utils";

/**
 * Piezas decorativas de la web de invitados. Son puramente ornamentales:
 * todas van con aria-hidden para que los lectores de pantalla las salten.
 */

/** Monograma con las iniciales de la pareja dentro de un doble aro. */
export function Monograma({ className, tamano = 88 }: { className?: string; tamano?: number }) {
  const [uno, dos] = iniciales.split("&");

  return (
    <span
      aria-hidden
      className={cn("relative inline-flex items-center justify-center text-gold", className)}
      style={{ width: tamano, height: tamano }}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" fill="none" stroke="currentColor">
        <circle cx="50" cy="50" r="48" strokeWidth="0.6" />
        <circle cx="50" cy="50" r="44.5" strokeWidth="0.35" strokeDasharray="0.6 2.4" />
        <path d="M50 1.5 L51.6 4 L50 6.5 L48.4 4 Z M50 93.5 L51.6 96 L50 98.5 L48.4 96 Z" fill="currentColor" stroke="none" />
      </svg>
      <span className="font-display font-light leading-none" style={{ fontSize: tamano * 0.3 }}>
        {uno}
        <span className="mx-[0.06em] italic opacity-80" style={{ fontSize: "0.7em" }}>
          &amp;
        </span>
        {dos}
      </span>
    </span>
  );
}

/** Filete: dos líneas finas con un rombo en el centro. */
export function Filete({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("flex items-center justify-center gap-3 text-gold", className)}>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-current sm:w-20" />
      <svg viewBox="0 0 12 12" className="size-2.5" fill="currentColor">
        <path d="M6 0 L7.4 4.6 L12 6 L7.4 7.4 L6 12 L4.6 7.4 L0 6 L4.6 4.6 Z" />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-current sm:w-20" />
    </span>
  );
}

// Silueta de la Ciudad de Panamá vista desde la bahía: [x, ancho, alto].
// Hacia la derecha, la torre en espiral (el "tornillo") como guiño local.
const EDIFICIOS: Array<[number, number, number]> = [
  [0, 46, 34], [44, 30, 52], [72, 40, 40], [110, 26, 70], [134, 44, 58], [176, 22, 92], [196, 36, 74],
  [230, 30, 50], [258, 48, 66], [304, 24, 104], [326, 40, 86], [364, 30, 62], [392, 22, 118], [412, 44, 96],
  [454, 30, 72], [482, 26, 128], [506, 42, 108], [546, 28, 84], [572, 36, 140], [606, 24, 116], [628, 46, 98],
  [672, 30, 132], [700, 22, 150], [720, 40, 122], [758, 32, 104], [788, 26, 136], [812, 44, 112], [854, 28, 92],
  [880, 36, 126], [914, 24, 100], [1000, 34, 118], [1032, 26, 96], [1056, 44, 110], [1098, 30, 84],
  [1126, 22, 102], [1146, 40, 76], [1184, 28, 88], [1210, 46, 62], [1254, 30, 72], [1282, 38, 54], [1318, 26, 64],
  [1342, 44, 44], [1384, 30, 52], [1412, 28, 36]
];

const HORIZONTE = 170;

/** Ventanas encendidas, siempre en el mismo sitio (sin aleatoriedad en cada render). */
function ventanas() {
  const puntos: Array<[number, number]> = [];
  EDIFICIOS.forEach(([x, w, h], i) => {
    for (let fila = 10; fila < h - 6; fila += 9) {
      for (let col = 5; col < w - 4; col += 7) {
        // Hash entero simple: reparte las luces sin dibujar diagonales.
        const h = Math.imul(i * 7919 + fila * 104729 + col * 1299709, 2654435761) >>> 0;
        if (h % 100 < 14) {
          puntos.push([x + col, HORIZONTE - h + fila]);
        }
      }
    }
  });
  return puntos;
}

const VENTANAS = ventanas();

export function SkylineBahia({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 240"
      preserveAspectRatio="xMidYMax slice"
      className={cn("pointer-events-none block w-full", className)}
    >
      <defs>
        <linearGradient id="skyline-agua" gradientUnits="userSpaceOnUse" x1="0" y1={HORIZONTE} x2="0" y2="240">
          <stop offset="0" stopColor="hsl(38 60% 60%)" stopOpacity="0.35" />
          <stop offset="1" stopColor="hsl(38 60% 60%)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g fill="hsl(218 60% 4%)" fillOpacity="0.92">
        {EDIFICIOS.map(([x, w, h]) => (
          <rect key={x} x={x} y={HORIZONTE - h} width={w} height={h} />
        ))}
        {/* Torre en espiral: pisos desplazados que giran. */}
        {Array.from({ length: 13 }, (_, i) => {
          const desplazamiento = Math.sin(i * 0.75) * 7;
          return <rect key={`t${i}`} x={950 + desplazamiento} y={HORIZONTE - 14 - i * 12} width={32} height={13} />;
        })}
      </g>

      <g fill="hsl(40 70% 70%)">
        {VENTANAS.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="1.6" height="2.4" opacity="0.55" />
        ))}
      </g>

      {/* La bahía: reflejos dorados que se apagan hacia abajo. */}
      <rect x="0" y={HORIZONTE} width="1440" height={240 - HORIZONTE} fill="hsl(218 60% 5%)" />
      <g stroke="url(#skyline-agua)" strokeLinecap="round">
        {Array.from({ length: 9 }, (_, fila) =>
          Array.from({ length: 14 }, (_, i) => {
            const x = ((i * 113 + fila * 57) % 1440) + 10;
            const largo = 18 + ((i * 7 + fila * 5) % 40);
            return (
              <line
                key={`${fila}-${i}`}
                x1={x}
                x2={x + largo}
                y1={HORIZONTE + 6 + fila * 7}
                y2={HORIZONTE + 6 + fila * 7}
                strokeWidth={1.2 - fila * 0.1}
              />
            );
          })
        )}
      </g>
    </svg>
  );
}
