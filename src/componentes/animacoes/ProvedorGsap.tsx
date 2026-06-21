"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ProvedorGsapProps {
  children: React.ReactNode;
}

export function ProvedorGsap({ children }: ProvedorGsapProps) {
  useEffect(() => {
    // Refresh debounced no resize
    let tempo: ReturnType<typeof setTimeout>;
    const aoRedimensionar = () => {
      clearTimeout(tempo);
      tempo = setTimeout(() => ScrollTrigger.refresh(), 300);
    };
    window.addEventListener("resize", aoRedimensionar);
    return () => {
      window.removeEventListener("resize", aoRedimensionar);
      clearTimeout(tempo);
    };
  }, []);

  return <>{children}</>;
}
