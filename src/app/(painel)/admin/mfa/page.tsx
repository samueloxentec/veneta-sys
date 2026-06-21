'use client'

import { useState, useEffect, useRef } from 'react'
import { criarClienteBrowser } from '@/lib/supabase/cliente-browser'
import { useRouter } from 'next/navigation'
import type { Factor } from '@supabase/auth-js'

type Etapa = 'verificando' | 'desativado' | 'qrcode' | 'ativado'

export default function PaginaMFA() {
  const router = useRouter()
  const [etapa, setEtapa] = useState<Etapa>('verificando')
  const [qrCode, setQrCode] = useState('')
  const [secret, setSecret] = useState('')
  const [codigo, setCodigo] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  // useRef garante que o factorId nunca fica dessincronizado com o QR exibido,
  // mesmo que o componente rerenderize (Strict Mode, HMR, etc.)
  const factorIdRef = useRef<string>('')

  // Proteção contra double-invoke do React Strict Mode em dev
  const enrollandoRef = useRef(false)

  useEffect(() => {
    verificarMFA()
  }, [])

  async function verificarMFA() {
    const supabase = criarClienteBrowser()
    const { data } = await supabase.auth.mfa.listFactors()
    const temMFA = data?.totp?.some((f: Factor) => f.status === 'verified')
    setEtapa(temMFA ? 'ativado' : 'desativado')
  }

  async function iniciarCadastroMFA() {
    // Evita duplo clique ou double-invoke do Strict Mode
    if (enrollandoRef.current) return
    enrollandoRef.current = true

    setErro('')
    setCarregando(true)
    const supabase = criarClienteBrowser()

    // Limpar TODOS os fatores unverified antes de criar um novo
    // Isso garante que não há conflito de nome e que o banco está limpo
    const { data: fatoresExistentes } = await supabase.auth.mfa.listFactors()
    const naoVerificados = fatoresExistentes?.totp?.filter((f: Factor) => f.status === 'unverified') ?? []
    for (const fator of naoVerificados) {
      await supabase.auth.mfa.unenroll({ factorId: fator.id })
    }

    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: 'totp',
      issuer: 'Venetamater',
      friendlyName: `totp-${Date.now()}`,
    })

    enrollandoRef.current = false

    if (error || !data) {
      setErro(error?.message || 'Erro ao iniciar configuração')
      setCarregando(false)
      return
    }

    // Armazena no ref — nunca fica stale mesmo com rerenders
    factorIdRef.current = data.id

    setQrCode(data.totp.qr_code)
    setSecret(data.totp.secret)
    setCodigo('')
    setEtapa('qrcode')
    setCarregando(false)
  }

  async function verificarCodigo() {
    const codigoLimpo = codigo.trim()
    if (codigoLimpo.length !== 6) { setErro('O código deve ter 6 dígitos'); return }

    const idAtual = factorIdRef.current
    if (!idAtual) {
      setErro('Sessão expirada. Gere um novo QR Code.')
      return
    }

    setErro('')
    setCarregando(true)
    const supabase = criarClienteBrowser()

    const { error: verifyErr } = await supabase.auth.mfa.challengeAndVerify({
      factorId: idAtual,
      code: codigoLimpo,
    })

    if (verifyErr) {
      setErro(`Código inválido: ${verifyErr.message}`)
      setCarregando(false)
      return
    }

    factorIdRef.current = ''
    setEtapa('ativado')
    setCarregando(false)
  }

  async function desativarMFA() {
    setErro('')
    setCarregando(true)
    const supabase = criarClienteBrowser()
    const { data } = await supabase.auth.mfa.listFactors()
    const fator = data?.totp?.find((f: Factor) => f.status === 'verified')
    if (fator) {
      const { error } = await supabase.auth.mfa.unenroll({ factorId: fator.id })
      if (error) { setErro(error.message); setCarregando(false); return }
    }
    setEtapa('desativado')
    setCarregando(false)
  }

  const inputCls = "w-full px-4 py-3 bg-[#0a0a0a] border border-[#252525] rounded-lg text-[var(--cor-texto)] text-center font-mono text-xl tracking-[0.5em] focus:outline-none focus:ring-1 focus:ring-[var(--cor-prata-media)]/40 transition"

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-[var(--cor-texto)] mb-2 font-[family-name:var(--fonte-titulo)]">
        Autenticação de Dois Fatores
      </h1>
      <p className="text-[var(--cor-texto-muted)] text-sm mb-8">
        Proteja sua conta com um app autenticador (Google Authenticator, Authy, etc.)
      </p>

      {etapa === 'verificando' && (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-[var(--cor-prata-media)] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {etapa === 'desativado' && (
        <div className="bg-[#141414] border border-[#252525] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🔓</span>
            <div>
              <p className="text-sm font-medium text-[var(--cor-texto)]">MFA não configurado</p>
              <p className="text-xs text-[var(--cor-texto-muted)]">Sua conta usa apenas senha para login</p>
            </div>
          </div>
          {erro && <p className="text-red-400 text-sm mb-4">{erro}</p>}
          <button
            onClick={iniciarCadastroMFA}
            disabled={carregando}
            className="w-full py-3 bg-[var(--cor-prata)] hover:bg-[var(--cor-prata-hover)] disabled:opacity-50 text-black font-semibold rounded-lg transition text-sm"
          >
            {carregando ? 'Iniciando...' : 'Configurar MFA'}
          </button>
        </div>
      )}

      {etapa === 'qrcode' && (
        <div className="bg-[#141414] border border-[#252525] rounded-xl p-6 space-y-5">
          <p className="text-sm text-[var(--cor-texto-muted)]">
            1. Abra o seu app autenticador e escaneie o QR Code abaixo.
          </p>
          <div className="flex justify-center bg-white p-3 rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrCode} alt="QR Code MFA" className="w-48 h-48" />
          </div>
          <div className="bg-[#0a0a0a] border border-[#252525] rounded-lg p-3">
            <p className="text-xs text-[var(--cor-texto-muted)] mb-1 uppercase tracking-wider">Código manual</p>
            <p className="font-mono text-xs text-[var(--cor-prata-media)] break-all select-all">{secret}</p>
          </div>
          <p className="text-sm text-[var(--cor-texto-muted)]">
            2. Digite o código de 6 dígitos gerado pelo app.
          </p>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={codigo}
            onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ''))}
            placeholder="000000"
            className={inputCls}
            autoComplete="one-time-code"
          />
          {erro && (
            <div className="space-y-2">
              <p className="text-red-400 text-sm text-center">{erro}</p>
              <button
                onClick={() => { setCodigo(''); setErro(''); iniciarCadastroMFA() }}
                className="w-full py-2 text-xs border border-red-700/40 text-red-400 rounded-lg hover:bg-red-900/20 transition"
              >
                Gerar novo QR Code e tentar novamente
              </button>
            </div>
          )}
          <button
            onClick={verificarCodigo}
            disabled={carregando || codigo.trim().length !== 6}
            className="w-full py-3 bg-[var(--cor-prata)] hover:bg-[var(--cor-prata-hover)] disabled:opacity-50 text-black font-semibold rounded-lg transition text-sm"
          >
            {carregando ? 'Verificando...' : 'Confirmar e Ativar'}
          </button>
        </div>
      )}

      {etapa === 'ativado' && (
        <div className="bg-[#141414] border border-[#252525] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🔐</span>
            <div>
              <p className="text-sm font-medium text-[var(--cor-texto)]">MFA ativo</p>
              <p className="text-xs text-[var(--cor-verde)] font-medium">Sua conta está protegida com dois fatores</p>
            </div>
          </div>
          <p className="text-xs text-[var(--cor-texto-muted)] mb-5 leading-relaxed">
            No próximo login, será solicitado o código do seu app autenticador após a senha.
          </p>
          {erro && <p className="text-red-400 text-sm mb-4">{erro}</p>}
          <button
            onClick={desativarMFA}
            disabled={carregando}
            className="w-full py-2.5 border border-[var(--cor-vermelho)]/40 text-[var(--cor-vermelho)] hover:bg-[var(--cor-vermelho)]/10 disabled:opacity-50 rounded-lg transition text-sm"
          >
            {carregando ? 'Removendo...' : 'Remover MFA'}
          </button>
        </div>
      )}

      <button
        onClick={() => router.back()}
        className="mt-6 text-xs text-[var(--cor-texto-muted)] hover:text-[var(--cor-texto)] transition"
      >
        ← Voltar
      </button>
    </div>
  )
}
