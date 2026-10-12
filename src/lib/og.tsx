// Immagine di anteprima (1200×630) delle pagine leggibili, nello stile dei cartellini delle mappe: scheda scura con il pallino del settore,
// titolo grande, una riga sotto, firma. Il colore è quello del settore (olio verde, bottega bruno) o il ciano del sito.
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export function ogImmagine(titolo: string, sotto: string, etichetta: string, colore = "#00DBE9") {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", padding: 44, background: "#0E0E0E" }}>
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 52, background: "#1C1B1B", border: `3px solid ${colore}`, borderRadius: 32, color: "#E5E2E1" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 44, height: 44, borderRadius: 22, background: colore, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Il segno di spunta è disegnato (due bordi ruotati): nessun carattere speciale da scaricare. */}
              <div style={{ width: 12, height: 22, borderRight: "5px solid #FFFFFF", borderBottom: "5px solid #FFFFFF", transform: "rotate(45deg) translate(-2px, -3px)" }} />
            </div>
            <div style={{ display: "flex", marginLeft: 18, fontSize: 28, letterSpacing: 5, color: "#E5E2E1", textTransform: "uppercase" }}>{etichetta}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: titolo.length > 60 ? 56 : 68, fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1 }}>{titolo}</div>
            <div style={{ marginTop: 22, fontSize: 32, color: "#C9C6C5" }}>{sotto}</div>
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#E5E2E1" }}>Ivano Sciretta · ivanosciretta.tech</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
