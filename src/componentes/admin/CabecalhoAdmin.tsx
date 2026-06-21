'use client'

import { criarClienteBrowser } from '@/lib/supabase/cliente-browser'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Factor } from '@supabase/auth-js'

interface PropsCabecalho {
  nome: string
  perfil: string
}

export function CabecalhoAdmin({ nome, perfil }: PropsCabecalho) {
  const router = useRouter()
  const [temMFA, setTemMFA] = useState<boolean | null>(null)

  useEffect(() => {
    async function checarMFA() {
      const supabase = criarClienteBrowser()
      const { data } = await supabase.auth.mfa.listFactors()
      setTemMFA(data?.totp?.some((f: Factor) => f.status === 'verified') ?? false)
    }
    checarMFA()
  }, [])

  async function handleLogout() {
    const supabase = criarClienteBrowser()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="h-14 sm:h-16 border-b border-[#252525] bg-[#0f0f0f] flex items-center justify-end px-4 sm:px-6">
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Alerta de MFA desativado */}
        {temMFA === false && (
          <Link
            href="/admin/mfa"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-amber-400 border border-amber-700/50 rounded-lg hover:bg-amber-900/20 transition"
            title="Ative o MFA para maior segurança"
          >
            <span>⚠️</span>
            <span>Ativar MFA</span>
          </Link>
        )}
        {temMFA === true && (
          <Link
            href="/admin/mfa"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-[var(--cor-verde)] border border-[var(--cor-verde)]/30 rounded-lg hover:bg-[var(--cor-verde)]/10 transition"
            title="MFA ativo"
          >
            <span>🔐</span>
            <span>MFA ativo</span>
          </Link>
        )}
        <div className="text-right hidden sm:block">
          <p className="text-sm text-[var(--cor-texto)] font-medium">{nome}</p>
          <p className="text-xs text-[var(--cor-texto-muted)] capitalize">{perfil}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-3 py-1.5 text-xs text-[var(--cor-texto-muted)] hover:text-[var(--cor-texto)] border border-[#252525] rounded-lg hover:bg-[#1a1a1a] transition"
        >
          Sair
        </button>
      </div>
    </header>
  )
}
