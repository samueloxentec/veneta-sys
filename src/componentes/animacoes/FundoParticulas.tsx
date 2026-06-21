"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense } from "react";

// Scroll progress compartilhado (sem re-render)
let progressoScroll = 0;

function atualizarScroll() {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressoScroll = total > 0 ? window.scrollY / total : 0;
}

// Extrair posições de geometrias reais do Three.js
function extrairPosicoes(geometria: THREE.BufferGeometry, quantidade: number): Float32Array {
  const posOriginal = geometria.attributes.position.array as Float32Array;
  const totalVertices = posOriginal.length / 3;
  const resultado = new Float32Array(quantidade * 3);
  for (let i = 0; i < quantidade; i++) {
    const indice = Math.floor((i / quantidade) * totalVertices) % totalVertices;
    resultado[i * 3] = posOriginal[indice * 3];
    resultado[i * 3 + 1] = posOriginal[indice * 3 + 1];
    resultado[i * 3 + 2] = posOriginal[indice * 3 + 2];
  }
  geometria.dispose();
  return resultado;
}

// Partículas com morph entre geometrias
function ParticulasMorph() {
  const pontosRef = useRef<THREE.Points>(null!);
  const { viewport } = useThree();
  const QTD = 1500;

  const formas = useMemo(() => [
    extrairPosicoes(new THREE.SphereGeometry(2, 32, 32), QTD),
    extrairPosicoes(new THREE.TorusGeometry(1.8, 0.6, 24, 48), QTD),
    extrairPosicoes(new THREE.BoxGeometry(2.8, 2.8, 2.8, 10, 10, 10), QTD),
    extrairPosicoes(new THREE.TorusKnotGeometry(1.4, 0.45, 100, 16), QTD),
    extrairPosicoes(new THREE.IcosahedronGeometry(2.2, 2), QTD),
    extrairPosicoes(new THREE.TorusGeometry(2, 0.25, 16, 64), QTD),
  ], []);

  const [posicoes, cores] = useMemo(() => {
    const pos = new Float32Array(QTD * 3);
    const cor = new Float32Array(QTD * 3);
    for (let i = 0; i < QTD * 3; i++) pos[i] = formas[0][i];
    for (let i = 0; i < QTD; i++) {
      const t = i / QTD;
      cor[i * 3] = THREE.MathUtils.lerp(0.6, 0.9, t);
      cor[i * 3 + 1] = THREE.MathUtils.lerp(0.45, 0.7, t);
      cor[i * 3 + 2] = THREE.MathUtils.lerp(0.2, 0.4, t);
    }
    return [pos, cor];
  }, [formas]);

  useFrame((state) => {
    if (!pontosRef.current) return;
    const posAttr = pontosRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    const p = progressoScroll;
    const totalFormas = formas.length;
    const segmento = 1 / (totalFormas - 1);
    const indiceFloat = Math.min(p / segmento, totalFormas - 1.001);
    const indiceA = Math.floor(indiceFloat);
    const indiceB = Math.min(indiceA + 1, totalFormas - 1);
    const t = indiceFloat - indiceA;

    const formaA = formas[indiceA];
    const formaB = formas[indiceB];

    for (let i = 0; i < QTD * 3; i++) {
      const alvo = formaA[i] + (formaB[i] - formaA[i]) * t;
      arr[i] += (alvo - arr[i]) * 0.045;
    }
    posAttr.needsUpdate = true;

    pontosRef.current.rotation.y += 0.0012;
    const mx = state.pointer.x * viewport.width * 0.05;
    const my = state.pointer.y * viewport.height * 0.05;
    pontosRef.current.position.x += (mx - pontosRef.current.position.x) * 0.02;
    pontosRef.current.position.y += (my - pontosRef.current.position.y) * 0.02;
  });

  return (
    <points ref={pontosRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[posicoes, 3]} />
        <bufferAttribute attach="attributes-color" args={[cores, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} vertexColors transparent opacity={0.8} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export function FundoParticulas() {
  useEffect(() => {
    window.addEventListener("scroll", atualizarScroll, { passive: true });
    atualizarScroll();
    return () => window.removeEventListener("scroll", atualizarScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0" style={{ background: "#0a0a0a" }}>
      <Canvas camera={{ position: [0, 0, 5.5], fov: 55 }} dpr={[1, 1.5]} gl={{ antialias: false, alpha: true }}>
        <Suspense fallback={null}>
          <ParticulasMorph />
        </Suspense>
      </Canvas>
    </div>
  );
}
