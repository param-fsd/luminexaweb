"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Sparkles,
  OrbitControls,
  MeshDistortMaterial,
  Environment,
  Lightformer,
} from "@react-three/drei";

/* ── liquid chrome core: slowly morphing reflective blob ── */
function LiquidCore() {
  const mesh = useRef();

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.1;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.12;
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.7, 128, 128]} />
      <MeshDistortMaterial
        color="#141414"
        metalness={1}
        roughness={0.12}
        distort={0.42}
        speed={1.6}
      />
    </mesh>
  );
}

/* ── thin tilted ring with a lumen satellite, echoes the brand accent ── */
function OrbitRing({ radius = 2.7, speed = 0.5, tilt = [0, 0, 0], dotSize = 0.06 }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
  });

  return (
    <group rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.005, 8, 96]} />
        <meshBasicMaterial color="#0a0a0a" transparent opacity={0.15} />
      </mesh>
      <group ref={ref}>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[dotSize, 16, 16]} />
          <meshBasicMaterial color="#c8f63c" />
        </mesh>
      </group>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="relative h-[420px] sm:h-[500px] lg:h-[580px] xl:h-[620px] w-full cursor-grab active:cursor-grabbing">
      {/* soft lumen glow behind the scene */}
      <div
        className="absolute left-1/2 top-1/2 -z-10 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lumen/25 blur-3xl"
        aria-hidden
      />

      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 5]} intensity={1.2} />
        <pointLight position={[-4, -2, -3]} intensity={8} color="#c8f63c" />

        {/* local light strips so the chrome has something to reflect — no network HDR */}
        <Environment resolution={256}>
          <Lightformer intensity={4} position={[0, 4, 0]} scale={[10, 1, 1]} rotation={[Math.PI / 2, 0, 0]} />
          <Lightformer intensity={2} position={[-5, 0, 1]} scale={[1, 6, 1]} rotation={[0, Math.PI / 2, 0]} />
          <Lightformer intensity={3} color="#c8f63c" position={[5, -1, 0]} scale={[1, 5, 1]} rotation={[0, -Math.PI / 2, 0]} />
        </Environment>

        <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.7}>
          <LiquidCore />
        </Float>

        <OrbitRing radius={2.65} speed={0.5} tilt={[1.15, 0.25, 0]} />
        <OrbitRing radius={3.05} speed={-0.32} tilt={[1.4, -0.45, 0.3]} dotSize={0.045} />

        {/* drifting lumen particles */}
        <Sparkles count={60} scale={7} size={2} speed={0.3} color="#c8f63c" opacity={0.65} />

        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
      </Canvas>

      {/* tiny hint */}
      <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
        <span className="h-1.5 w-1.5 rounded-full bg-lumen lumen-pulse" />
        Drag to explore
      </div>
    </div>
  );
}
