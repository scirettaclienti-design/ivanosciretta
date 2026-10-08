import { ogImmagine, ogSize } from "@/lib/og";
import { osservatorio } from "@/lib/sito";
export const alt = "Osservatorio: come si presentano online i frantoi italiani";
export const size = ogSize;
export const contentType = "image/png";
export const revalidate = 600;
export default async function Image() {
  const o = await osservatorio("olio");
  if (!o) return ogImmagine("Come si presentano online i frantoi italiani", "Osservatorio in preparazione.", "Osservatorio");
  const b = o.dati.misure.find((m) => m.id === "buyer");
  return ogImmagine(`Come si presentano online i frantoi italiani · ${o.dati.mese}`, `${o.dati.campione.aziende} frantoi, ${o.dati.campione.regioni} regioni · pagina per buyer non trovata: ${b?.perc}% · l'AI ne nomina il ${o.dati.ai.perc}%`, "Osservatorio");
}
