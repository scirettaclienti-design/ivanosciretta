// Dati comuni delle pagine «leggibili» (chi-sono, lavori, osservatorio): tutte generate sul server.
import datiLavori from "@/data/lavori.json";

export const SITO = "https://www.ivanosciretta.tech";
export const CREDLY = "https://www.credly.com/users/ivano-sciretta/badges";
export const LINKEDIN = "https://www.linkedin.com/in/ivano-sciretta";
export const ID_IVANO = `${SITO}/chi-sono#ivano`;
export const ID_STUDIO = `${SITO}/#studio`;
// Il profilo Instagram va scritto qui appena Ivano conferma l'indirizzo esatto (non lo indovino): finché è null, non compare in sameAs né in llms.txt.
export const INSTAGRAM: string | null = null;
const PROFILI = [LINKEDIN, CREDLY, INSTAGRAM].filter((x): x is string => Boolean(x));

/**
 * La persona, scritta una volta sola (layout e /chi-sono usano questa): niente dati in contrasto tra una pagina e l'altra.
 * Niente foto finché non c'è una foto vera (quella di prima non lo era).
 */
export const PERSONA_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": ID_IVANO,
  name: "Ivano Sciretta",
  url: `${SITO}/chi-sono`,
  jobTitle: "Costruisco strumenti AI per aziende",
  description: "Pugliese con base a Roma. Viene dal marketing e dalla grafica; dal 2025 costruisce da sé, con l'AI, strumenti per aziende. Iscritto a Ingegneria informatica, curriculum AI & Data Science.",
  homeLocation: { "@type": "Place", name: "Roma" },
  knowsAbout: ["Intelligenza artificiale", "Sviluppo web", "Automazione", "Marketing digitale", "Analisi della presenza online delle aziende"],
  sameAs: PROFILI,
};

/** Il servizio, per i motori e per le AI: chi lo offre, dove, cosa. */
export const SERVIZIO_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": ID_STUDIO,
  name: "Ivano Sciretta · strumenti AI per aziende",
  url: SITO,
  description: "Analisi gratuita della presenza online (la mappa), analisi completa con le mosse in ordine (il Check 4D) e strumenti costruiti su misura per frantoi, botteghe ed empori.",
  founder: { "@id": ID_IVANO },
  areaServed: { "@type": "Country", name: "Italia" },
  address: { "@type": "PostalAddress", addressLocality: "Roma", addressCountry: "IT" },
  sameAs: PROFILI,
};

/** BreadcrumbList: la prima voce è sempre la home, poi le pagine in ordine (nome, percorso). */
export function briciole(voci: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [["Ivano Sciretta", "/"], ...voci].map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${SITO}${path === "/" ? "" : path}` })),
  };
}

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
  settori?: string[];
  permesso_cliente?: boolean;
  cambiato?: string[] | null;
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

async function leggiOsservatorio(settore: string, k?: string, inMemoria = false): Promise<Osservatorio | null> {
  try {
    const r = await fetch(FUNZIONE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ azione: "leggi", settore, ...(k ? { k } : {}) }),
      // L'anteprima firmata (?k=) non si tiene in memoria; la bozza delle anteprime di Vercel sì (un minuto); la versione pubblica si rigenera ogni 10 minuti al massimo.
      ...(k && !inMemoria ? { cache: "no-store" as const } : { next: { revalidate: k ? 60 : 600 } }),
    });
    if (!r.ok) return null;
    const c = await r.json();
    return c.ok ? { stato: c.stato, dati: c.dati, pubblicato_il: c.pubblicato_il ?? null } : null;
  } catch {
    return null;
  }
}

/**
 * L'osservatorio di un settore: la versione pubblicata. Solo nelle anteprime di Vercel (e in locale), mai in produzione, un settore non ancora
 * pubblicato si legge in bozza con la chiave dell'anteprima (OSSERVATORIO_K_<SETTORE>): le pagine lo segnano «stato: bozza» e non si indicizzano.
 */
export async function osservatorio(settore: string, k?: string): Promise<Osservatorio | null> {
  if (k) return leggiOsservatorio(settore, k);
  const pubblicato = await leggiOsservatorio(settore);
  if (pubblicato) return pubblicato;
  const anteprima = process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV === "development";
  const chiave = anteprima ? process.env[`OSSERVATORIO_K_${settore.toUpperCase()}`] : undefined;
  return chiave ? leggiOsservatorio(settore, chiave, true) : null;
}

export const dataIt = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Rome" }) : "";
export const virgola = (n: number | null) => (n === null ? "—" : n.toLocaleString("it-IT"));
