// L'osservatorio di un settore: numeri SOLO aggregati (nessun nome accanto a una mancanza) + il caso dimostrativo.
import Link from "next/link";
import { Cornice, Faq, H1, H2, InBreve } from "@/components/pagine/Cornice";
import { Barre } from "@/components/pagine/Grafici";
import { ID_IVANO, SITO, dataIt, virgola, type Osservatorio as O } from "@/lib/sito";

const MAPPA_ESEMPIO = "/s/DM-FRAN-z8hvfmrk";
const CHECK_ESEMPIO = "/c/DM-FRAN-rby7peeuzvhw4ugf";

// Le mancanze si dicono sempre «non trovata nelle pagine lette»: non vuol dire che l'azienda non ce l'ha.
export const MANCA: Record<string, string> = {
  annata: "Annata o data di raccolta non trovata nelle pagine lette",
  buyer: "Pagina per buyer, rivenditori o export non trovata nelle pagine lette",
  prezzi_formato: "Prezzi per formato non trovati nelle pagine lette",
};
const frase = (x: { id: string; etichetta: string }) => MANCA[x.id] ?? x.etichetta.replace(/^con /, "Con ");

export const titoloOsservatorio = (mese: string) => `Come si presentano online i frantoi italiani · ${mese}`;

export function Osservatorio({ o }: { o: O }) {
  const d = o.dati;
  const m = Object.fromEntries(d.misure.map((x) => [x.id, x]));
  const url = `${SITO}/osservatorio/olio`;
  const titolo = titoloOsservatorio(d.mese);
  const data = o.pubblicato_il ?? d.calcolato_il;
  const breve = `Ho letto sito e scheda Google di ${d.campione.aziende} frantoi in ${d.campione.regioni} regioni. Pagina per buyer non trovata nelle pagine lette: ${m.buyer.perc}%. Annata non trovata: ${m.annata.perc}%. L'AI nomina solo il ${d.ai.perc}% dei frantoi con risultato certo.`
  const articolo = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: titolo,
    description: breve,
    datePublished: data,
    dateModified: d.calcolato_il,
    inLanguage: "it",
    url,
    mainEntityOfPage: url,
    author: { "@type": "Person", "@id": ID_IVANO, name: "Ivano Sciretta", url: `${SITO}/chi-sono` },
    publisher: { "@id": ID_IVANO },
    image: `${url}/opengraph-image`,
  };
  const dataset = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `Presenza online dei frantoi italiani · ${d.mese}`,
    description: `Numeri aggregati su ${d.campione.aziende} frantoi in ${d.campione.regioni} regioni: annata, pagina per buyer, prezzi per formato, lingue, DOP/IGP, vendita online, citazioni degli assistenti AI e voto Google. Nessun dato per singola azienda.`,
    url,
    creator: { "@type": "Person", "@id": ID_IVANO, name: "Ivano Sciretta" },
    isAccessibleForFree: true,
    inLanguage: "it",
    spatialCoverage: { "@type": "Place", name: "Italia" },
    temporalCoverage: `${(d.campione.letti_dal ?? "").slice(0, 10)}/${(d.ai.al ?? d.campione.letti_al ?? "").slice(0, 10)}`,
    measurementTechnique: "Lettura automatica di home e fino a 3 pagine del sito, dati della scheda Google, stessa domanda da buyer a Claude e ChatGPT con ricerca web.",
    variableMeasured: [
      ...d.misure.map((x) => ({ "@type": "PropertyValue", name: `% ${frase(x).toLowerCase()}`, value: x.perc, unitText: "percento" })),
      { "@type": "PropertyValue", name: "% di frantoi nominati dall'AI (su quelli con risultato certo)", value: d.ai.perc, unitText: "percento" },
      { "@type": "PropertyValue", name: "Voto medio su Google", value: d.google.voto_medio },
    ],
  };
  return (
    <Cornice jsonLd={[articolo, dataset]}>
      <p className="text-sm text-foreground/60">Osservatorio · pubblicato il <time dateTime={data}>{dataIt(data)}</time> · di <Link href="/chi-sono" className="underline underline-offset-4">Ivano Sciretta</Link></p>
      <span hidden data-calcolato={d.calcolato_il}>{d.calcolato_il}</span>
      <div className="mt-3"><H1>{titolo}</H1></div>
      <InBreve>{breve}</InBreve>

      <H2>I numeri principali</H2>
      <Barre
        titolo={`Cosa non si trova sui siti (su ${m.annata.base} siti letti per intero)`}
        max={100}
        barre={["buyer", "annata", "prezzi_formato"].map((id) => ({ etichetta: frase(m[id]), valore: m[id].perc, testo: `${m[id].perc}%` }))}
        nota="Non trovata nelle pagine lette: può esserci in una pagina del sito che non abbiamo letto."
      />
      <Barre
        titolo={`Cosa c'è sui siti (su ${m.lingue.base} siti letti per intero)`}
        max={100}
        barre={["shop", "dop", "lingue"].map((id) => ({ etichetta: frase(m[id]), valore: m[id].perc, testo: `${m[id].perc}%` }))}
      />
      <Barre
        titolo="Cosa risponde l'AI a un buyer straniero"
        max={100}
        barre={[
          { etichetta: "Frantoi nominati da Claude o ChatGPT", valore: d.ai.perc, testo: `${d.ai.perc}% (${d.ai.nominate} su ${d.ai.certe})` },
          { etichetta: "Frantoi mai nominati", valore: 100 - d.ai.perc, testo: `${100 - d.ai.perc}% (${d.ai.certe - d.ai.nominate} su ${d.ai.certe})` },
        ]}
        nota={`Domande fatte il ${dataIt(d.ai.dal)}. Contano solo i ${d.ai.certe} frantoi con risultato certo; ${d.ai.incerte} risultati incerti sono esclusi.`}
      />
      <Barre
        titolo={`Frantoi analizzati per regione (${d.campione.aziende} in tutto)`}
        barre={d.regioni.map((r) => ({ etichetta: r.regione, valore: r.n, testo: String(r.n) }))}
      />
      <p className="mt-6 text-lg text-foreground/85">
        Su Google i clienti li premiano: voto medio <strong className="text-white">{virgola(d.google.voto_medio)}</strong> su {d.google.con_voto} schede, con una mediana di {virgola(d.google.recensioni_mediana)} recensioni. Il problema non è la qualità: è quello che trova online chi non li conosce ancora.
      </p>

      <H2>Cosa significa per un frantoio</H2>
      <ol className="mt-4 list-decimal space-y-3 pl-6 text-lg leading-relaxed text-foreground/85">
        <li>Un buyer che vi trova non ha una pagina pensata per lui: niente listino, niente formati, spesso niente inglese. Scrive a un altro.</li>
        <li>Senza annata e prezzi per formato, chi compra non sa cosa riceve né quanto costa: chiede, aspetta, o lascia perdere.</li>
        <li>Gli assistenti AI consigliano chi trovano scritto chiaro online. Se il vostro sito non dice chi siete, cosa fate e per chi, l&apos;AI non vi nomina.</li>
      </ol>

      <H2>Caso dimostrativo</H2>
      <p className="mt-3 text-lg text-foreground/85">
        Il <strong className="text-white">Frantoio Dimostrativo</strong> è un <strong className="text-white">caso dimostrativo</strong>: azienda e dati inventati, per mostrare cosa vede un frantoio vero senza esporre nessuno.
      </p>
      <ul className="mt-3 space-y-2 text-lg">
        <li><a href={MAPPA_ESEMPIO} className="text-primary-cyan underline underline-offset-4">La mappa di esempio</a> — cosa trova online chi vi cerca, con le fonti.</li>
        <li><a href={CHECK_ESEMPIO} className="text-primary-cyan underline underline-offset-4">Il Check di esempio</a> — le mosse in ordine, con il ritorno calcolato.</li>
      </ul>

      <H2>Metodo</H2>
      <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-foreground/85">
        <li><strong className="text-white">Chi:</strong> {d.campione.aziende} frantoi in {d.campione.regioni} regioni, trovati su Google Maps cercando «frantoio» nelle zone olivicole e tenendo solo chi vende con il proprio marchio.</li>
        <li><strong className="text-white">Quando:</strong> siti e schede letti dal {dataIt(d.campione.letti_dal)} al {dataIt(d.campione.letti_al)}; domande all&apos;AI il {dataIt(d.ai.dal)}.</li>
        <li><strong className="text-white">Pagine lette:</strong> per ogni sito, la home e fino a 3 pagine scelte in automatico per parole chiave. Quello che sta solo in altre pagine non lo vediamo: per questo diciamo «non trovata nelle pagine lette», non «assente».</li>
        <li><strong className="text-white">Il sito:</strong> letti in automatico la home e fino a 3 pagine scelte per parole chiave. Le misure sul sito valgono per i {d.campione.siti_letti} siti letti per intero.</li>
        <li><strong className="text-white">Google:</strong> voto, numero di recensioni, orari e telefono dalla scheda pubblica.</li>
        <li><strong className="text-white">L&apos;AI:</strong> la stessa domanda di un buyer straniero (per esempio «quale frantoio mi consigli in Puglia per importare olio in Germania?»), fatta 3 volte a Claude e 3 a ChatGPT con ricerca web. «Nominato» se un modello lo nomina in almeno 2 risposte su 3; «mai nominato» solo se nessuna delle 6 risposte lo nomina; il resto è incerto ed escluso.</li>
      </ul>

      <H2>Limiti</H2>
      <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-foreground/85">
        <li>Non è un campione statistico di tutti i frantoi italiani: sono frantoi che vendono con il proprio marchio, scelti per zona. La Puglia pesa di più ({d.regioni[0]?.regione === "Puglia" ? d.regioni[0].n : "—"} su {d.campione.aziende}).</li>
        <li>«Non trovata nelle pagine lette» non vuol dire che il frantoio non ce l&apos;ha: può stare in una pagina che non abbiamo letto.</li>
        <li>Le risposte dell&apos;AI cambiano nel tempo e da persona a persona: sono una fotografia di quel giorno.</li>
        <li>Nessun nome di azienda accanto a una mancanza: qui ci sono solo numeri aggregati.</li>
      </ul>

      <Faq
        domande={[
          { d: "Quanti frantoi italiani hanno una pagina per buyer?", r: `Nell'osservatorio di ${d.mese} l'abbiamo trovata in ${m.buyer.base - m.buyer.n} siti su ${m.buyer.base} letti per intero (il ${100 - m.buyer.perc}%); nel ${m.buyer.perc}% non è stata trovata nelle pagine lette.` },
          { d: "Quanti frantoi indicano l'annata dell'olio sul sito?", r: `L'abbiamo trovata in ${m.annata.base - m.annata.n} siti su ${m.annata.base} (il ${100 - m.annata.perc}%). Nel ${m.annata.perc}% annata o data di raccolta non è stata trovata nelle pagine lette.` },
          { d: "ChatGPT e Claude consigliano i frantoi italiani?", r: `A una domanda da buyer straniero hanno nominato ${d.ai.nominate} frantoi su ${d.ai.certe} con risultato certo (il ${d.ai.perc}%), il ${dataIt(d.ai.dal)}.` },
          { d: "Chi ha fatto questo osservatorio?", r: "Ivano Sciretta, che costruisce strumenti AI per aziende. Metodo e limiti sono scritti in questa pagina." },
          { d: "Posso vedere dove si trova il mio frantoio?", r: "Sì: su ivanosciretta.tech/olio scrivi il nome del frantoio e in 10 secondi vedi la tua posizione, gratis." },
        ]}
      />

      <section className="mt-14 rounded-lg border border-primary-cyan/40 bg-surface-low p-6 text-center">
        <p className="font-display text-2xl font-semibold text-white">Vuoi vedere dove si trova il tuo frantoio?</p>
        <p className="mt-2 text-foreground/80">Scrivi il nome: 10 secondi, gratis.</p>
        <a href="/olio" className="mt-4 inline-flex min-h-12 items-center rounded-lg bg-primary-cyan px-6 font-semibold text-black">Scrivi il nome del frantoio</a>
      </section>
    </Cornice>
  );
}
