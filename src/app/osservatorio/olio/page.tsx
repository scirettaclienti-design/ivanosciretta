import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Osservatorio, titoloOsservatorio } from "@/components/pagine/Osservatorio";
import { SITO, osservatorio } from "@/lib/sito";

// La versione pubblica si rigenera da sola ogni 10 minuti (dopo «node scripts/osservatorio.mjs pubblica olio»).
export const revalidate = 600;

export async function generateMetadata(): Promise<Metadata> {
  const o = await osservatorio("olio");
  if (!o) return { title: "Osservatorio frantoi · Ivano Sciretta", robots: { index: false } };
  const d = o.dati;
  const m = Object.fromEntries(d.misure.map((x) => [x.id, x]));
  return {
    title: `${titoloOsservatorio(d.mese)} · Osservatorio`,
    description: `${d.campione.aziende} frantoi in ${d.campione.regioni} regioni: ${m.buyer.perc}% senza pagina per buyer, ${m.annata.perc}% senza annata, l'AI ne nomina il ${d.ai.perc}%. Metodo e limiti.`,
    alternates: { canonical: "/osservatorio/olio" },
    openGraph: { type: "article", url: `${SITO}/osservatorio/olio`, title: titoloOsservatorio(d.mese), locale: "it_IT", publishedTime: o.pubblicato_il ?? undefined, authors: [`${SITO}/chi-sono`] },
  };
}

export default async function Pagina() {
  const o = await osservatorio("olio");
  // Prima della pubblicazione (o se il database non risponde): l'indice dell'osservatorio.
  if (!o) redirect("/osservatorio");
  return <Osservatorio o={o} />;
}
