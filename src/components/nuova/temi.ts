// Le direzioni di prova per la nuova home. Tutte sono «luce da studio»: niente ciano, stelle, neon o particelle.
export type Tema = {
  slug: "atelier" | "carta" | "notte";
  nome: string;
  descr: string;
  scuro: boolean;
  layout: "split" | "centrato";
  bg: string; // fondo della pagina
  ink: string; // testo
  mute: string; // testo secondario (contrasto ≥ 4,5)
  linea: string;
  carta: string; // carta dei cartellini e dei fogli 3D
  accento: string; // decorazioni e sottolineature
  accentoTesto: string; // accento leggibile come testo
  bottoneBg: string;
  bottoneInk: string;
  scena: { scatola: string; nastro: string; vetro: string; luce: string; luceFill: string; ombra: number; env: number };
};

export const TEMI: Record<Tema["slug"], Tema> = {
  atelier: {
    slug: "atelier",
    nome: "Atelier",
    descr: "Avorio caldo, testo quasi nero, accento terracotta. Titolo e testo in due caratteri, oggetti veri sotto una luce da studio.",
    scuro: false,
    layout: "split",
    bg: "#F3EEE4",
    ink: "#1C1A16",
    mute: "rgba(28,26,22,0.74)",
    linea: "rgba(28,26,22,0.16)",
    carta: "#FBF8F2",
    accento: "#B8582F",
    accentoTesto: "#8A3B1C",
    bottoneBg: "#8A3B1C",
    bottoneInk: "#FFF8EF",
    scena: { scatola: "#9A4F2E", nastro: "#EADFC9", vetro: "#22301A", luce: "#FFF1DC", luceFill: "#DCE6F2", ombra: 0.42, env: 1.0 },
  },
  carta: {
    slug: "carta",
    nome: "Carta e inchiostro",
    descr: "Pietra chiara e inchiostro verde. Tipografia grande al centro, gli oggetti come una natura morta sul tavolo.",
    scuro: false,
    layout: "centrato",
    bg: "#E9E7DF",
    ink: "#1B2517",
    mute: "rgba(27,37,23,0.76)",
    linea: "rgba(27,37,23,0.18)",
    carta: "#F7F5EE",
    accento: "#B07A1E",
    accentoTesto: "#5B6B2F",
    bottoneBg: "#1B2517",
    bottoneInk: "#F2F0E8",
    scena: { scatola: "#3E5535", nastro: "#E7D9B6", vetro: "#2A3A1E", luce: "#FFF4E0", luceFill: "#E4ECE0", ombra: 0.38, env: 1.05 },
  },
  notte: {
    slug: "notte",
    nome: "Notte calda",
    descr: "Espresso scuro e ottone, per chi vuole il tono da galleria. Stessi oggetti, luce di taglio.",
    scuro: true,
    layout: "split",
    bg: "#17120E",
    ink: "#F1E8D8",
    mute: "rgba(241,232,216,0.76)",
    linea: "rgba(241,232,216,0.18)",
    carta: "#EFE6D3",
    accento: "#D2A55E",
    accentoTesto: "#D8AE68",
    bottoneBg: "#D2A55E",
    bottoneInk: "#1A140D",
    scena: { scatola: "#7C3A22", nastro: "#E9D8B0", vetro: "#1E2B16", luce: "#FFE2B8", luceFill: "#6D7A92", ombra: 0.6, env: 0.85 },
  },
};

export const DIREZIONI = Object.keys(TEMI) as Tema["slug"][];

export const TITOLI = {
  a: { h1: "Vi mostro gratis cosa vede un cliente prima di scegliervi.", sotto: "Mappe e Check per frantoi, botteghe ed empori." },
  b: { h1: "Il tuo prossimo concorrente sta usando l'AI per batterti. Da quanto tempo lo sai?", sotto: "Costruisco mappe e Check per frantoi, botteghe ed empori." },
} as const;

export const PASSI = [
  { n: 1, titolo: "Cosa trova chi vi cerca", testo: "Il sito, la scheda Google e le recensioni, letti uno per uno." },
  { n: 2, titolo: "Cosa c'è e cosa manca", testo: "Riga per riga, con la prova di ogni mancanza." },
  { n: 3, titolo: "Le mosse, in ordine", testo: "Una alla volta: le scegliete voi." },
] as const;
