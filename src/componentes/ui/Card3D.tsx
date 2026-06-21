"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

interface Card3DProps {
  children: ReactNode;
  className?: string;
}

/**
 * Card com efeito 3D no hover — reage ao cursor com rotação em perspectiva.
 * Inspirado no design de computação espacial da Apple.
 */
export function Card3D({ children, className = "" }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const aoMoverMouse = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centroX = rect.width / 2;
    const centroY = rect.height / 2;

    const rotateX = ((y - centroY) / centroY) * -8;
    const rotateY = ((x - centroX) / centroX) * 8;

    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const aoSairMouse = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={aoMoverMouse}
      onMouseLeave={aoSairMouse}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
