// Grafici dell'osservatorio: barre in HTML puro (si leggono anche senza JavaScript e da telefono).
type Barra = { etichetta: string; valore: number; testo: string };

export function Barre({ titolo, barre, max, nota }: { titolo: string; barre: Barra[]; max?: number; nota?: string }) {
  const tetto = max ?? Math.max(...barre.map((b) => b.valore), 1);
  return (
    <figure className="mt-6 rounded-lg border border-white/10 bg-surface-base p-4">
      <figcaption className="font-semibold text-white">{titolo}</figcaption>
      <ul className="mt-3 space-y-3">
        {barre.map((b) => (
          <li key={b.etichetta}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="text-foreground/85">{b.etichetta}</span>
              <span className="shrink-0 font-semibold tabular-nums text-white">{b.testo}</span>
            </div>
            <div className="mt-1 h-3 rounded-full bg-white/10" aria-hidden="true">
              <div className="h-3 rounded-full bg-primary-cyan" style={{ width: `${Math.max(2, Math.round((b.valore / tetto) * 100))}%` }} />
            </div>
          </li>
        ))}
      </ul>
      {nota && <p className="mt-3 text-xs text-foreground/60">{nota}</p>}
    </figure>
  );
}
