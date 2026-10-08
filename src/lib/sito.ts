// Dati comuni delle pagine «leggibili» (chi-sono, lavori, osservatorio): tutte generate sul server.
import datiLavori from "@/data/lavori.json";

export const SITO = "https://www.ivanosciretta.tech";
export const CREDLY = "https://www.credly.com/users/ivano-sciretta/badges";
export const LINKEDIN = "https://www.linkedin.com/in/ivano-sciretta";
export const ID_IVANO = `${SITO}/chi-sono#ivano`;

export type Lavoro = {
  slug: string;
  acceso: boolean;
  permesso: string | null;
  cliente: string;
  settore: string;
  problema: string;
  costruito: string[];
  link: string | null;
  link_mappa?: string;
  immagine: string | null;
  alt: string | null;
  risultato: string | null;
};
export const lavori = (datiLavori.lavori as Lavoro[]).filter((l) => l.acceso);

// Osservatorio: numeri SOLO aggregati, calcolati dal database dalla funzione «osservatorio» (repo scatole).
const FUNZIONE = "https://uoziirrcnfnqrhbkqcwm.supabase.co/functions/v1/osservatorio";
export type Misura = { id: string; etichetta: string; verso: "senza" | "con"; n: number; base: number; perc: number };
export type DatiOsservatorio = {
  mese: string;
  calcolato_il: string;
  campione: { aziende: number; siti_letti: number; regioni: number; letti_dal: string | null; letti_al: string | null };
  regioni: { regione: string; n: number }[];
  misure: Misura[];
  ai: { certe: number; nominate: number; perc: number; incerte: number; dal: string | null; al: string | null };
  google: { con_voto: number; voto_medio: number | null; recensioni_mediana: number | null };
};
export type Osservatorio = { stato: "pubblicato" | "bozza"; dati: DatiOsservatorio; pubblicato_il: string | null };

export async function osservatorio(settore: string, k?: string): Promise<Osservatorio | null> {
  try {
    const r = await fetch(FUNZIONE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ azione: "leggi", settore, ...(k ? { k } : {}) }),
      // Le bozze non si tengono in memoria; la versione pubblica si rigenera ogni 10 minuti al massimo.
      ...(k ? { cache: "no-store" as const } : { next: { revalidate: 600 } }),
    });
    if (!r.ok) return null;
    const c = await r.json();
    return c.ok ? { stato: c.stato, dati: c.dati, pubblicato_il: c.pubblicato_il ?? null } : null;
  } catch {
    return null;
  }
}

export const dataIt = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Rome" }) : "";
export const virgola = (n: number | null) => (n === null ? "—" : n.toLocaleString("it-IT"));
