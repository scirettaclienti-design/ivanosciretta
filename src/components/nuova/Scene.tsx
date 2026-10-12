"use client";
// Le due scene 3D: la natura morta dell'apertura (bottiglia e scatola regalo) e la mappa che si compone allo scroll.
// Luce da studio tutta procedurale (Lightformer): nessun file da scaricare.
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { useEffect, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { Bottiglia, Foglio, Scatola, textureDa } from "./oggetti";
import type { Tema } from "./temi";

const sm = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function Studio({ tema, ombraFissa = false }: { tema: Tema; ombraFissa?: boolean }) {
  const s = tema.scena;
  return (
    <>
      <Environment resolution={128} environmentIntensity={s.env}>
        <Lightformer form="rect" intensity={5} color={s.luce} position={[-4, 4, 4]} scale={[5, 4, 1]} />
        <Lightformer form="rect" intensity={2} color={s.luceFill} position={[5, 2, 3]} scale={[3, 4, 1]} />
        <Lightformer form="rect" intensity={1.4} color="#ffffff" position={[0, 5, -2]} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={0.8} color="#ffffff" position={[0, -3, 3]} scale={[8, 1, 1]} />
      </Environment>
      <directionalLight position={[-3, 6, 4]} intensity={1.1} color={s.luce} />
      <ContactShadows position={[0, 0.001, 0]} opacity={Math.min(0.9, s.ombra * 1.5)} scale={12} blur={2.1} far={4.5} resolution={256} frames={ombraFissa ? 2 : Infinity} color="#2a1a0e" />
    </>
  );
}

/* ———— Apertura: bottiglia e scatola regalo ———— */
function Natura({ tema, serif, mouse, fermo }: { tema: Tema; serif: string; mouse: MutableRefObject<{ x: number; y: number }>; fermo: boolean }) {
  const bott = useRef<THREE.Group>(null);
  const scat = useRef<THREE.Group>(null);
  const { size } = useThree();
  const ritratto = size.width / size.height < 0.95;
  useFrame((st, dt) => {
    const t = st.clock.elapsedTime;
    const k = Math.min(1, dt * 2.2);
    const mx = fermo ? 0 : mouse.current.x;
    const my = fermo ? 0 : mouse.current.y;
    st.camera.position.x += (mx * 0.9 - st.camera.position.x) * k;
    st.camera.position.y += ((ritratto ? 1.35 : 1.6) + my * 0.35 - st.camera.position.y) * k;
    st.camera.position.z = ritratto ? 7.2 : 6.6;
    st.camera.lookAt(0, ritratto ? 0.85 : 1.0, 0);
    if (bott.current) bott.current.rotation.y = -0.4 + (fermo ? 0 : Math.sin(t * 0.45) * 0.3);
    if (scat.current) scat.current.rotation.y = 0.55 + (fermo ? 0 : Math.sin(t * 0.35 + 1) * 0.1);
  });
  return (
    <group position={[ritratto ? 0 : 0.15, 0, 0]}>
      <Bottiglia ref={bott} vetro={tema.scena.vetro} serif={serif} position={[ritratto ? 0.6 : 0.62, 0, 0]} />
      <Scatola ref={scat} colore={tema.scena.scatola} nastro={tema.scena.nastro} position={[ritratto ? -0.85 : -1.15, 0, 0.75]} scale={ritratto ? 0.72 : 0.8} />
    </group>
  );
}

export function SceneHero({ tema, serif, mouse, fermo, vivo }: { tema: Tema; serif: string; mouse: MutableRefObject<{ x: number; y: number }>; fermo: boolean; vivo: boolean }) {
  return (
    <Canvas dpr={[1, 1.4]} camera={{ position: [0, 1.6, 6.6], fov: 30 }} gl={{ alpha: true, antialias: true }} frameloop={vivo ? "always" : "never"} style={{ pointerEvents: "none" }} aria-hidden="true">
      <Studio tema={tema} ombraFissa />
      <Natura tema={tema} serif={serif} mouse={mouse} fermo={fermo} />
    </Canvas>
  );
}

/* ———— La mappa che si compone ———— */
function disegnaFogli(serif: string, sans: string, accento: string) {
  const ink = "#1c1a16";
  const grigio = "#5b564b";
  const base = (c: CanvasRenderingContext2D, titolo: string) => {
    c.fillStyle = ink;
    c.textAlign = "left";
    c.font = `600 84px ${serif}, Georgia, serif`;
    c.fillText(titolo, 72, 160);
    c.fillStyle = accento;
    c.fillRect(72, 196, 130, 7);
  };
  const piede = (c: CanvasRenderingContext2D, w: number, h: number) => {
    c.strokeStyle = "#b05a2f";
    c.lineWidth = 3;
    c.beginPath();
    c.roundRect(72, h - 128, w - 144, 64, 32);
    c.stroke();
    c.fillStyle = "#8a3b1c";
    c.textAlign = "center";
    c.font = `600 28px ${sans}, Arial, sans-serif`;
    c.fillText("CASO DIMOSTRATIVO · DATI INVENTATI", w / 2, h - 86);
  };
  const riga = (c: CanvasRenderingContext2D, y: number, titolo: string, sotto: string) => {
    c.fillStyle = accento;
    c.beginPath();
    c.arc(100, y - 14, 14, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = ink;
    c.textAlign = "left";
    c.font = `600 56px ${sans}, Arial, sans-serif`;
    c.fillText(titolo, 142, y);
    c.fillStyle = grigio;
    c.font = `400 42px ${sans}, Arial, sans-serif`;
    c.fillText(sotto, 142, y + 62);
  };
  const f1 = textureDa(1024, 1400, (c, w, h) => {
    base(c, "Cosa vedo di te");
    riga(c, 380, "Il sito", "pagina per pagina");
    riga(c, 620, "La scheda Google", "voto, orari, foto");
    riga(c, 860, "Le recensioni", "cosa scrivono i clienti");
    riga(c, 1100, "Chi vi nomina", "anche gli assistenti AI");
    piede(c, w, h);
  });
  const f2 = textureDa(1024, 1400, (c, w, h) => {
    base(c, "Cosa c'è, cosa manca");
    c.fillStyle = grigio;
    c.font = `600 30px ${sans}, Arial, sans-serif`;
    c.textAlign = "left";
    c.fillText("C'È", 72, 290);
    const ok = (y: number, t: string) => {
      c.strokeStyle = "#3f6b3a";
      c.lineWidth = 9;
      c.lineCap = "round";
      c.beginPath();
      c.moveTo(78, y - 18);
      c.lineTo(98, y + 2);
      c.lineTo(130, y - 34);
      c.stroke();
      c.fillStyle = ink;
      c.font = `500 48px ${sans}, Arial, sans-serif`;
      c.fillText(t, 160, y);
    };
    ok(380, "La scheda Google è curata");
    ok(490, "Il sito si apre da telefono");
    c.fillStyle = grigio;
    c.font = `600 30px ${sans}, Arial, sans-serif`;
    c.fillText("MANCA", 72, 690);
    const no = (y: number, t: string) => {
      c.fillStyle = "#b05a2f";
      c.beginPath();
      c.moveTo(104, y - 40);
      c.lineTo(132, y);
      c.lineTo(76, y);
      c.closePath();
      c.fill();
      c.fillStyle = ink;
      c.font = `500 48px ${sans}, Arial, sans-serif`;
      c.fillText(t, 160, y);
    };
    no(780, "Una pagina per chi compra");
    no(890, "I prezzi per formato");
    no(1000, "L'annata dell'olio");
    c.fillStyle = grigio;
    c.font = `400 38px ${sans}, Arial, sans-serif`;
    c.fillText("Ogni mancanza ha la sua prova.", 72, 1150);
    piede(c, w, h);
  });
  const f3 = textureDa(1024, 1400, (c, w, h) => {
    base(c, "Le mosse, in ordine");
    const mossa = (n: number, y: number, t: string) => {
      c.fillStyle = accento;
      c.beginPath();
      c.arc(112, y - 14, 38, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = "#fff8ef";
      c.textAlign = "center";
      c.font = `700 44px ${sans}, Arial, sans-serif`;
      c.fillText(String(n), 112, y);
      c.fillStyle = ink;
      c.textAlign = "left";
      c.font = `600 50px ${sans}, Arial, sans-serif`;
      c.fillText(t, 176, y);
    };
    mossa(1, 380, "La pagina del vostro olio");
    mossa(2, 600, "La scrivania per i buyer");
    mossa(3, 820, "Il preventivo in un minuto");
    c.fillStyle = grigio;
    c.textAlign = "left";
    c.font = `400 42px ${sans}, Arial, sans-serif`;
    c.fillText("Una alla volta. Le scegliete voi.", 72, 1040);
    piede(c, w, h);
  });
  return [f1, f2, f3];
}

function Mappa({ tema, serif, sans, prog, fermo }: { tema: Tema; serif: string; sans: string; prog: MutableRefObject<number>; fermo: boolean }) {
  const [tex, setTex] = useState<THREE.Texture[] | null>(null);
  const gruppo = useRef<THREE.Group>(null);
  const fogli = useRef<(THREE.Group | null)[]>([]);
  const bott = useRef<THREE.Group>(null);
  const scat = useRef<THREE.Group>(null);
  const { size } = useThree();
  const ritratto = size.width / size.height < 0.95;
  useEffect(() => {
    let vivo = true;
    const accento = tema.scuro ? "#8a3b1c" : tema.accentoTesto;
    Promise.all([document.fonts.load(`600 40px ${serif}`), document.fonts.load(`400 30px ${sans}`), document.fonts.load(`600 30px ${sans}`)])
      .catch(() => {})
      .finally(() => {
        if (vivo) setTex(disegnaFogli(serif, sans, accento));
      });
    return () => {
      vivo = false;
    };
  }, [serif, sans, tema]);
  useFrame((st) => {
    const p = fermo ? 1 : prog.current;
    const fan = sm(0.66, 0.97, p);
    // su telefono la scena sta nella metà alta (il cartellino è sotto); su schermo largo si sposta a destra (il cartellino è a sinistra)
    st.camera.position.x = (ritratto ? 0 : -0.9) + Math.sin(p * 1.4) * 0.7;
    st.camera.position.y = ritratto ? 1.0 : 1.7;
    st.camera.position.z = ritratto ? 10.8 : 7.6;
    st.camera.lookAt(ritratto ? 0 : -0.9, ritratto ? 0.5 : 1.35, 0);
    if (gruppo.current) {
      gruppo.current.rotation.y = lerp(0, -0.32, fan);
      gruppo.current.scale.setScalar(ritratto ? 0.86 : 1);
    }
    [0, 1, 2].forEach((i) => {
      const g = fogli.current[i];
      if (!g) return;
      const e = sm(i * 0.2, i * 0.2 + 0.3, p);
      const lato = i === 1 ? -1 : 1;
      const z = (i - 1) * lerp(0.07, 0.8, fan);
      const x = (i - 1) * lerp(0, ritratto ? 0.62 : 1.25, fan);
      g.position.set(lerp(lato * 4.6, x, e), lerp(0.55, 1.45, e), lerp(1.4, z, e));
      g.rotation.set(0, lerp(-lato * 1.1, 0, e), lerp(lato * 0.28, 0, e));
      g.visible = e > 0.001;
    });
    const o = sm(0, 0.14, p);
    if (bott.current) bott.current.scale.setScalar(Math.max(0.0001, o * (ritratto ? 0.0001 : 0.62)));
    if (scat.current) scat.current.scale.setScalar(Math.max(0.0001, o * (ritratto ? 0.0001 : 0.5)));
  });
  return (
    <>
      <Bottiglia ref={bott} vetro={tema.scena.vetro} serif={serif} position={[-1.85, 0, 1.1]} rotation={[0, -0.45, 0]} />
      <Scatola ref={scat} colore={tema.scena.scatola} nastro={tema.scena.nastro} position={[2.8, 0, 0.4]} rotation={[0, -0.5, 0]} />
      <group ref={gruppo}>
        {[0, 1, 2].map((i) => (
          <Foglio key={i} ref={(g: THREE.Group | null) => { fogli.current[i] = g; }} texture={tex ? tex[i] : null} carta={tema.carta} />
        ))}
      </group>
    </>
  );
}

export function SceneMappa({ tema, serif, sans, prog, fermo, vivo }: { tema: Tema; serif: string; sans: string; prog: MutableRefObject<number>; fermo: boolean; vivo: boolean }) {
  return (
    <Canvas dpr={[1, 1.4]} camera={{ position: [0, 1.7, 7.6], fov: 32 }} gl={{ alpha: true, antialias: true }} frameloop={vivo ? "always" : "never"} style={{ pointerEvents: "none" }} aria-hidden="true">
      <Studio tema={tema} />
      <Mappa tema={tema} serif={serif} sans={sans} prog={prog} fermo={fermo} />
    </Canvas>
  );
}
