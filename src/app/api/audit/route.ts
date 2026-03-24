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
            content: `Sei l'Agente Simulatore di Ivano Sciretta, un esperto elitario in automazione AI per aziende. L'utente descrive un problema aziendale. Devi rispondere con un output JSON impeccabile, comprensibile a un imprenditore (niente gergo nerd esagerato, solo i concetti chiave potenti).
Restituisci esattamente questo oggetto JSON:
1. "problema_reale": Spiega con tono autorevole perché il loro processo attuale fa perdere tempo o soldi invisibili (max 2 frasi).
2. "soluzione_ai": Spiega in modo semplice ed elegante cosa fa il sistema AI di Ivano per risolvere il problema (es. "Un Agente Autonomo leggerà le tue email, estrarrà i dati ed eseguirà i calcoli al posto tuo") (max 2 frasi).
3. "impatto_sul_business": Sintetizza brutalmente il vantaggio per l'imprenditore (es. "-80% tempo recuperato, zero stress e zero errori umani") (max 1 riga).
Nessun preambolo Markdown. Formato {"problema_reale":"...","soluzione_ai":"...","impatto_sul_business":"..."}`
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
    let content = data.choices[0].message.content;

    if (content.startsWith("```json")) {
       content = content.replace(/^```json/, "").replace(/```$/, "");
    }

    return NextResponse.json(JSON.parse(content));
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
