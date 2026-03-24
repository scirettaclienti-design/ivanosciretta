"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense } from "react";
import { EffectComposer, Bloom, ChromaticAberration, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import ScrollRig from "./ScrollRig";
import ArchitectureModules from "./ArchitectureModules";
import ProjectNodes from "./ProjectNodes";
import JourneyTimeline3D from "./JourneyTimeline3D";
import StackNetwork3D from "./StackNetwork3D";
import ParallaxTunnels from "./ParallaxTunnels";

export default function Experience() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#0a0a0a]">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#0a0a0a"]} />
        <fog attach="fog" args={["#0a0a0a", 5, 25]} />
        
        <Suspense fallback={null}>
          <Environment preset="night" />
          
          <ScrollRig />
          <ParallaxTunnels />
          <ArchitectureModules />
          <ProjectNodes />
          <JourneyTimeline3D />
          <StackNetwork3D />

          <EffectComposer multisampling={4}>
            <Bloom 
              luminanceThreshold={0.5} 
              luminanceSmoothing={1} 
              intensity={1.5} 
              mipmapBlur 
            />
            <ChromaticAberration
              offset={new THREE.Vector2(0.002, 0.002)}
              blendFunction={BlendFunction.NORMAL}
            />
            <Noise opacity={0.03} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
