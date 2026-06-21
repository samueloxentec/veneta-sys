'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { invocarFuncao } from '@/lib/supabase/invocar-funcao'

export default function PaginaConvite() {
  const { token } = useParams<{ token: string }>()
  const router = useRouter()
  const [nome, setNome] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState(false)
  const [carregando, setCarregando] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    if (senha !== confirmarSenha) { setErro('As senhas não coincidem'); return }
    if (senha.length < 6) { setErro('Senha deve ter no mínimo 6 caracteres'); return }
    setCarregando(true)

    const { erro: erroResp } = await invocarFuncao('aceitar-convite', {
      corpo: { token, nome, senha },
    })

    if (erroResp) { setErro(erroResp || 'Erro ao aceitar convite'); setCarregando(false); return }
    setSucesso(true)
    setTimeout(() => router.push('/login'), 3000)
  }

  const inputClasses = "w-full px-4 py-3 bg-black border border-[#252525] rounded-lg text-[#EAEAEC] placeholder-[#5A5A5A] focus:outline-none focus:ring-1 focus:ring-[#AFAFAF]/40 focus:border-[#AFAFAF]/50 transition text-sm"
  const labelClasses = "block text-xs font-medium text-[#AFAFAF] mb-1.5 uppercase tracking-wider"

  if (sucesso) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="bg-[#0f0f0f] border border-[#252525] rounded-2xl p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold text-[#EAEAEC] mb-4">Conta criada! ✅</h1>
          <p className="text-[#8a8a8a]">Redirecionando para o login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#0f0f0f] border border-[#252525] rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold font-[family-name:var(--fonte-titulo)]">
              <span className="text-[#EAEAEC]">Aceitar Convite</span>
            </h1>
            <p className="text-[#8a8a8a] mt-2 text-sm">Defina o seu nome e senha</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={labelClasses}>Nome Completo</label>
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required className={inputClasses} placeholder="Seu nome completo" />
            </div>
            <div>
              <label className={labelClasses}>Senha</label>
              <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required className={inputClasses} placeholder="••••••••" />
            </div>
            <div>
              <label className={labelClasses}>Confirmar Senha</label>
              <input type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required className={inputClasses} placeholder="••••••••" />
            </div>
            {erro && <p className="text-red-400 text-sm text-center">{erro}</p>}
            <button
              type="submit"
              disabled={carregando}
              className="w-full py-3 bg-[#EAEAEC] hover:bg-[#d0d0d2] disabled:opacity-50 text-black font-semibold rounded-lg transition text-sm"
            >
              {carregando ? 'Criando conta...' : 'Criar Conta'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
