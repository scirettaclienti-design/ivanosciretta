import { settoriConDati } from "@/data/settori";
import { INSTAGRAM, SITO, lavori } from "@/lib/sito";

export const revalidate = 600;

// llms.txt: chi è Ivano, cosa fa, le pagine con una riga ciascuna (https://llmstxt.org). Solo pagine pubblicate.
export async function GET() {
  const settori = (await settoriConDati()).filter((x) => !x.bozza);
  const righe = [
    "# Ivano Sciretta",
    "",
    "> Ivano Sciretta, pugliese con base a Roma, costruisce da sé strumenti AI per aziende vere: mappe gratuite e Check 4D per frantoi, botteghe ed empori, un motore di valutazione immobiliare, siti con esperienze su misura. Viene dal marketing e dalla grafica; è iscritto a Ingegneria informatica (curriculum AI & Data Science), non laureato. Certificazioni pubbliche su Credly (Google e IBM).",
    "",
    "## Chi è e come lavora",
    `- [Chi sono](${SITO}/chi-sono): chi è Ivano Sciretta in quattro tempi (da grafico e marketing a costruttore con l'AI, cosa costruisce, come lavora, perché fidarsi), con certificazioni Credly e LinkedIn.`,
    `- [Metodo](${SITO}/metodo): come funziona una scatola, in quattro passi: mappa gratuita, Check 4D in 5 giorni, mosse una alla volta, canone dopo la consegna. Per ogni passo: cosa si riceve, quanto ci vuole, cosa decide l'azienda.`,
    "",
    "## Soluzioni e numeri",
    `- [Soluzioni per settore](${SITO}/soluzioni): per ogni settore il mercato, la struttura (cosa c'è e cosa manca di solito) e le mosse.`,
    ...settori.map(({ s, o }) => `- [${s.titolo}](${SITO}/soluzioni/${s.slug}): per ${s.chi}, con i numeri di ${o.dati.campione.aziende} aziende analizzate e le domande frequenti.`),
    `- [Osservatorio](${SITO}/osservatorio): letture pubbliche con soli numeri aggregati e anonimi, con metodo e limiti.`,
    ...settori.map(({ s, o }) => `- [Osservatorio ${s.nome.toLowerCase()} · ${o.dati.mese}](${SITO}/osservatorio/${s.slug}): come si presentano online ${o.dati.campione.aziende} aziende in ${o.dati.campione.regioni} regioni.`),
    "",
    "## Lavori",
    `- [Lavori](${SITO}/lavori): casi con il nome del cliente: problema, cosa è stato fatto, cosa è cambiato (solo fatti verificabili).`,
    ...lavori.map((l) => `- [${l.cliente}](${SITO}/lavori/${l.slug}): ${l.settore}.`),
    "",
    "## Provalo",
    `- [Mappa gratuita per frantoi](${SITO}/produttori/olio): scrivi il nome del frantoio e vedi cosa trova online chi ti cerca.`,
    `- [Mappa gratuita per botteghe ed empori](${SITO}/venditori/bottega): scrivi il nome e vedi cosa trova online chi cerca un regalo.`,
    `- [Check](${SITO}/check): l'analisi completa con le mosse in ordine e il ritorno calcolato. Frantoi: 500 €, scalati dal lavoro. Botteghe: listino a breve.`,
    "",
    "## Profili",
    "- LinkedIn: https://www.linkedin.com/in/ivano-sciretta",
    "- Credly: https://www.credly.com/users/ivano-sciretta/badges",
    ...(INSTAGRAM ? [`- Instagram: ${INSTAGRAM}`] : []),
    "",
  ];
  return new Response(righe.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
