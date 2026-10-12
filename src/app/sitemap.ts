import type { MetadataRoute } from "next";
import { settoriConDati } from "@/data/settori";
import { SITO, lavori } from "@/lib/sito";

export const revalidate = 600;

// Solo pagine pubbliche e pubblicate: le scatole personali (/s/, /c/), le pagine dello staff e le anteprime non ci sono (e hanno noindex).
// Un settore compare solo quando il suo osservatorio è pubblicato (una bozza, visibile solo nelle anteprime di Vercel, resta fuori).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settori = (await settoriConDati()).filter((x) => !x.bozza);
  const oggi = new Date();
  return [
    { url: SITO, lastModified: oggi, changeFrequency: "monthly", priority: 1 },
    { url: `${SITO}/chi-sono`, lastModified: oggi, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITO}/metodo`, lastModified: oggi, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITO}/lavori`, lastModified: oggi, changeFrequency: "monthly", priority: 0.8 },
    ...lavori.map((l) => ({ url: `${SITO}/lavori/${l.slug}`, lastModified: oggi, changeFrequency: "yearly" as const, priority: 0.6 })),
    { url: `${SITO}/osservatorio`, lastModified: oggi, changeFrequency: "weekly", priority: 0.7 },
    ...settori.map(({ s, o }) => ({ url: `${SITO}/osservatorio/${s.slug}`, lastModified: new Date(o.dati.calcolato_il), changeFrequency: "weekly" as const, priority: 0.9 })),
    { url: `${SITO}/soluzioni`, lastModified: oggi, changeFrequency: "weekly", priority: 0.8 },
    ...settori.map(({ s, o }) => ({ url: `${SITO}/soluzioni/${s.slug}`, lastModified: new Date(o.dati.calcolato_il), changeFrequency: "weekly" as const, priority: 0.9 })),
    { url: `${SITO}/produttori/olio`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITO}/venditori/bottega`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITO}/check`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITO}/scatole`, changeFrequency: "monthly", priority: 0.5 },
  ];
}
