import { describe, expect, it } from "vitest";
import { formatDate, formatHora, formatLongDate, getWeddingDetails } from "./wedding-details";

describe("fechas de la boda", () => {
  it("formatea en castellano y catalán en la zona horaria de la boda", () => {
    // 03:30 UTC del 28 es todavía día 27 en Panamá (UTC-5).
    const iso = "2027-02-28T03:30:00Z";
    expect(formatDate(iso, "es")).toBe("27 de febrero de 2027");
    expect(formatDate(iso, "ca")).toMatch(/^27 de febrer de?l? 2027$/);
    expect(formatLongDate(iso, "es")).toMatch(/^Sábado/);
  });

  it("los detalles salen de la configuración en los dos idiomas", () => {
    const es = getWeddingDetails("es");
    const ca = getWeddingDetails("ca");
    expect(es.eventDateTimeIso).toBe(ca.eventDateTimeIso);
    expect(es.dateLabel).not.toBe(ca.dateLabel);
    expect(es.venueName.length).toBeGreaterThan(0);
  });
});

describe("formatHora", () => {
  it("pasa a 12 horas", () => {
    expect(formatHora("19:00")).toBe("7:00 p. m.");
    expect(formatHora("20:30")).toBe("8:30 p. m.");
    expect(formatHora("00:15")).toBe("12:15 a. m.");
    expect(formatHora("12:00")).toBe("12:00 p. m.");
  });
});
