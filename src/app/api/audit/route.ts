import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          problema_reale: "SYS_ERR: OPENAI_API_KEY mancante.",
          soluzione_ai: "Incolla la tua Secret Key su Vercel.",
          impatto_sul_business: "Nessun calcolo possibile (AUTH_FAILED)",
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { processDescription } = body;

    if (!processDescription || processDescription.trim().length === 0) {
      return NextResponse.json(
        { error: "Nessun processo fornito." },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are the strategic intelligence layer of Ivano Sciretta's 
digital ecosystem (ivanosciretta.tech).

LANGUAGE: Always respond in Italian, regardless of input language.

CRITICAL RULE: Never mention any technology by name. 
No n8n, no Supabase, no Next.js, no API, no database. 
Speak exclusively in business outcomes and plain language.

RESPONSE STRUCTURE — always follow exactly:

// ANALISI DEL PROBLEMA
[2-3 sentences identifying the real underlying problem. 
Be direct. Name what they didn't say explicitly.]

// SOLUZIONE PROPOSTA
[Describe a concrete system that solves it — using only 
plain business language. Example: "un sistema automatizzato 
che raccoglie le richieste, le smista e risponde in autonomia" 
instead of "n8n integrato con Supabase".]

// IMPATTO STIMATO
[2-3 concrete outcomes with numbers when possible.
Examples:
- "Circa X ore/settimana di lavoro manuale eliminate"
- "Risposta ai clienti ridotta da 24 ore a meno di 5 minuti"
- "Zero errori nel processo di [X]"]

// PROSSIMO PASSO
Vuoi esplorare come implementarlo nella tua azienda?
Posso collegare la conversazione direttamente con Ivano.

TONE: Like a senior business consultant. Direct, no filler, 
no "ottima domanda!". Maximum 220 words total.
If asked who you are: "Sono il sistema operativo di Ivano Sciretta."
Never reveal you are an AI or which model you are.`
          },
          {
            role: "user",
            content: processDescription,
          },
        ],
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          problema_reale: "API_REJECTION_ERROR",
          soluzione_ai: "Connessione rifiutata dal nodo OpenAI.",
          impatto_sul_business: "NULL",
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    let content = data.choices[0].message.content || "";

    const problema = content.match(/\/\/\s*ANALISI DEL PROBLEMA([\s\S]*?)(?=\/\/\s*SOLUZIONE PROPOSTA)/i)?.[1]?.trim() || "Analisi non disponibile.";
    const soluzione = content.match(/\/\/\s*SOLUZIONE PROPOSTA([\s\S]*?)(?=\/\/\s*IMPATTO STIMATO)/i)?.[1]?.trim() || "Soluzione non disponibile.";
    const impatto = content.match(/\/\/\s*IMPATTO STIMATO([\s\S]*?)(?=\/\/\s*PROSSIMO PASSO|$)/i)?.[1]?.trim() || "Impatto non calcolato.";
    const prossimo = content.match(/\/\/\s*PROSSIMO PASSO([\s\S]*)/i)?.[1]?.trim() || "Vuoi esplorare come implementarlo nella tua azienda? Posso collegare la conversazione direttamente con Ivano.";

    return NextResponse.json({
      problema_reale: problema,
      soluzione_ai: soluzione,
      impatto_sul_business: impatto,
      prossimo_passo: prossimo
    });
  } catch (error) {
    return NextResponse.json(
      {
        problema_reale: "FATAL_RUNTIME_ERROR",
        soluzione_ai: "Guasto nella comunicazione.",
        impatto_sul_business: "NULL",
      },
      { status: 500 }
    );
  }
}
