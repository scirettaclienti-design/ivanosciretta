// L'osservatorio delle botteghe e degli empori: numeri SOLO aggregati e anonimi (nessun nome accanto a una mancanza).
import Link from "next/link";
import { Azione, BannerBozza, Briciole, Continua, Cornice, Faq, H1, H2, InBreve } from "@/components/pagine/Cornice";
import { Barre } from "@/components/pagine/Grafici";
import { ID_IVANO, SITO, briciole, dataIt, virgola, type Osservatorio as O } from "@/lib/sito";

export const titoloBottega = (mese: string) => `Come si presentano online botteghe ed empori italiani · ${mese}`;

export function OsservatorioBottega({ o }: { o: O }) {
  const d = o.dati;
  const m = Object.fromEntries(d.misure.map((x) => [x.id, x]));
  const url = `${SITO}/osservatorio/bottega`;
  const titolo = titoloBottega(d.mese);
  const data = o.pubblicato_il ?? d.calcolato_il;
  const breve = `Ho letto sito e scheda Google di ${d.campione.aziende} botteghe ed empori in ${d.campione.regioni} regioni. La scheda Google non porta a un sito nel ${m.g_sito.perc}% dei casi. Nelle pagine dei siti letti non ho trovato i prezzi nel ${m.prezzi.perc}%, come si spedisce o si ritira nel ${m.spedizioni.perc}%, il catalogo dei prodotti nel ${m.catalogo.perc}%.`;
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
    name: `Presenza online di botteghe ed empori italiani · ${d.mese}`,
    description: `Numeri aggregati su ${d.campione.aziende} botteghe ed empori in ${d.campione.regioni} regioni: catalogo, prezzi, spedizioni e ritiro, cesti e idee regalo sul sito; link al sito, orari, telefono e foto sulla scheda Google. Nessun dato per singola azienda.`,
    url,
    creator: { "@type": "Person", "@id": ID_IVANO, name: "Ivano Sciretta" },
    isAccessibleForFree: true,
    inLanguage: "it",
    spatialCoverage: { "@type": "Place", name: "Italia" },
    temporalCoverage: `${(d.campione.letti_dal ?? "").slice(0, 10)}/${(d.campione.letti_al ?? "").slice(0, 10)}`,
    measurementTechnique: "Lettura automatica di home e fino a 3 pagine del sito, controllo del codice delle pagine prima di scrivere una mancanza, dati della scheda Google.",
    variableMeasured: [
      ...d.misure.map((x) => ({ "@type": "PropertyValue", name: `% ${x.etichetta}`, value: x.perc, unitText: "percento" })),
      { "@type": "PropertyValue", name: "Voto medio su Google", value: d.google.voto_medio },
    ],
  };
  const sito = ["catalogo", "prezzi", "spedizioni"].map((id) => ({ etichetta: m[id].etichetta.replace(/^./, (c: string) => c.toUpperCase()), valore: m[id].perc, testo: `${m[id].perc}%` }));
  const scheda = ["g_sito", "g_foto", "g_orari", "g_telefono"].map((id) => ({ etichetta: m[id].etichetta.replace(/^./, (c: string) => c.toUpperCase()), valore: m[id].perc, testo: `${m[id].perc}%` }));
  return (
    <Cornice jsonLd={[articolo, dataset, briciole([["Osservatorio", "/osservatorio"], ["Botteghe ed empori", "/osservatorio/bottega"]])]}>
      {o.stato === "bozza" && <BannerBozza />}
      <Briciole voci={[["Osservatorio", "/osservatorio"], ["Botteghe ed empori", "/osservatorio/bottega"]]} />
      <p className="mt-6 text-sm text-foreground/70">Osservatorio · {o.pubblicato_il ? <>pubblicato il <time dateTime={data}>{dataIt(data)}</time></> : <>calcolato il <time dateTime={d.calcolato_il}>{dataIt(d.calcolato_il)}</time></>} · di <Link href="/chi-sono" className="underline underline-offset-4">Ivano Sciretta</Link></p>
      <span hidden data-calcolato={d.calcolato_il}>{d.calcolato_il}</span>
      <div className="mt-3"><H1>{titolo}</H1></div>
      <InBreve>{breve}</InBreve>

      <H2>I numeri principali</H2>
      <Barre titolo={`Cosa non si trova sui siti (su ${m.prezzi.base} siti letti per intero)`} max={100} barre={sito} nota="Non trovato nelle pagine lette: può esserci in una pagina che non abbiamo letto. Prima di scriverlo rileggo il codice delle pagine: se c'è un prezzo, una pagina di spedizioni o un negozio online, la mancanza non conta." />
      <Barre titolo={`Cosa non c'è sulla scheda Google (su ${m.g_sito.base} schede)`} max={100} barre={scheda} nota="Dalla scheda pubblica di Google. «Meno di 5 foto» e non «nessuna foto»." />
      <Barre titolo="Cosa c'è sui siti" max={100} barre={[{ etichetta: "Con cesti, confezioni o idee regalo nominati sul sito", valore: m.cesti.perc, testo: `${m.cesti.perc}%` }]} />
      <Barre titolo={`Botteghe ed empori analizzati per regione (${d.campione.aziende} in tutto)`} barre={d.regioni.map((r) => ({ etichetta: r.regione, valore: r.n, testo: String(r.n) }))} />
      <p className="mt-6 text-lg text-foreground/85">
        Su Google i clienti le premiano: voto medio <strong className="text-white">{virgola(d.google.voto_medio)}</strong> su {d.google.con_voto} schede, con una mediana di {virgola(d.google.recensioni_mediana)} recensioni. Il problema non è la qualità: è che chi cerca non trova da subito cosa c&apos;è e come averlo.
      </p>

      <H2>Cosa significa per una bottega</H2>
      <ol className="mt-4 list-decimal space-y-3 pl-6 text-lg leading-relaxed text-foreground/85">
        <li>Se la scheda Google non porta a un sito, chi cerca un regalo non può guardare cosa c&apos;è prima di uscire di casa.</li>
        <li>Senza prezzi e senza sapere come si spedisce o si ritira, chi sceglie deve scrivere o passare: molti non lo fanno.</li>
        <li>Un cesto o una confezione regalo che non sono scritti sul sito non si possono scegliere da casa.</li>
      </ol>

      <H2>Metodo</H2>
      <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-foreground/85">
        <li><strong className="text-white">Chi:</strong> {d.campione.aziende} botteghe ed empori in {d.campione.regioni} regioni, trovati su Google Maps cercando «emporio regali» e «bottega artigianato ceramiche» in diverse città. Escluse catene, franchising, discount, fornitori e laboratori di sola produzione.</li>
        <li><strong className="text-white">Quando:</strong> siti e schede letti dal {dataIt(d.campione.letti_dal)} al {dataIt(d.campione.letti_al)}.</li>
        <li><strong className="text-white">Il sito:</strong> letti in automatico la home e fino a 3 pagine scelte per parole chiave; le misure sul sito valgono per i {d.campione.siti_letti} siti letti per intero. Gli altri non hanno un sito o non si è aperto.</li>
        <li><strong className="text-white">Il controllo:</strong> prima di scrivere «non trovato» rileggo il codice delle pagine già lette. Se c&apos;è un prezzo scritto, una pagina di spedizioni o un negozio online, quella mancanza non si conta.</li>
        <li><strong className="text-white">Google:</strong> voto, numero di recensioni, orari, telefono, foto e link al sito dalla scheda pubblica.</li>
      </ul>

      <H2>Limiti</H2>
      <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-foreground/85">
        <li>Non è un campione statistico di tutte le botteghe italiane: sono quelle trovate cercando in alcune città. La regione più rappresentata è {d.regioni[0]?.regione} ({d.regioni[0]?.n} su {d.campione.aziende}).</li>
        <li>«Non trovato nelle pagine lette» non vuol dire che la bottega non ce l&apos;ha: può stare in una pagina che non ho letto.</li>
        <li>Non pubblico qui cosa rispondono gli assistenti AI per le botteghe: l&apos;ho chiesto solo per una parte, scelta per una mancanza, e non sarebbe un campione onesto.</li>
        <li>Nessun nome di azienda accanto a una mancanza: qui ci sono solo numeri aggregati.</li>
      </ul>

      <Faq
        domande={[
          { d: "Quante botteghe italiane indicano come si spedisce?", r: `Su ${m.spedizioni.base} siti letti per intero (${d.mese}), spedizioni o ritiro non sono stati trovati nelle pagine lette nel ${m.spedizioni.perc}% dei casi.` },
          { d: "Quante schede Google di botteghe portano al sito?", r: `Su ${m.g_sito.base} schede, ${m.g_sito.base - m.g_sito.n} portano a un sito (il ${100 - m.g_sito.perc}%); nel ${m.g_sito.perc}% il link al sito manca.` },
          { d: "Quante botteghe mostrano i prezzi sul sito?", r: `Nelle pagine lette non ho trovato i prezzi nel ${m.prezzi.perc}% dei ${m.prezzi.base} siti letti per intero.` },
          { d: "Chi ha fatto questo osservatorio?", r: "Ivano Sciretta, che costruisce strumenti AI per aziende. Metodo e limiti sono scritti in questa pagina." },
          { d: "Posso vedere dove si trova la mia bottega?", r: "Sì: su ivanosciretta.tech/bottega scrivi il nome e in 10 secondi vedi la tua posizione, gratis." },
        ]}
      />

      <Continua voci={[["Soluzioni per botteghe", "/soluzioni/bottega", "Il mercato, la struttura, le mosse."], ["Metodo", "/metodo", "Mappa, Check, mosse, canone."], ["Chi sono", "/chi-sono", "Chi ha fatto questa lettura."]]} />
      <Azione titolo="Vuoi vedere dove si trova la tua bottega?" sotto="Scrivi il nome: 10 secondi, gratis, senza registrazione." href="/bottega" testo="Richiedi la mappa della tua bottega" colore="#9A4F2E" />
    </Cornice>
  );
}
