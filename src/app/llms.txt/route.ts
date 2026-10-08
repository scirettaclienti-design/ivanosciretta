import { SITO, lavori, osservatorio } from "@/lib/sito";

export const revalidate = 600;

// llms.txt: chi è Ivano, cosa fa, le pagine con una riga ciascuna (https://llmstxt.org).
export async function GET() {
  const o = await osservatorio("olio");
  const righe = [
    "# Ivano Sciretta",
    "",
    "> Ivano Sciretta, pugliese con base a Roma, costruisce da sé strumenti AI per aziende vere: mappe e Check per i frantoi, un motore di valutazione immobiliare, siti con esperienze 3D. Certificazioni AI di Google e IBM su Credly.",
    "",
    "## Pagine",
    `- [Chi sono](${SITO}/chi-sono): percorso, modo di lavorare, certificazioni (Credly) e LinkedIn.`,
    `- [Lavori](${SITO}/lavori): gli strumenti costruiti, con problema, cosa è stato fatto e schermate reali.`,
    ...lavori.map((l) => `- [${l.cliente}](${SITO}/lavori/${l.slug}): ${l.settore}.`),
    o
      ? `- [Osservatorio frantoi · ${o.dati.mese}](${SITO}/osservatorio/olio): come si presentano online ${o.dati.campione.aziende} frantoi italiani in ${o.dati.campione.regioni} regioni, solo numeri aggregati, con metodo e limiti.`
      : `- [Osservatorio](${SITO}/osservatorio): letture pubbliche con numeri aggregati, settore per settore.`,
    `- [Mappa gratuita per frantoi](${SITO}/produttori/olio): scrivi il nome del frantoio e vedi cosa trova online chi ti cerca.`,
    `- [Check](${SITO}/check): l'analisi completa con le mosse in ordine e il ritorno calcolato.`,
    "",
    "## Profili",
    "- LinkedIn: https://www.linkedin.com/in/ivano-sciretta",
    "- Credly: https://www.credly.com/users/ivano-sciretta/badges",
    "",
  ];
  return new Response(righe.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
