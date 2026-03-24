"use client";
import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollRig() {
  const { camera } = useThree();
  const progress = useRef({ current: 0 }); 

  // The Master Blueprint Linear Z-Axis Path
  // Synchronized precisely to the 5-Phase DOM scroll
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 15),     // Fase 1: Hero (Intro) - Far back, looking forward
      new THREE.Vector3(0, 0, -2),     // Fase 2: L'Orchestratore - Push straight into the Dispatcher Core [0,0,0]
      new THREE.Vector3(5, -4, -15),   // Fase 3: Competenze - Bank Right towards Architecture Modules
      new THREE.Vector3(-3, -10, -30), // Fase 4: L'Esercito - Bank Left into the technical abyss
      new THREE.Vector3(0, -15, -45),  // Fase 5: Progetti - Dive straight down into the data nodes
      new THREE.Vector3(0, -30, -70),  // Outro: Connect - Deep void
    ], false, "centripetal", 0.5);
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(progress.current, {
        current: 1,
        ease: "none",
        scrollTrigger: {
          id: "mainScroll",
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2, 
        },
      });
    });

    camera.position.copy(curve.getPointAt(0));
    camera.lookAt(curve.getPointAt(0.01));

    return () => ctx.revert();
  }, [camera, curve]);

  useFrame(() => {
    const p = Math.max(0, Math.min(0.999, progress.current.current));
    
    // Lerp position strictly along the curve for true scroll synchronization
    const targetPosition = curve.getPointAt(p);
    camera.position.lerp(targetPosition, 0.08);

    // Look ahead to create natural banking
    const lookAheadPos = curve.getPointAt(Math.min(1, p + 0.05));
    
    const currentQuat = camera.quaternion.clone();
    camera.lookAt(lookAheadPos);
    const targetQuat = camera.quaternion.clone();
    
    camera.quaternion.copy(currentQuat);
    camera.quaternion.slerp(targetQuat, 0.1);
  });

  return null;
}
