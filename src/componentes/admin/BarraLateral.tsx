'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface PropsBarraLateral {
  perfil: string
}

const itensNavegacao = [
  { href: '/admin/dashboard', rotulo: 'Dashboard', icone: '📊', apenas_admin: false },
  { href: '/admin/eventos', rotulo: 'Eventos', icone: '🎪', apenas_admin: false },
  { href: '/admin/validacao', rotulo: 'Validação', icone: '✅', apenas_admin: false },
  { href: '/admin/usuarios', rotulo: 'Usuários', icone: '👥', apenas_admin: true },
  { href: '/admin/auditoria', rotulo: 'Auditoria', icone: '📋', apenas_admin: true },
]

export function BarraLateral({ perfil }: PropsBarraLateral) {
  const pathname = usePathname()
  const [aberto, setAberto] = useState(false)

  const itensFiltrados = itensNavegacao.filter(
    item => !item.apenas_admin || perfil === 'administrador'
  )

  return (
    <>
      {/* Mobile: botão hambúrguer */}
      <button
        onClick={() => setAberto(!aberto)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#0f0f0f] border border-[#252525] rounded-lg"
        aria-label="Menu"
      >
        <span className="text-[var(--cor-texto)]">{aberto ? '✕' : '☰'}</span>
      </button>

      {/* Overlay mobile */}
      {aberto && (
        <div className="md:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setAberto(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40
        w-64 bg-[#0f0f0f] border-r border-[#252525] flex flex-col
        transform transition-transform duration-200
        ${aberto ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        <div className="p-6 border-b border-[#252525]">
          <h2 className="text-xl font-bold font-[family-name:var(--fonte-titulo)]">
            <span className="text-[#EAEAEC]">Veneta</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5A5A5A] to-[#AFAFAF]">mater</span>
          </h2>
          <p className="text-xs text-[var(--cor-texto-muted)] mt-1">Gestão de Eventos</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {itensFiltrados.map((item) => {
            const ativo = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setAberto(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  ativo
                    ? 'bg-[#EAEAEC]/8 text-[#EAEAEC] border border-[#EAEAEC]/15'
                    : 'text-[var(--cor-texto-muted)] hover:bg-[#1a1a1a] hover:text-[var(--cor-texto)]'
                }`}
              >
                <span>{item.icone}</span>
                <span>{item.rotulo}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
