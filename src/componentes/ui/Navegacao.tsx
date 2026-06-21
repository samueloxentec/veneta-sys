"use client";

import Image from "next/image";

const links = [
  { rotulo: "Sobre", href: "#sobre" },
  { rotulo: "Serviços", href: "#servicos" },
  { rotulo: "Eventos", href: "#eventos" },
  { rotulo: "Portfólio", href: "#portfolio" },
  { rotulo: "Parceiros", href: "#parceiros" },
  { rotulo: "Contato", href: "#contato" },
];

export function Navegacao() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#252525]/60">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo + Wordmark */}
        <a href="#inicio" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-[#252525] group-hover:ring-[#5A5A5A] transition-all">
            <Image
              src="/veneta_images/logo_reduzida.jpg"
              alt="Veneta Mater"
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
          <span className="text-[1.05rem] font-bold font-[family-name:var(--fonte-titulo)] tracking-tight leading-none">
            <span className="text-[#EAEAEC]">Veneta</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5A5A5A] to-[#AFAFAF]">mater</span>
          </span>
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[#AFAFAF] hover:text-[#EAEAEC] transition-colors"
            >
              {l.rotulo}
            </a>
          ))}
          <a
            href="#contato"
            className="px-5 py-2 rounded-full border border-[#EAEAEC]/30 text-[#EAEAEC] text-sm font-medium hover:bg-[#EAEAEC] hover:text-black transition-all"
          >
            Fale Connosco
          </a>
        </div>
      </div>
    </nav>
  );
}
