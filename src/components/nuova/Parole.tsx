// Titolo che si rivela parola per parola, solo con il CSS: parte subito, senza aspettare JavaScript.
// Il testo è sempre nel codice; con «riduci movimento» compare fermo.
import type { CSSProperties } from "react";

export function Parole({ testo, className, style, ritardo = 0.05 }: { testo: string; className?: string; style?: CSSProperties; ritardo?: number }) {
  return (
    <h1 className={className} style={style} aria-label={testo}>
      <style>{`
        .pw{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.14em;margin-bottom:-.14em}
        .pw>span{display:inline-block;animation:pw-su .85s cubic-bezier(.2,.8,.2,1) both}
        @keyframes pw-su{from{transform:translateY(108%);opacity:0}to{transform:none;opacity:1}}
        @media (prefers-reduced-motion:reduce){.pw>span{animation:none}}
      `}</style>
      {testo.split(" ").map((p, i) => (
        <span key={i} aria-hidden="true">
          <span className="pw">
            <span style={{ animationDelay: `${ritardo + i * 0.045}s` }}>{p}</span>
          </span>{" "}
        </span>
      ))}
    </h1>
  );
}
