import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          diagnosi: "SYS_ERR: OPENAI_API_KEY non configurata.",
          architettura: "Incolla la tua Secret Key nelle Environment Variables di Vercel.",
          roi: "Nessun calcolo possibile (AUTH_FAILED)",
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

    // OpenAI Fetch Request
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // Veloce ed economico
        messages: [
          {
            role: "system",
            content: `Sei IL MASTER ORCHESTRATOR di Ivano Sciretta, un architetto spietato e ultra-razionale di automazioni aziendali. L'utente ti spiega un processo aziendale noioso o inefficace.
Devi rispondergli restituendo SOLO un oggetto JSON valido con 3 chiavi:
1. "diagnosi": analizza cinicamente il problema evidenziando lo spreco di risorse (max 2 frasi concise).
2. "architettura": proponi uno stack tecnico avanzato (usa termini come n8n, Webhooks, RAG, Supabase, LLMs) per automatizzarlo al 100% (max 2 frasi).
3. "roi": stima l'impatto numerico (es. "-80% tempo sprecato", "+300% velocità") e il beneficio finale (max 1 riga corta).
Ritorna SOLO output JSON, nessun preambolo Markdown. Formato {"diagnosi":"...","architettura":"...","roi":"..."}`
          },
          {
            role: "user",
            content: `PROCESSO DA ANALIZZARE: ${processDescription}`,
          },
        ],
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI Error:", errText);
      return NextResponse.json(
        {
          diagnosi: "API_REJECTION_ERROR",
          architettura: "Il nodo OpenAI ha rifiutato la connessione.",
          roi: "NULL",
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    let content = data.choices[0].message.content;

    // Pulisci eventuale formattazione markdown se l'IA la inserisce
    if (content.startsWith("```json")) {
       content = content.replace(/^```json/, "").replace(/```$/, "");
    }

    const parsedJson = JSON.parse(content);
    return NextResponse.json(parsedJson);
  } catch (error) {
    console.error("Audit API Error:", error);
    return NextResponse.json(
      {
        diagnosi: "FATAL_RUNTIME_ERROR",
        architettura: "Guasto nella comunicazione col modello serverless.",
        roi: "NULL",
      },
      { status: 500 }
    );
  }
}
