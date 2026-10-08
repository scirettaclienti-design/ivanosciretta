import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Cornice, Faq, H1, InBreve } from "@/components/pagine/Cornice";
import { ID_IVANO, SITO, lavori } from "@/lib/sito";

export const metadata: Metadata = {
  title: "Lavori · Ivano Sciretta",
  description: `${lavori.length} strumenti costruiti da Ivano Sciretta: concierge 3D a Mykonos, motore di valutazione immobiliare, coupon contro il bullismo, mappe per frantoi e altro. Con link e schermate reali.`,
  alternates: { canonical: "/lavori" },
  openGraph: { url: `${SITO}/lavori`, title: "Lavori · Ivano Sciretta", description: "Strumenti costruiti per aziende vere, con link e schermate reali.", locale: "it_IT" },
};

export default function Lavori() {
  const elenco = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Lavori di Ivano Sciretta",
    itemListElement: lavori.map((l, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITO}/lavori/${l.slug}`, name: l.cliente })),
    author: { "@id": ID_IVANO },
  };
  return (
    <Cornice jsonLd={[elenco]}>
      <H1>Lavori</H1>
      <InBreve>
        {lavori.length} strumenti che ho costruito da me per aziende vere — {lavori.map((l) => l.cliente.replace(/ \(.*\)$/, "")).join(", ")}. Per ognuno: il problema, cosa ho costruito e una schermata reale.
      </InBreve>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {lavori.map((l, i) => (
          <li key={l.slug} className="overflow-hidden rounded-lg border border-white/10 bg-surface-base">
            <Link href={`/lavori/${l.slug}`} className="block">
              {l.immagine && <Image src={l.immagine} alt={l.alt ?? ""} width={640} height={400} priority={i === 0} sizes="(min-width: 640px) 360px, 100vw" className="aspect-[16/10] w-full object-cover object-top" />}
              <div className="p-4">
                <h2 className="font-display text-xl font-semibold text-white">{l.cliente}</h2>
                <p className="text-sm text-foreground/60">{l.settore}</p>
                <p className="mt-2 text-foreground/85">{l.problema}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Faq
        domande={[
          { d: "Questi lavori li ha fatti tutti Ivano Sciretta?", r: "Sì: ogni strumento in questa pagina l'ho costruito io, dal progetto al codice alla messa online." },
          { d: "I risultati sono misurati?", r: "Scrivo un risultato solo quando è misurato. Dove non c'è un numero verificato, non c'è nessun numero." },
          { d: "Le schermate sono reali?", r: "Sì: sono prese dai siti dal vivo o, dove il servizio non è pubblico, da una prova con dati di esempio." },
          { d: "Cos'è il Frantoio Dimostrativo?", r: "Un caso dimostrativo con azienda e dati inventati, per mostrare la mappa e il Check senza esporre nessuna azienda vera." },
        ]}
      />
    </Cornice>
  );
}
