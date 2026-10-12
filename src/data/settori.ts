// I settori di /soluzioni: testi fissi (cosa sono, le mosse, le domande) e funzioni che mettono i NUMERI dell'osservatorio.
// Regola: solo numeri misurati, aggregati e anonimi; nessuna azienda nominata accanto a una mancanza; niente risultati promessi.
import type { DatiOsservatorio, Misura } from "@/lib/sito";
import { dataIt, osservatorio, virgola, type Osservatorio } from "@/lib/sito";

export type Mossa = { nome: string; riga: string };
export type Numero = { id: string; etichetta: string; valore: number; testo: string };
export type Strato = { titolo: string; riga: string; numeri?: Numero[]; punti?: string[]; mosse?: Mossa[] };
export type Faq = { d: string; r: string };

export type Settore = {
  slug: string;
  stato: "attivo" | "in_arrivo";
  nome: string; // «Frantoi»
  chi: string; // «frantoi e produttori di olio extravergine»
  uno: string; // «frantoio»
  titolo: string; // H1 della pagina di settore
  promessa: string; // una riga, nei riquadri
  colore: string; // colore pieno (testo bianco sopra)
  chiaro: string; // lo stesso colore, leggibile su fondo scuro
  ponte: string; // dove si scrive il nome (la mappa gratuita)
  spot?: { mp4: string; poster: string };
  mappa?: string; // mappa dimostrativa
  check?: string; // Check dimostrativo
  prezzi: string; // come si dicono i prezzi in questo settore
};

export const SETTORI: Settore[] = [
  {
    slug: "olio",
    stato: "attivo",
    nome: "Frantoi",
    chi: "frantoi e produttori di olio extravergine",
    uno: "frantoio",
    titolo: "Soluzioni per frantoi: farsi trovare e scegliere da chi compra",
    promessa: "Un buyer vi trova e capisce subito cosa vendete, a che formato e a che prezzo.",
    colore: "#5B6B2F",
    chiaro: "#B7C97A",
    ponte: "/olio",
    spot: { mp4: "/_scatole/media/olio/video.mp4", poster: "/_scatole/media/olio/poster.jpg" },
    mappa: "/s/DM-FRAN-z8hvfmrk",
    check: "/c/DM-FRAN-rby7peeuzvhw4ugf",
    prezzi: "Check 4D: 500 €, scalati per intero dal lavoro se poi lo facciamo insieme. Se non prosegui, il piano resta tuo.",
  },
  {
    slug: "bottega",
    stato: "attivo",
    nome: "Botteghe ed empori",
    chi: "botteghe, empori e negozi di regali",
    uno: "emporio o bottega",
    titolo: "Soluzioni per botteghe ed empori: farsi scegliere prima che il cliente entri",
    promessa: "Chi cerca un regalo vi trova, vede cosa avete e sa come averlo, anche prima di Natale.",
    colore: "#9A4F2E",
    chiaro: "#E6A07C",
    ponte: "/bottega",
    spot: { mp4: "/_scatole/media/bottega/video.mp4", poster: "/_scatole/media/bottega/poster.jpg" },
    prezzi: "Listino a breve.",
  },
  {
    slug: "vino",
    stato: "in_arrivo",
    nome: "Cantine",
    chi: "cantine e produttori di vino",
    uno: "cantina",
    titolo: "Soluzioni per cantine",
    promessa: "In arrivo.",
    colore: "#6B3A5E",
    chiaro: "#D6A3C6",
    ponte: "/fiera",
    prezzi: "",
  },
];
export const settore = (slug: string) => SETTORI.find((s) => s.slug === slug);

const m = (d: DatiOsservatorio) => Object.fromEntries(d.misure.map((x) => [x.id, x])) as Record<string, Misura | undefined>;
const num = (x: Misura | undefined, etichetta: string): Numero | null => (x ? { id: x.id, etichetta, valore: x.perc, testo: `${x.perc}%` } : null);
const compatta = <T,>(l: (T | null)[]) => l.filter((x): x is T => x !== null);

// Le «mosse»: le stesse parole delle pagine e dei Check dei settori (src/fascicoli nel repo scatole).
const MOSSE: Record<string, Mossa[]> = {
  olio: [
    { nome: "La pagina del vostro olio", riga: "Tre righe per ogni olio: da dove viene, come si fa, perché costa così." },
    { nome: "La scrivania per i buyer", riga: "Risponde a chi scrive dall'estero nella sua lingua, usando solo i vostri dati." },
    { nome: "Il preventivo in un minuto", riga: "Dal listino al PDF: lo controllate voi e lo mandate." },
    { nome: "Il lotto parlante", riga: "Un QR per lotto: chi lo inquadra scopre chi siete e vi lascia la mail." },
    { nome: "Il kit per chi rivende", riga: "La scheda pronta per enoteche e negozi, per raccontare il vostro olio." },
    { nome: "La stagione", riga: "Da tre a cinque video brevi a stagione, con i vostri materiali." },
  ],
  bottega: [
    { nome: "Il catalogo vivo", riga: "I vostri prodotti online, aggiornati in un posto solo." },
    { nome: "Cesti e regali", riga: "Il cliente compone il cesto dal vostro catalogo, voi lo preparate." },
    { nome: "La vetrina su Google", riga: "La scheda Google aggiornata, con foto e orari veri." },
    { nome: "Il banco su WhatsApp", riga: "Risponde alle domande di sempre con i vostri orari, prezzi e prodotti." },
    { nome: "Clienti che tornano", riga: "Un messaggio al momento giusto a chi ha già comprato e ha detto sì." },
    { nome: "Chi c'è dietro", riga: "Una scheda per ogni produttore, al banco e online." },
  ],
};

/** I tre strati di un settore: il mercato (numeri), la struttura (cosa c'è e cosa manca di solito), le soluzioni (le mosse). */
export function strati(slug: string, d: DatiOsservatorio): [Strato, Strato, Strato] {
  const x = m(d);
  const c = d.campione;
  if (slug === "olio") {
    return [
      {
        titolo: "Il mercato",
        riga: `${c.aziende} frantoi in ${c.regioni} regioni, letti da me uno per uno (${d.mese}). Su Google i clienti li premiano: voto medio ${virgola(d.google.voto_medio)}.`,
        numeri: compatta([
          num(x.buyer, "Pagina per buyer non trovata nelle pagine lette"),
          num(x.annata, "Annata o data di raccolta non trovata"),
          num(x.prezzi_formato, "Prezzi per formato non trovati"),
          { id: "ai", etichetta: "Frantoi nominati da Claude o ChatGPT a un buyer straniero", valore: d.ai.perc, testo: `${d.ai.perc}%` },
        ]),
      },
      {
        titolo: "La struttura",
        riga: "Cosa c'è di solito, e cosa manca.",
        punti: compatta([
          `C'è: una scheda Google curata, con un voto alto (media ${virgola(d.google.voto_medio)}).`,
          x.shop ? `C'è, in ${x.shop.perc}% dei siti: la vendita online. ${x.dop ? `Una DOP o IGP nominata nel ${x.dop.perc}%.` : ""}` : null,
          x.buyer ? `Manca: una pagina pensata per chi compra e rivende (${x.buyer.perc}% dei siti).` : null,
          x.annata ? `Manca: l'annata o la data di raccolta (${x.annata.perc}%) e i prezzi per formato (${x.prezzi_formato?.perc ?? "—"}%).` : null,
          x.lingue ? `Il sito è anche in un'altra lingua nel ${x.lingue.perc}% dei casi.` : null,
        ]),
      },
      {
        titolo: "Le soluzioni",
        riga: "Le mosse, in ordine di quanto servono al vostro caso: le sceglie il Check, una per volta.",
        mosse: MOSSE.olio,
      },
    ];
  }
  // bottega
  return [
    {
      titolo: "Il mercato",
      riga: `${c.aziende} botteghe ed empori in ${c.regioni} regioni, letti da me uno per uno (${d.mese}). Su Google i clienti li premiano: voto medio ${virgola(d.google.voto_medio)}.`,
      numeri: compatta([
        num(x.g_sito, "Scheda Google senza il link a un sito"),
        num(x.prezzi, "Prezzi non trovati sul sito"),
        num(x.spedizioni, "Come si spedisce o si ritira non trovato sul sito"),
        num(x.catalogo, "Catalogo dei prodotti non trovato sul sito"),
      ]),
    },
    {
      titolo: "La struttura",
      riga: "Cosa c'è di solito, e cosa manca.",
      punti: compatta([
        x.g_orari && x.g_telefono ? `C'è: una scheda Google quasi sempre completa: orari (manca nel ${x.g_orari.perc}%) e telefono (manca nel ${x.g_telefono.perc}%).` : null,
        x.g_sito ? `Manca spesso: il collegamento tra la scheda Google e il sito (${x.g_sito.perc}% delle schede).` : null,
        x.prezzi ? `Nel sito, quando c'è: prezzi non trovati nel ${x.prezzi.perc}%, spedizioni o ritiro non trovati nel ${x.spedizioni?.perc ?? "—"}%, catalogo non trovato nel ${x.catalogo?.perc ?? "—"}%.` : null,
        x.cesti ? `Cesti, confezioni o idee regalo nominati sul sito: ${x.cesti.perc}%.` : null,
      ]),
    },
    {
      titolo: "Le soluzioni",
      riga: "Le mosse, in ordine di quanto servono al vostro caso: le sceglie il Check, una per volta.",
      mosse: MOSSE.bottega,
    },
  ];
}

const MESE_DA = (d: DatiOsservatorio) => dataIt(d.campione.letti_dal);

/** Le domande frequenti vere del settore: risposte con numeri aggregati o fatti scritti nelle pagine del sito. */
export function domande(slug: string, d: DatiOsservatorio): Faq[] {
  const x = m(d);
  const c = d.campione;
  const comuni = (s: Settore): Faq[] => [
    { d: "Cos'è la mappa gratuita?", r: `Scrivi il nome della tua azienda: in pochi secondi vedi cosa trova online chi ti cerca prima di comprare, con le fonti. Gratis, senza registrazione.` },
    { d: "Cos'è il Check 4D?", r: `L'analisi completa: 24 punti misurati, il confronto con i 3 ${s.slug === "olio" ? "frantoi" : "negozi"} più vicini, le 3 mosse da fare con costi e ritorno e una demo con i tuoi dati. Dura 5 giorni, con 2 telefonate da 30 minuti. ${s.prezzi}` },
    { d: "I dati delle aziende sono pubblici?", r: "No. Qui ci sono solo numeri aggregati e anonimi: nessun nome di azienda accanto a una mancanza. La tua mappa è privata, con un link che conosci solo tu." },
  ];
  if (slug === "olio") {
    const s = settore("olio")!;
    return [
      { d: "Cosa manca di solito online ai frantoi?", r: `Su ${x.buyer?.base ?? c.siti_letti} siti letti per intero (${d.mese}): pagina per buyer non trovata nel ${x.buyer?.perc}%, annata o data di raccolta nel ${x.annata?.perc}%, prezzi per formato nel ${x.prezzi_formato?.perc}%. «Non trovata» vuol dire non trovata nelle pagine che ho letto: può stare altrove.` },
      { d: "ChatGPT e Claude consigliano i frantoi italiani?", r: `A una domanda da buyer straniero, Claude e ChatGPT hanno nominato ${d.ai.nominate} frantoi su ${d.ai.certe} con risultato certo (il ${d.ai.perc}%), il ${dataIt(d.ai.dal)}. Le risposte cambiano nel tempo: è una fotografia di quel giorno.` },
      { d: "Perché l'annata sul sito conta?", r: `Chi compra olio nuovo vuole sapere cosa riceve: se l'annata non c'è, deve chiedere. Nelle pagine che ho letto non l'ho trovata nel ${x.annata?.perc}% dei siti.` },
      { d: "Un frantoio piccolo ha bisogno di una pagina per i buyer?", r: "Una pagina fatta per chi compra (formati, prezzi, lingua, contatti) risponde alle domande prima che le facciano. Con il Check scopri quale mossa serve al tuo caso, senza partire dalla più grande." },
      ...comuni(s),
      { d: "Posso vedere un esempio?", r: "Sì: la mappa e il Check di esempio sono un caso dimostrativo, con azienda e dati inventati. Li trovi in questa pagina." },
    ];
  }
  const s = settore("bottega")!;
  return [
    { d: "Cosa manca di solito online a una bottega o a un emporio?", r: `Su ${c.aziende} botteghe ed empori (${d.mese}): la scheda Google non porta a un sito nel ${x.g_sito?.perc}% dei casi; sui ${c.siti_letti} siti letti per intero non ho trovato i prezzi nel ${x.prezzi?.perc}%, come si spedisce o si ritira nel ${x.spedizioni?.perc}%, il catalogo nel ${x.catalogo?.perc}%. «Non trovato» vuol dire non trovato nelle pagine che ho letto.` },
    { d: "Perché la scheda Google deve portare al sito?", r: `Chi cerca un regalo parte quasi sempre da Google: se la scheda non ha il link, non può guardare cosa c'è prima di uscire di casa. Succede nel ${x.g_sito?.perc}% delle schede che ho letto.` },
    { d: "Si può vendere un cesto di Natale senza un e-commerce complicato?", r: "Sì: il cliente sceglie i prodotti dal catalogo e compone il cesto, voi lo preparate. È una delle mosse che il Check può proporre, solo se serve al vostro caso." },
    { d: "Quanto costa?", r: "Il listino per le botteghe è in arrivo. Il Check 4D e le mosse si scalano e si scelgono una alla volta; prima di tutto c'è la mappa, gratuita." },
    ...comuni(s).filter((f) => f.d !== "Cos'è il Check 4D?"),
    { d: "Cos'è il Check 4D?", r: `L'analisi completa: 24 punti misurati, il confronto con i 3 negozi più vicini, le 3 mosse da fare con costi e ritorno e una demo con i tuoi dati. Dura 5 giorni, con 2 telefonate da 30 minuti. Listino a breve.` },
  ];
}
export { MESE_DA };

/** I settori attivi con i loro numeri. «bozza»: l'osservatorio non è ancora pubblicato (si vede solo nelle anteprime): la pagina non si indicizza. */
export async function settoriConDati() {
  const tutti = await Promise.all(SETTORI.filter((s) => s.stato === "attivo").map(async (s) => ({ s, o: await osservatorio(s.slug) })));
  return tutti.filter((x): x is { s: Settore; o: Osservatorio } => Boolean(x.o)).map(({ s, o }) => ({ s, o, bozza: o.stato === "bozza" }));
}
