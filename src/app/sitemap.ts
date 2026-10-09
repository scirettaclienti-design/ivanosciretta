import type { MetadataRoute } from "next";
import { SITO, lavori, osservatorio, settoriPubblicati } from "@/lib/sito";

export const revalidate = 600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const o = await osservatorio("olio");
  const settori = await settoriPubblicati();
  const oggi = new Date();
  return [
    { url: SITO, lastModified: oggi, changeFrequency: "monthly", priority: 1 },
    { url: `${SITO}/chi-sono`, lastModified: oggi, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITO}/lavori`, lastModified: oggi, changeFrequency: "monthly", priority: 0.8 },
    ...lavori.map((l) => ({ url: `${SITO}/lavori/${l.slug}`, lastModified: oggi, changeFrequency: "yearly" as const, priority: 0.6 })),
    { url: `${SITO}/osservatorio`, lastModified: oggi, changeFrequency: "weekly", priority: 0.7 },
    ...(o ? [{ url: `${SITO}/osservatorio/olio`, lastModified: new Date(o.dati.calcolato_il), changeFrequency: "weekly" as const, priority: 0.9 }] : []),
    { url: `${SITO}/soluzioni`, lastModified: oggi, changeFrequency: "weekly", priority: 0.8 },
    ...settori.map(({ s, o: x }) => ({ url: `${SITO}/soluzioni/${s.slug}`, lastModified: new Date(x!.dati.calcolato_il), changeFrequency: "weekly" as const, priority: 0.9 })),
    { url: `${SITO}/produttori/olio`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITO}/check`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITO}/scatole`, changeFrequency: "monthly", priority: 0.5 },
  ];
}
