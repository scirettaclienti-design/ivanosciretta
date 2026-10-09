import type { Metadata } from "next";
import Link from "next/link";
import { Cornice, H1, InBreve } from "@/components/pagine/Cornice";
import { ID_IVANO, SITO, settoriPubblicati } from "@/lib/sito";

export const revalidate = 600;
export const metadata: Metadata = {
  title: "Soluzioni per settore · Ivano Sciretta",
  description: "Per ogni settore: il problema con i numeri dell'osservatorio, una mappa e un Check dimostrativi, i casi e le domande frequenti.",
  alternates: { canonical: "/soluzioni" },
  openGraph: { url: `${SITO}/soluzioni`, title: "Soluzioni per settore · Ivano Sciretta", locale: "it_IT" },
};

export default async function Soluzioni() {
  const settori = await settoriPubblicati();
  const elenco = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Soluzioni per settore",
    author: { "@id": ID_IVANO },
    itemListElement: settori.map(({ s }, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITO}/soluzioni/${s.slug}`, name: s.titolo })),
  };
  return (
    <Cornice jsonLd={[elenco]}>
      <H1>Soluzioni per settore</H1>
      <InBreve>Per ogni settore: cosa manca oggi online (numeri anonimi dall&apos;osservatorio), una mappa e un Check di esempio, i casi e le risposte alle domande più comuni.</InBreve>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2">
        {settori.map(({ s, o }) => {
          const b = o!.dati.misure.find((m) => m.id === "buyer");
          return (
            <li key={s.slug} className="rounded-lg border border-white/10 bg-surface-base p-5">
              <Link href={`/soluzioni/${s.slug}`} className="block">
                <h2 className="font-display text-2xl font-semibold text-white">{s.nome}</h2>
                <p className="mt-2 text-foreground/80">{o!.dati.campione.aziende} {s.chi} analizzati: pagina per buyer non trovata nel {b?.perc}% dei siti.</p>
                <p className="mt-3 text-primary-cyan underline underline-offset-4">Vedi la soluzione →</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </Cornice>
  );
}
