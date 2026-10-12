import type { Metadata } from "next";
import { Azione, BannerBozza, Briciole, Continua, Cornice, Faq, H1, InBreve } from "@/components/pagine/Cornice";
import { Esperienza, type RiquadroSettore } from "@/components/pagine/Esperienza";
import { SETTORI, settoriConDati, strati } from "@/data/settori";
import { ID_IVANO, SITO, briciole } from "@/lib/sito";

export const revalidate = 600;

export async function generateMetadata(): Promise<Metadata> {
  const dati = await settoriConDati();
  const bozza = dati.some((x) => x.bozza);
  return {
    title: "Soluzioni per frantoi, botteghe ed empori · Ivano Sciretta",
    description: "Per ogni settore tre strati: il mercato (numeri misurati sulle nostre analisi), la struttura (cosa c'è e cosa manca di solito) e le soluzioni (le mosse).",
    alternates: { canonical: "/soluzioni" },
    openGraph: { url: `${SITO}/soluzioni`, title: "Soluzioni per settore · Ivano Sciretta", locale: "it_IT" },
    // Con un settore ancora in bozza (solo nelle anteprime) la pagina non si indicizza.
    ...(bozza ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function Soluzioni() {
  const dati = await settoriConDati();
  const bozza = dati.some((x) => x.bozza);
  const per = new Map(dati.map((x) => [x.s.slug, x.o]));
  const riquadri: RiquadroSettore[] = SETTORI.map((s) => {
    const o = per.get(s.slug);
    return { slug: s.slug, nome: s.nome, promessa: s.promessa, colore: s.colore, chiaro: s.chiaro, arrivo: s.stato === "in_arrivo" || !o, strati: o && s.stato === "attivo" ? strati(s.slug, o.dati) : null, href: `/soluzioni/${s.slug}` };
  });
  const elenco = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Soluzioni per settore",
    author: { "@id": ID_IVANO },
    itemListElement: dati.map(({ s }, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITO}/soluzioni/${s.slug}`, name: s.titolo })),
  };
  return (
    <Cornice jsonLd={[elenco, briciole([["Soluzioni", "/soluzioni"]])]}>
      {bozza && <BannerBozza />}
      <Briciole voci={[["Soluzioni", "/soluzioni"]]} />
      <div className="mt-6"><H1>Soluzioni per frantoi, botteghe ed empori</H1></div>
      <InBreve>
        Aiuto frantoi, botteghe ed empori a farsi trovare e scegliere online. Per ogni settore ti mostro tre strati: il mercato (numeri misurati sulle mie analisi), la struttura (cosa c&apos;è e cosa manca di solito) e le soluzioni (le mosse, una alla volta).
      </InBreve>
      <Esperienza riquadri={riquadri} />
      <p className="mt-6 text-sm text-foreground/70">Solo numeri misurati, aggregati e anonimi: nessuna azienda è nominata accanto a una mancanza. Per ogni settore c&apos;è un osservatorio con metodo e limiti.</p>
      <Faq
        domande={[
          { d: "Cosa sono le soluzioni per settore?", r: "Per frantoi e botteghe, tre strati: cosa succede nel mercato (numeri aggregati dalle mie analisi), com'è fatta di solito la presenza online (cosa c'è e cosa manca) e quali mosse la migliorano." },
          { d: "I numeri da dove vengono?", r: "Dalle analisi che faccio io: leggo sito e scheda Google di ogni azienda. Sono numeri aggregati e anonimi, con metodo e limiti scritti nell'osservatorio del settore." },
          { d: "E gli altri settori?", r: "Le cantine sono in arrivo. Quando un settore avrà i suoi numeri, comparirà qui." },
        ]}
      />
      <Continua voci={[["Metodo", "/metodo", "Mappa gratuita, Check 4D, mosse, canone."], ["Lavori", "/lavori", "Casi veri, con il nome del cliente."], ["Osservatorio", "/osservatorio", "I numeri, con metodo e limiti."]]} />
      <Azione titolo="Vuoi vedere dove si trova la tua azienda?" sotto="Scrivi il nome: 10 secondi, gratis, senza registrazione." href="/scatole" testo="Richiedi la mappa gratuita" />
    </Cornice>
  );
}
