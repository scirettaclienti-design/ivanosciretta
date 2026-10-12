"use client";
// /soluzioni come esperienza: un riquadro per settore che si apre su tre strati (il mercato, la struttura, le soluzioni).
// Tutto il testo è nell'HTML (i pannelli chiusi sono solo nascosti) e le stesse cose stanno nelle pagine di settore.
// Animazioni sobrie (sfumatura e barre che crescono), spente per chi chiede meno movimento. Stile «Sera»: scuro, come il Check.
import Link from "next/link";
import { useId, useState } from "react";
import type { Strato } from "@/data/settori";

export type RiquadroSettore = { slug: string; nome: string; promessa: string; colore: string; chiaro: string; arrivo: boolean; strati: [Strato, Strato, Strato] | null; href: string };

function PannelloStrato({ s, aperto, chiaro }: { s: Strato; aperto: boolean; chiaro: string }) {
  return (
    <div className="space-y-4">
      <p className="text-lg leading-relaxed text-foreground/90">{s.riga}</p>
      {s.numeri && (
        <ul className="space-y-3">
          {s.numeri.map((n) => (
            <li key={n.id}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="text-foreground/90">{n.etichetta}</span>
                <span className="shrink-0 font-display text-lg font-semibold tabular-nums text-white">{n.testo}</span>
              </div>
              <div className="mt-1 h-2.5 rounded-full bg-white/10" aria-hidden="true">
                <div className="h-2.5 rounded-full transition-[width] duration-700 ease-out motion-reduce:transition-none" style={{ width: aperto ? `${Math.max(2, n.valore)}%` : "0%", background: chiaro }} />
              </div>
            </li>
          ))}
        </ul>
      )}
      {s.punti && (
        <ul className="space-y-2 text-foreground/90">
          {s.punti.map((p) => (
            <li key={p} className="flex gap-3"><span aria-hidden="true" style={{ color: chiaro }}>▸</span><span>{p}</span></li>
          ))}
        </ul>
      )}
      {s.mosse && (
        <ol className="space-y-3">
          {s.mosse.map((m, i) => (
            <li key={m.nome} className="rounded-lg border border-white/10 bg-surface-base p-3">
              <p className="font-semibold text-white"><span className="mr-2 tabular-nums" style={{ color: chiaro }}>{i + 1}</span>{m.nome}</p>
              <p className="mt-1 text-sm text-foreground/80">{m.riga}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function Riquadro({ r, apertoInizio }: { r: RiquadroSettore; apertoInizio: boolean }) {
  const id = useId();
  const [aperto, setAperto] = useState(apertoInizio);
  const [strato, setStrato] = useState(0);
  if (r.arrivo || !r.strati) {
    return (
      <article className="rounded-lg border border-dashed border-white/20 bg-surface-base p-5 opacity-90">
        <h2 className="font-display text-2xl font-semibold text-white">{r.nome}</h2>
        <p className="mt-2 inline-block rounded border border-white/30 px-2 py-0.5 text-sm font-semibold uppercase tracking-wider text-foreground/80">In arrivo</p>
      </article>
    );
  }
  const nomi = r.strati.map((x) => x.titolo);
  return (
    <article className="overflow-hidden rounded-lg border border-white/10 bg-surface-base" style={{ borderTop: `4px solid ${r.colore}` }}>
      <div className="p-5">
        <h2 className="font-display text-2xl font-semibold text-white">{r.nome}</h2>
        <p className="mt-2 text-foreground/85">{r.promessa}</p>
        <button
          type="button"
          aria-expanded={aperto}
          aria-controls={`${id}-pannelli`}
          onClick={() => setAperto((x) => !x)}
          className="mt-4 inline-flex min-h-12 items-center rounded-lg px-5 font-semibold text-white"
          style={{ background: r.colore }}
        >
          {aperto ? "Chiudi" : "Apri i tre strati"}
        </button>
      </div>
      <div id={`${id}-pannelli`} hidden={!aperto} className="border-t border-white/10 bg-surface-low p-5">
        <div role="tablist" aria-label={`Gli strati di ${r.nome}`} className="flex flex-wrap gap-2">
          {nomi.map((n, i) => (
            <button
              key={n}
              type="button"
              role="tab"
              id={`${id}-t${i}`}
              aria-selected={strato === i}
              aria-controls={`${id}-p${i}`}
              onClick={() => setStrato(i)}
              className={`min-h-11 rounded-lg border px-4 text-sm font-semibold ${strato === i ? "text-black" : "border-white/25 text-white"}`}
              style={strato === i ? { background: r.chiaro, borderColor: r.chiaro } : undefined}
            >
              {i + 1}. {n}
            </button>
          ))}
        </div>
        {r.strati.map((s, i) => (
          <div key={s.titolo} role="tabpanel" id={`${id}-p${i}`} aria-labelledby={`${id}-t${i}`} hidden={strato !== i} className="mt-5 animate-[sfuma_.45s_ease-out] motion-reduce:animate-none">
            <PannelloStrato s={s} aperto={aperto && strato === i} chiaro={r.chiaro} />
          </div>
        ))}
        <p className="mt-6"><Link href={r.href} className="font-semibold underline underline-offset-4" style={{ color: r.chiaro }}>Tutta la pagina: {r.nome.toLowerCase()} →</Link></p>
      </div>
    </article>
  );
}

export function Esperienza({ riquadri }: { riquadri: RiquadroSettore[] }) {
  return (
    <div className="mt-8 space-y-5">
      <style>{`@keyframes sfuma{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`}</style>
      {riquadri.map((r, i) => (
        <Riquadro key={r.slug} r={r} apertoInizio={i === 0 && !r.arrivo} />
      ))}
    </div>
  );
}
