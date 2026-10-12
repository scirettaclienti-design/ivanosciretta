import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Azione, Briciole, Continua, Cornice, Faq, H1, InBreve } from "@/components/pagine/Cornice";
import { ID_IVANO, SITO, briciole, lavori } from "@/lib/sito";

export const metadata: Metadata = {
  title: "Lavori · casi con il nome del cliente · Ivano Sciretta",
  description: "Gli strumenti costruiti da Ivano Sciretta: Smashtag, Lumina XP, Casa Incontro, Mykonos Made in Italy e altri. Per ognuno: il problema, cosa ho fatto, cosa è cambiato. Solo fatti verificabili.",
  alternates: { canonical: "/lavori" },
  openGraph: { url: `${SITO}/lavori`, title: "Lavori · Ivano Sciretta", description: "Casi con il nome del cliente: problema, cosa ho fatto, cosa è cambiato.", locale: "it_IT" },
};

// Prima i casi con il nome del cliente (e il suo permesso), poi gli altri.
const ordinati = [...lavori].sort((a, b) => Number(Boolean(b.permesso_cliente)) - Number(Boolean(a.permesso_cliente)));

export default function Lavori() {
  const elenco = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Lavori di Ivano Sciretta",
    itemListElement: ordinati.map((l, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITO}/lavori/${l.slug}`, name: l.cliente })),
    author: { "@id": ID_IVANO },
  };
  return (
    <Cornice jsonLd={[elenco, briciole([["Lavori", "/lavori"]])]}>
      <Briciole voci={[["Lavori", "/lavori"]]} />
      <div className="mt-6"><H1>Lavori: gli strumenti che ho costruito, con il nome del cliente</H1></div>
      <InBreve>
        Costruisco da me strumenti AI per aziende vere. Qui trovi {lavori.length} casi, tra cui {ordinati.filter((l) => l.permesso_cliente).map((l) => l.cliente.replace(/ \(.*\)$/, "").replace(/ ×.*/, "").replace(/ \(progetto mio\)/, "")).join(", ")}: per ognuno il problema, cosa ho fatto e, quando c&apos;è un dato verificabile, cosa è cambiato.
      </InBreve>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {ordinati.map((l, i) => (
          <li key={l.slug} className="flex flex-col overflow-hidden rounded-lg border border-white/10 bg-surface-base">
            <Link href={`/lavori/${l.slug}`} className="block">
              {l.immagine && <Image src={l.immagine} alt={l.alt ?? ""} width={640} height={400} priority={i === 0} sizes="(min-width: 640px) 360px, 100vw" className="aspect-[16/10] w-full object-cover object-top" />}
              <div className="p-4">
                {l.permesso_cliente && <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary-cyan">Con il permesso del cliente</p>}
                <h2 className="font-display text-xl font-semibold text-white">{l.cliente}</h2>
                <p className="text-sm text-foreground/70">{l.settore}</p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-foreground/70">Il problema</p>
                <p className="text-foreground/90">{l.problema}</p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-foreground/70">Cosa ho fatto</p>
                <p className="text-foreground/90">{l.costruito[0]}</p>
                {l.cambiato && (
                  <>
                    <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-foreground/70">Cosa è cambiato</p>
                    <p className="text-foreground/90">{l.cambiato[0]}</p>
                  </>
                )}
                <p className="mt-4 text-primary-cyan underline underline-offset-4">Leggi il caso →</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-foreground/70">Dove non c&apos;è un dato verificato, la sezione «cosa è cambiato» non compare: non scrivo numeri che non ho misurato.</p>
      <Faq
        domande={[
          { d: "Questi lavori li ha fatti tutti Ivano Sciretta?", r: "Sì: ogni strumento in questa pagina l'ho costruito io, dal progetto al codice alla messa online." },
          { d: "I risultati sono misurati?", r: "Scrivo un risultato solo quando è misurato. Dove non c'è un numero verificato, non c'è nessun numero." },
          { d: "I clienti sono d'accordo a comparire?", r: "Smashtag, Lumina XP e Casa Incontro hanno dato il permesso di pubblicare il loro nome." },
          { d: "Le schermate sono reali?", r: "Sì: sono prese dai siti dal vivo o, dove il servizio non è pubblico, da una prova con dati di esempio." },
          { d: "Cos'è il Frantoio Dimostrativo?", r: "Un caso dimostrativo con azienda e dati inventati, per mostrare la mappa e il Check senza esporre nessuna azienda vera." },
        ]}
      />
      <Continua voci={[["Chi sono", "/chi-sono", "Chi costruisce, e perché puoi fidarti."], ["Soluzioni", "/soluzioni", "Frantoi, botteghe ed empori."], ["Metodo", "/metodo", "Come funziona una scatola."]]} />
      <Azione titolo="Vuoi vedere dove si trova la tua azienda?" sotto="Scrivi il nome: 10 secondi, gratis, senza registrazione." href="/scatole" testo="Richiedi la mappa gratuita" />
    </Cornice>
  );
}
