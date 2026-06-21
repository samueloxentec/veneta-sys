"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { useFundoImagem } from "@/componentes/animacoes/FundoImagens";

interface ScrollFadeSectionProps {
  backgroundImage: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** ordem de prioridade — seções acima têm prioridade menor (ex: Hero = 0) */
  prioridade?: number;
  // mantido apenas para compatibilidade — não tem efeito visual aqui
  overlay?: string;
}

let contadorId = 0;

export function ScrollFadeSection({
  backgroundImage,
  children,
  className = "",
  id,
  prioridade,
}: ScrollFadeSectionProps) {
  const idInterno = useRef(`secao-fundo-${contadorId++}`).current;
  const sectionRef = useRef<HTMLElement>(null);
  const { registrar, ativar, desativar } = useFundoImagem();

  // Considera "em vista" quando 30% da seção é visível
  const emVista = useInView(sectionRef, { amount: 0.3 });

  useEffect(() => {
    registrar(idInterno, backgroundImage, prioridade ?? contadorId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (emVista) {
      ativar(idInterno);
    } else {
      desativar(idInterno);
    }
  }, [emVista, idInterno, ativar, desativar]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative ${className}`}
    >
      {/* Conteúdo com fade + leve translateY ao entrar no viewport */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}
