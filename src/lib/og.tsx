// Immagine di anteprima (1200×630) delle pagine leggibili: titolo grande, una riga sotto, firma.
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export function ogImmagine(titolo: string, sotto: string, etichetta: string) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0E0E0E", color: "#E5E2E1" }}>
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#00DBE9", textTransform: "uppercase" }}>{etichetta}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: titolo.length > 60 ? 56 : 68, fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1 }}>{titolo}</div>
          <div style={{ marginTop: 24, fontSize: 32, color: "#C9C6C5" }}>{sotto}</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#E5E2E1" }}>Ivano Sciretta · ivanosciretta.tech</div>
      </div>
    ),
    ogSize,
  );
}
