'use client'

import { useState, useRef } from 'react'
import { criarClienteBrowser } from '@/lib/supabase/cliente-browser'
import { useRouter } from 'next/navigation'
import type { Factor } from '@supabase/auth-js'

type Etapa = 'credenciais' | 'mfa'

export default function PaginaLogin() {
  const [etapa, setEtapa] = useState<Etapa>('credenciais')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [codigoMFA, setCodigoMFA] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const router = useRouter()

  // Guarda o factorId do fator TOTP verificado do usuário
  const factorIdRef = useRef<string>('')

  async function handleCredenciais(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    const supabase = criarClienteBrowser()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha })

    if (error) {
      setErro('Email ou senha inválidos')
      setCarregando(false)
      return
    }

    // Verificar se o usuário tem MFA ativo
    // nextLevel === 'aal2' significa que precisa completar o segundo fator
    const { data: assuranceData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()

    if (assuranceData?.nextLevel === 'aal2' && assuranceData.nextLevel !== assuranceData.currentLevel) {
      // Buscar o fator TOTP verificado deste usuário
      const { data: fatores } = await supabase.auth.mfa.listFactors()
      const fatorTotp = fatores?.totp?.find((f: Factor) => f.status === 'verified')

      if (fatorTotp) {
        factorIdRef.current = fatorTotp.id
        setEtapa('mfa')
        setCarregando(false)
        return
      }
    }

    // MFA não configurado ou não exigido — login direto
    router.push('/admin/dashboard')
    router.refresh()
  }

  async function handleMFA(e: React.FormEvent) {
    e.preventDefault()
    const codigoLimpo = codigoMFA.trim()
    if (codigoLimpo.length !== 6) { setErro('O código deve ter 6 dígitos'); return }

    setErro('')
    setCarregando(true)

    const supabase = criarClienteBrowser()
    const { error } = await supabase.auth.mfa.challengeAndVerify({
      factorId: factorIdRef.current,
      code: codigoLimpo,
    })

    if (error) {
      setErro('Código inválido. Tente novamente.')
      setCarregando(false)
      return
    }

    router.push('/admin/dashboard')
    router.refresh()
  }

  const inputClasses = "w-full px-4 py-3 bg-black border border-[#252525] rounded-lg text-[#EAEAEC] placeholder-[#5A5A5A] focus:outline-none focus:ring-1 focus:ring-[#AFAFAF]/40 focus:border-[#AFAFAF]/50 transition text-sm"

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#0f0f0f] border border-[#252525] rounded-2xl p-8 shadow-2xl">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold font-[family-name:var(--fonte-titulo)]">
              <span className="text-[#EAEAEC]">Veneta</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5A5A5A] to-[#AFAFAF]">mater</span>
            </h1>
            <p className="text-[#8a8a8a] mt-2 text-sm">
              {etapa === 'credenciais' ? 'Painel Administrativo' : 'Verificação em dois fatores'}
            </p>
          </div>

          {/* Etapa 1: Email + Senha */}
          {etapa === 'credenciais' && (
            <form onSubmit={handleCredenciais} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-[#AFAFAF] mb-1.5 uppercase tracking-wider">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputClasses}
                  placeholder="seu@email.com"
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="senha" className="block text-xs font-medium text-[#AFAFAF] mb-1.5 uppercase tracking-wider">
                  Senha
                </label>
                <input
                  id="senha"
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  className={inputClasses}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
              {erro && <p className="text-red-400 text-sm text-center">{erro}</p>}
              <button
                type="submit"
                disabled={carregando}
                className="w-full py-3 bg-[#EAEAEC] hover:bg-[#d0d0d2] disabled:opacity-50 text-black font-semibold rounded-lg transition text-sm"
              >
                {carregando ? 'Verificando...' : 'Entrar'}
              </button>
            </form>
          )}

          {/* Etapa 2: Código MFA */}
          {etapa === 'mfa' && (
            <form onSubmit={handleMFA} className="space-y-5">
              <div className="text-center mb-2">
                <span className="text-3xl">📱</span>
                <p className="text-[#8a8a8a] text-sm mt-2 leading-relaxed">
                  Abra o seu app autenticador e insira o código de 6 dígitos.
                </p>
              </div>
              <div>
                <label htmlFor="codigo" className="block text-xs font-medium text-[#AFAFAF] mb-1.5 uppercase tracking-wider">
                  Código do Autenticador
                </label>
                <input
                  id="codigo"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={codigoMFA}
                  onChange={(e) => setCodigoMFA(e.target.value.replace(/\D/g, ''))}
                  required
                  className={`${inputClasses} text-center font-mono text-xl tracking-[0.5em]`}
                  placeholder="000000"
                  autoComplete="one-time-code"
                  autoFocus
                />
              </div>
              {erro && <p className="text-red-400 text-sm text-center">{erro}</p>}
              <button
                type="submit"
                disabled={carregando || codigoMFA.trim().length !== 6}
                className="w-full py-3 bg-[#EAEAEC] hover:bg-[#d0d0d2] disabled:opacity-50 text-black font-semibold rounded-lg transition text-sm"
              >
                {carregando ? 'Verificando...' : 'Confirmar'}
              </button>
              <button
                type="button"
                onClick={() => { setEtapa('credenciais'); setCodigoMFA(''); setErro(''); factorIdRef.current = '' }}
                className="w-full py-2 text-xs text-[#5A5A5A] hover:text-[#AFAFAF] transition"
              >
                ← Voltar ao login
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  )
}
