"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Octahedron, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function ProjectNodes() {
  const aiSpaceRef = useRef<THREE.Mesh>(null);
  const dovevaiRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (aiSpaceRef.current) {
      aiSpaceRef.current.rotation.x = t * 0.2;
      aiSpaceRef.current.rotation.y = t * 0.3;
    }
    if (dovevaiRef.current) {
      dovevaiRef.current.rotation.x = -t * 0.1;
      dovevaiRef.current.rotation.z = t * 0.2;
    }
  });

  return (
    <group position={[0, -10, 5]}>
      {/* AI-SPACE Node */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={[-3, 2, 0]}>
          <Icosahedron ref={aiSpaceRef} args={[1.5, 0]}>
            <MeshTransmissionMaterial 
              backside
              thickness={0.5}
              roughness={0.1}
              color="#00DBE9"
              chromaticAberration={0.06}
            />
          </Icosahedron>
          {/* Inner core */}
          <mesh>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshBasicMaterial color="#00DBE9" />
          </mesh>
        </group>
      </Float>

      {/* DOVEVAI Node */}
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
        <group position={[3, -1, 2]}>
          <Octahedron ref={dovevaiRef} args={[1.8, 0]}>
            <MeshTransmissionMaterial 
              backside
              thickness={0.8}
              roughness={0.2}
              color="#D0BCFF"
              chromaticAberration={0.1}
            />
          </Octahedron>
          {/* Inner core */}
          <mesh>
            <octahedronGeometry args={[0.6, 0]} />
            <meshBasicMaterial color="#D0BCFF" />
          </mesh>
        </group>
      </Float>
      
      {/* Surrounding Energy Field */}
      <pointLight position={[0, 0, 0]} intensity={2} distance={10} color="#ADC7FF" />
    </group>
  );
}
