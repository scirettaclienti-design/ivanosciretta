"use client";
// Passo 1 della nuova home: SOLO apertura + scena della mappa, in più direzioni di stile da confrontare.
// Bozza privata (noindex): la vecchia home resta com'è finché Ivano non scrive «pubblica pagine».
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Parole } from "./Parole";
import { fraunces, instrument } from "./font";
import { DIREZIONI, PASSI, TEMI, TITOLI, type Tema } from "./temi";

const SceneHero = dynamic(() => import("./Scene").then((m) => m.SceneHero), { ssr: false });
const SceneMappa = dynamic(() => import("./Scene").then((m) => m.SceneMappa), { ssr: false });

const VOCI: [string, string][] = [
  ["Soluzioni", "/soluzioni"],
  ["Metodo", "/metodo"],
  ["Lavori", "/lavori"],
  ["Osservatorio", "/osservatorio"],
  ["Chi sono", "/chi-sono"],
];

function webglOk() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** true quando l'elemento è (quasi) a schermo: le scene 3D si fermano fuori vista. */
function useVisibile<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [vivo, setVivo] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => setVivo(e.isIntersecting), { rootMargin: "120px" });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return [ref, vivo] as const;
}

export function Direzione({ slug, variante }: { slug: Tema["slug"]; variante: "a" | "b" }) {
  const t = TEMI[slug];
  const T = TITOLI[variante];
  const serif = fraunces.style.fontFamily;
  const sans = instrument.style.fontFamily;
  const [gl, setGl] = useState(false);
  const [fermo, setFermo] = useState(false);
  const [pronto, setPronto] = useState(false);
  const [menu, setMenu] = useState(false);
  const [passo, setPasso] = useState(0);
  const mouse = useRef({ x: 0, y: 0 });
  const prog = useRef(0);
  const [heroRef, heroVivo] = useVisibile<HTMLDivElement>();
  const mapRef = useRef<HTMLElement>(null);
  const [mapVivo, setMapVivo] = useState(false);

  useEffect(() => {
    // le scene si montano a pagina disegnata: il titolo si legge subito
    const id = window.setTimeout(() => {
      setGl(webglOk());
      setFermo(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      setPronto(true);
    }, 350);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    let raf = 0;
    const calcola = () => {
      const r = el.getBoundingClientRect();
      const tot = r.height - window.innerHeight;
      const p = fermo ? 1 : tot > 0 ? Math.min(1, Math.max(0, -r.top / tot)) : 1;
      prog.current = p;
      const n = p < 0.34 ? 0 : p < 0.67 ? 1 : 2;
      setPasso((v) => (v === n ? v : n));
      setMapVivo(r.top < window.innerHeight * 1.2 && r.bottom > -window.innerHeight * 0.2);
    };
    const su = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(calcola);
    };
    calcola();
    window.addEventListener("scroll", su, { passive: true });
    window.addEventListener("resize", su);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", su);
      window.removeEventListener("resize", su);
    };
  }, [fermo]);

  const cta = { background: t.bottoneBg, color: t.bottoneInk };
  const serifStile = { fontFamily: `var(--font-fraunces), ${serif}, Georgia, serif` };
  const centrato = t.layout === "centrato";

  return (
    <div className={`${fraunces.variable} ${instrument.variable} relative min-h-screen`} style={{ background: t.bg, color: t.ink, fontFamily: `var(--font-instrument), ${sans}, system-ui, sans-serif` }}>
      <style>{`
        html,body{background:${t.bg} !important}
        ::selection{background:${t.accento};color:${t.scuro ? "#17120E" : "#fff"}}
        .n-link{position:relative}
        .n-link:after{content:"";position:absolute;left:0;right:0;bottom:-3px;height:1px;background:currentColor;transform:scaleX(0);transform-origin:left;transition:transform .35s ease}
        .n-link:hover:after,.n-link:focus-visible:after{transform:scaleX(1)}
        .n-sott{background-image:linear-gradient(${t.accento},${t.accento});background-repeat:no-repeat;background-position:0 94%;background-size:0 3px;animation:n-sott 1s .9s cubic-bezier(.2,.8,.2,1) forwards}
        @keyframes n-sott{to{background-size:100% 3px}}
        .n-cta{transition:transform .25s ease,box-shadow .25s ease}
        .n-cta:hover{transform:translateY(-2px);box-shadow:0 10px 26px -10px ${t.scuro ? "#000" : "rgba(60,30,10,.55)"}}
        .n-foc:focus-visible{outline:3px solid ${t.accento};outline-offset:3px}
        @media (prefers-reduced-motion:reduce){.n-sott{animation:none;background-size:100% 3px}.n-cta,.n-link:after{transition:none}}
      `}</style>

      <a href="#contenuto" className="n-foc sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:px-3 focus:py-2" style={cta}>
        Vai al contenuto
      </a>

      {/* barra della bozza: serve a Ivano per confrontare direzioni e titoli */}
      <div className="relative z-40 flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2 text-xs" style={{ background: t.scuro ? "#000" : "#1C1A16", color: "#F3EEE4" }}>
        <strong>Bozza · non pubblicata</strong>
        <span aria-hidden="true">|</span>
        {DIREZIONI.map((d) => (
          <Link key={d} href={`/nuova/${d}?t=${variante}`} className={`underline-offset-4 ${d === slug ? "font-semibold underline" : "opacity-80 hover:underline"}`} aria-current={d === slug ? "page" : undefined}>
            {TEMI[d].nome}
          </Link>
        ))}
        <span aria-hidden="true">|</span>
        {(["a", "b"] as const).map((v) => (
          <Link key={v} href={`/nuova/${slug}?t=${v}`} className={`underline-offset-4 ${v === variante ? "font-semibold underline" : "opacity-80 hover:underline"}`} aria-current={v === variante ? "page" : undefined}>
            Titolo {v.toUpperCase()}
          </Link>
        ))}
      </div>

      <header className="relative z-30 mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 md:px-10 md:py-6">
        <Link href="/" className="n-foc text-[15px] font-semibold tracking-tight md:text-lg" style={serifStile}>
          Ivano Sciretta
        </Link>
        <nav aria-label="Principale" className="hidden items-center gap-7 text-[15px] md:flex">
          {VOCI.map(([n, h]) => (
            <Link key={h} href={h} className="n-link n-foc">
              {n}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/scatole" className="n-cta n-foc rounded-full px-3.5 py-2 text-[13px] font-semibold md:px-5 md:text-[15px]" style={cta}>
            Richiedi la mappa
          </Link>
          <button type="button" className="n-foc rounded-full border px-3 py-2 text-[13px] font-medium md:hidden" style={{ borderColor: t.linea }} aria-expanded={menu} aria-controls="menu-mobile" onClick={() => setMenu((m) => !m)}>
            {menu ? "Chiudi" : "Menu"}
          </button>
        </div>
      </header>
      {menu && (
        <nav id="menu-mobile" aria-label="Principale" className="relative z-30 mx-5 -mt-1 mb-2 rounded-2xl border p-2 md:hidden" style={{ background: t.carta, color: "#1C1A16", borderColor: t.linea }}>
          {VOCI.map(([n, h]) => (
            <Link key={h} href={h} className="n-foc block rounded-xl px-4 py-3 text-[17px]" onClick={() => setMenu(false)}>
              {n}
            </Link>
          ))}
        </nav>
      )}

      <main id="contenuto">
        {/* ——— Apertura ——— */}
        <section ref={heroRef as never} className="relative" onPointerMove={(e) => (mouse.current = { x: (e.clientX / window.innerWidth - 0.5) * 2, y: -(e.clientY / window.innerHeight - 0.5) * 2 })}>
          <div className={`mx-auto max-w-7xl px-5 md:px-10 ${centrato ? "pt-6 text-center md:pt-12" : "grid items-center gap-2 pt-4 md:min-h-[82svh] md:grid-cols-[1.08fr_.92fr] md:pt-0"}`}>
            <div className={centrato ? "mx-auto max-w-4xl" : ""}>
              <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.18em] md:text-[13px]" style={{ color: t.accentoTesto }}>
                Per frantoi, botteghe ed empori
              </p>
              <Parole testo={T.h1} className={`font-medium leading-[1.04] tracking-[-0.015em] ${centrato ? "text-[clamp(2.2rem,6.6vw,5rem)]" : "text-[clamp(2.15rem,5.6vw,4.4rem)]"}`} style={serifStile} />
              <p className={`mt-6 text-[18px] leading-relaxed md:text-[21px] ${centrato ? "mx-auto max-w-2xl" : "max-w-xl"}`} style={{ color: t.mute }}>
                <span className="n-sott">{T.sotto.split(" per ")[0]}</span>
                {T.sotto.includes(" per ") ? ` per ${T.sotto.split(" per ").slice(1).join(" per ")}` : ""}
              </p>
              <div className={`mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 ${centrato ? "justify-center" : ""}`}>
                <Link href="/scatole" className="n-cta n-foc rounded-full px-7 py-4 text-[17px] font-semibold" style={cta}>
                  Richiedi la mappa
                </Link>
                <a href="#mappa" className="n-link n-foc text-[16px] font-medium">
                  Come funziona ↓
                </a>
              </div>
              <p className="mt-4 text-[14px]" style={{ color: t.mute }}>
                Gratis, 10 secondi, senza registrazione.
              </p>
            </div>
            {!centrato && (
              <div className="relative -mx-5 h-[46svh] md:mx-0 md:h-[76svh]">{pronto && gl && <SceneHero tema={t} serif={serif} mouse={mouse} fermo={fermo} vivo={heroVivo} />}</div>
            )}
          </div>
          {centrato && <div className="relative mx-auto -mt-2 h-[56svh] max-w-6xl md:h-[62svh]">{pronto && gl && <SceneHero tema={t} serif={serif} mouse={mouse} fermo={fermo} vivo={heroVivo} />}</div>}
        </section>

        {/* ——— La mappa che si compone allo scroll ——— */}
        <section id="mappa" ref={mapRef} className="relative" style={{ height: fermo ? "100svh" : "340svh" }} aria-labelledby="mappa-t">
          <div className="sticky top-0 h-[100svh] overflow-hidden">
            <div className="absolute inset-0">{pronto && gl && <SceneMappa tema={t} serif={serif} sans={sans} prog={prog} fermo={fermo} vivo={mapVivo} />}</div>
            <div className="absolute inset-x-4 bottom-5 rounded-2xl border p-5 backdrop-blur-md md:inset-x-auto md:bottom-auto md:left-10 md:top-1/2 md:max-w-sm md:-translate-y-1/2 md:p-7" style={{ background: `color-mix(in srgb, ${t.bg} 88%, transparent)`, borderColor: t.linea }}>
              <h2 id="mappa-t" className="text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: t.accentoTesto }}>
                La mappa, in tre passi
              </h2>
              <ol className="mt-4 space-y-3">
                {PASSI.map((p, i) => {
                  const attivo = fermo || i === passo;
                  return (
                    <li key={p.n} aria-current={i === passo ? "step" : undefined} className="flex gap-3 transition-opacity duration-500" style={{ opacity: attivo ? 1 : 0.42 }}>
                      <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full text-[14px] font-bold" style={{ background: attivo ? t.bottoneBg : "transparent", color: attivo ? t.bottoneInk : t.ink, border: `1.5px solid ${attivo ? t.bottoneBg : t.linea}` }}>
                        {p.n}
                      </span>
                      <span>
                        <span className="block text-[19px] font-medium leading-snug md:text-[22px]" style={serifStile}>
                          {p.titolo}
                        </span>
                        {(attivo || fermo) && <span className="mt-0.5 block text-[15px] leading-snug" style={{ color: t.mute }}>{p.testo}</span>}
                      </span>
                    </li>
                  );
                })}
              </ol>
              <p className="mt-4 text-[13px]" style={{ color: t.mute }}>
                Caso dimostrativo: azienda e dati inventati.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 py-20 text-center md:py-28">
          <p className="text-[15px]" style={{ color: t.mute }}>
            Fine del passo 1: apertura e scena della mappa. Il resto della pagina si costruisce dopo la scelta della direzione.
          </p>
          <Link href="/scatole" className="n-cta n-foc mt-6 inline-block rounded-full px-7 py-4 text-[17px] font-semibold" style={cta}>
            Richiedi la mappa
          </Link>
        </section>
      </main>
    </div>
  );
}
