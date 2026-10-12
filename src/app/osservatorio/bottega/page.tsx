import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { OsservatorioBottega, titoloBottega } from "@/components/pagine/OsservatorioBottega";
import { SITO, osservatorio } from "@/lib/sito";

// La versione pubblica si rigenera da sola ogni 10 minuti (dopo «node scripts/osservatorio.mjs pubblica bottega»).
// Nelle anteprime di Vercel, se non è ancora pubblicato, si legge la bozza (e la pagina non si indicizza).
export const revalidate = 600;

export async function generateMetadata(): Promise<Metadata> {
  const o = await osservatorio("bottega");
  if (!o) return { title: "Osservatorio botteghe ed empori · Ivano Sciretta", robots: { index: false } };
  const d = o.dati;
  const m = Object.fromEntries(d.misure.map((x) => [x.id, x]));
  return {
    title: `${titoloBottega(d.mese)} · Osservatorio`,
    description: `${d.campione.aziende} botteghe ed empori in ${d.campione.regioni} regioni. Scheda Google senza link al sito: ${m.g_sito.perc}%; prezzi non trovati sul sito: ${m.prezzi.perc}%; spedizioni o ritiro non trovati: ${m.spedizioni.perc}%. Metodo e limiti.`,
    alternates: { canonical: "/osservatorio/bottega" },
    openGraph: { type: "article", url: `${SITO}/osservatorio/bottega`, title: titoloBottega(d.mese), locale: "it_IT", publishedTime: o.pubblicato_il ?? undefined, authors: [`${SITO}/chi-sono`] },
    ...(o.stato === "bozza" ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function Pagina() {
  const o = await osservatorio("bottega");
  if (!o) redirect("/osservatorio");
  return <OsservatorioBottega o={o} />;
}
