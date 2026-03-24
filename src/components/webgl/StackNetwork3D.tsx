"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Line, Sphere, Icosahedron, Ring } from "@react-three/drei";
import * as THREE from "three";

function DataPulse({ start, end, color, speed = 0.5 }: { start: THREE.Vector3, end: THREE.Vector3, color: string, speed?: number }) {
  const pulseRef = useRef<THREE.Mesh>(null);
  const progress = useRef(Math.random());

  useFrame((state, delta) => {
    progress.current += delta * speed;
    if (progress.current > 1) progress.current = 0;
    
    if (pulseRef.current) {
      // Add a slight arc/bezier to the pulse for organic feel
      const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      midPoint.y += 2; // arc upward
      midPoint.z += 1; // arc outward
      
      const p = progress.current;
      const point = new THREE.Vector3();
      point.x = Math.pow(1 - p, 2) * start.x + 2 * (1 - p) * p * midPoint.x + Math.pow(p, 2) * end.x;
      point.y = Math.pow(1 - p, 2) * start.y + 2 * (1 - p) * p * midPoint.y + Math.pow(p, 2) * end.y;
      point.z = Math.pow(1 - p, 2) * start.z + 2 * (1 - p) * p * midPoint.z + Math.pow(p, 2) * end.z;
      
      pulseRef.current.position.copy(point);
    }
  });

  return (
    <Sphere ref={pulseRef} args={[0.08, 16, 16]}>
      <meshBasicMaterial color={color} toneMapped={false} />
    </Sphere>
  );
}

function CurvedLine({ start, end, color }: { start: THREE.Vector3, end: THREE.Vector3, color: string }) {
  const points = useMemo(() => {
    const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    midPoint.y += 2;
    midPoint.z += 1;
    const curve = new THREE.QuadraticBezierCurve3(start, midPoint, end);
    return curve.getPoints(20);
  }, [start, end]);

  return (
    <Line points={points} color={color} lineWidth={1} transparent opacity={0.2} />
  );
}

export default function StackNetwork3D() {
  const dispatcherRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  
  // Placement of the system
  // The camera orbits the central object
  const groupZ = 0; 
  const groupY = 0;

  const centerNode = useMemo(() => new THREE.Vector3(0, groupY, groupZ), []);
  
  // Node Alpha (Gemini)
  const geminiNode = useMemo(() => new THREE.Vector3(-4, groupY + 3, groupZ - 2), []);
  // Node Beta (Claude)
  const claudeNode = useMemo(() => new THREE.Vector3(4, groupY + 3, groupZ - 2), []);
  // Node Gamma (GPT)
  const gptNode = useMemo(() => new THREE.Vector3(0, groupY + 5, groupZ - 4), []);
  
  // Execution Core (n8n + Supabase)
  const execNode1 = useMemo(() => new THREE.Vector3(-3, groupY - 4, groupZ + 2), []);
  // Output Tier (Next.js)
  const execNode2 = useMemo(() => new THREE.Vector3(3, groupY - 4, groupZ + 2), []);

  useFrame((state, delta) => {
    if (dispatcherRef.current) {
      dispatcherRef.current.rotation.y += delta * 0.5;
      dispatcherRef.current.rotation.x += delta * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.3;
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group>
      {/* Master Dispatcher Core */}
      <Float speed={2} floatIntensity={0.5}>
        <Icosahedron ref={dispatcherRef} args={[1, 1]} position={centerNode}>
          <meshStandardMaterial color="#00DBE9" emissive="#00DBE9" emissiveIntensity={0.5} wireframe />
        </Icosahedron>
        
        {/* Core Energy Sphere */}
        <Sphere args={[0.5, 32, 32]} position={centerNode}>
          <meshBasicMaterial color="#ADC7FF" toneMapped={false} />
        </Sphere>

        {/* Orbiting Ring */}
        <Ring ref={ringRef} args={[1.5, 1.55, 64]} position={centerNode}>
          <meshBasicMaterial color="#00DBE9" transparent opacity={0.5} side={THREE.DoubleSide} />
        </Ring>
      </Float>

      {/* Satellite Nodes */}
      <Float speed={1.5} floatIntensity={1}>
        <Sphere args={[0.3, 16, 16]} position={geminiNode}>
          <meshBasicMaterial color="#00DBE9" toneMapped={false} />
        </Sphere>
        <Sphere args={[0.3, 16, 16]} position={claudeNode}>
          <meshBasicMaterial color="#ADC7FF" toneMapped={false} />
        </Sphere>
        <Sphere args={[0.2, 16, 16]} position={gptNode}>
          <meshBasicMaterial color="#D0BCFF" toneMapped={false} />
        </Sphere>
        <Sphere args={[0.4, 32, 32]} position={execNode1}>
          <meshStandardMaterial color="#00DBE9" emissive="#00DBE9" emissiveIntensity={0.5} wireframe />
        </Sphere>
        <Sphere args={[0.4, 32, 32]} position={execNode2}>
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} wireframe />
        </Sphere>
      </Float>

      {/* Connection Lines */}
      <CurvedLine start={centerNode} end={geminiNode} color="#00DBE9" />
      <CurvedLine start={centerNode} end={claudeNode} color="#ADC7FF" />
      <CurvedLine start={centerNode} end={gptNode} color="#D0BCFF" />
      <CurvedLine start={centerNode} end={execNode1} color="#00DBE9" />
      <CurvedLine start={centerNode} end={execNode2} color="#10b981" />

      {/* Volumetric Data Pulses (Traveling outward) */}
      <DataPulse start={centerNode} end={geminiNode} color="#ffffff" speed={0.8} />
      <DataPulse start={centerNode} end={geminiNode} color="#00DBE9" speed={0.8} />
      
      <DataPulse start={centerNode} end={claudeNode} color="#ffffff" speed={0.6} />
      <DataPulse start={centerNode} end={gptNode} color="#ffffff" speed={0.4} />

      {/* Pulses traveling inward from Execution nodes to indicate I/O sync */}
      <DataPulse start={execNode1} end={centerNode} color="#00DBE9" speed={0.5} />
      <DataPulse start={execNode2} end={centerNode} color="#10b981" speed={0.5} />
    </group>
  );
}
