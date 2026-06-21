'use client'

import { useState, useRef, useCallback } from 'react'
import { invocarFuncao } from '@/lib/supabase/invocar-funcao'

export default function PaginaValidacao() {
  const [codigo, setCodigo] = useState('')
  const [resultado, setResultado] = useState<any>(null)
  const [carregando, setCarregando] = useState(false)
  const [modoCamera, setModoCamera] = useState(false)
  const [cameraStatus, setCameraStatus] = useState<'idle' | 'loading' | 'active' | 'error'>('idle')
  const [erroCamera, setErroCamera] = useState('')
  const scannerRef = useRef<any>(null)

  const validar = useCallback(async (codigoParaValidar: string, tipo: 'codigo' | 'qrcode') => {
    if (!codigoParaValidar.trim()) return
    setCarregando(true)
    setResultado(null)

    const { dados, erro } = await invocarFuncao('validar-ingresso', {
      corpo: { codigo: codigoParaValidar.trim(), tipo },
    })

    setResultado(erro ? { resultado: 'erro', mensagem: erro } : dados)
    setCarregando(false)
  }, [])

  async function iniciarCamera() {
    setModoCamera(true)
    setCameraStatus('loading')
    setErroCamera('')
    setResultado(null)

    // Aguardar o DOM renderizar o container
    await new Promise(r => setTimeout(r, 100))

    try {
      const { Html5Qrcode } = await import('html5-qrcode')

      // Verificar se o elemento existe
      const el = document.getElementById('leitor-qrcode')
      if (!el) {
        throw new Error('Elemento do leitor não encontrado')
      }

      const scanner = new Html5Qrcode('leitor-qrcode')
      scannerRef.current = scanner

      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 220, height: 220 } },
        (textoDecodificado) => {
          // QR lido - parar e validar
          pararCamera()
          setCodigo(textoDecodificado)
          validar(textoDecodificado, 'qrcode')
        },
        () => {} // frame sem QR - silencioso
      )

      setCameraStatus('active')
    } catch (err: any) {
      console.error('Erro camera:', err)
      setCameraStatus('error')

      if (err.message?.includes('Permission') || err.name === 'NotAllowedError') {
        setErroCamera('Permissão da câmera negada. Permita o acesso nas configurações do navegador.')
      } else if (err.message?.includes('NotFound') || err.name === 'NotFoundError') {
        setErroCamera('Nenhuma câmera encontrada neste dispositivo.')
      } else if (err.message?.includes('not supported')) {
        setErroCamera('Câmera não suportada neste contexto. Use HTTPS ou acesse pelo celular na mesma rede.')
      } else {
        setErroCamera(err.message || 'Não foi possível acessar a câmera.')
      }
    }
  }

  function pararCamera() {
    setModoCamera(false)
    setCameraStatus('idle')
    if (scannerRef.current) {
      try {
        const estado = scannerRef.current.getState()
        // 2 = SCANNING, 3 = PAUSED
        if (estado === 2 || estado === 3) {
          scannerRef.current.stop().catch(() => {})
        }
      } catch {
        // scanner pode não ter getState em todas as versões
        scannerRef.current.stop().catch(() => {})
      }
      scannerRef.current = null
    }
  }

  function handleSubmitManual(e: React.FormEvent) {
    e.preventDefault()
    validar(codigo, 'codigo')
  }

  const corResultado =
    resultado?.resultado === 'valido' ? 'border-green-700 bg-green-900/20' :
    resultado?.resultado === 'ja_utilizado' ? 'border-amber-700 bg-amber-900/20' :
    resultado?.resultado ? 'border-red-700 bg-red-900/20' : ''

  return (
    <div className="w-full max-w-lg mx-auto px-2 sm:px-0">
      <h1 className="text-xl sm:text-2xl font-bold text-[var(--cor-texto)] mb-6 font-[family-name:var(--fonte-titulo)]">
        Validação de Ingressos
      </h1>

      {/* Abas */}
      <div className="flex gap-2 mb-5">
        <button
          onClick={iniciarCamera}
          className={`flex-1 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition ${
            modoCamera
              ? 'bg-[var(--cor-dourada)] text-black'
              : 'bg-[#141414] border border-[#2a2420] text-[var(--cor-texto-muted)]'
          }`}
        >
          📷 Escanear
        </button>
        <button
          onClick={pararCamera}
          className={`flex-1 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition ${
            !modoCamera
              ? 'bg-[var(--cor-dourada)] text-black'
              : 'bg-[#141414] border border-[#2a2420] text-[var(--cor-texto-muted)]'
          }`}
        >
          ⌨️ Digitar
        </button>
      </div>

      {/* Modo Câmera */}
      {modoCamera && (
        <div className="mb-5">
          <div
            id="leitor-qrcode"
            className="rounded-xl overflow-hidden border border-[#2a2420] bg-black w-full"
            style={{ minHeight: 300 }}
          />
          {cameraStatus === 'loading' && (
            <p className="text-[var(--cor-dourada)] text-sm text-center mt-3 animate-pulse">
              Acessando câmera...
            </p>
          )}
          {cameraStatus === 'active' && (
            <p className="text-[var(--cor-texto-muted)] text-xs text-center mt-3">
              Aponte para o QR Code. Validação automática.
            </p>
          )}
          {cameraStatus === 'error' && (
            <div className="mt-3 p-3 bg-red-900/20 border border-red-700 rounded-lg">
              <p className="text-red-400 text-sm text-center">{erroCamera}</p>
              <button
                onClick={iniciarCamera}
                className="mt-2 w-full py-2 text-xs border border-red-700 text-red-400 rounded-lg hover:bg-red-900/30 transition"
              >
                Tentar novamente
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modo Manual */}
      {!modoCamera && (
        <form onSubmit={handleSubmitManual} className="space-y-4 mb-5">
          <div>
            <label className="block text-sm text-[var(--cor-texto-muted)] mb-1.5">
              Código do Ingresso
            </label>
            <input
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.toUpperCase())}
              placeholder="Ex: A1B2C3D4"
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2420] rounded-lg text-[var(--cor-texto)] font-mono text-base sm:text-lg tracking-wider focus:outline-none focus:ring-2 focus:ring-[var(--cor-dourada)]/30 transition"
            />
          </div>
          <button
            type="submit"
            disabled={carregando || !codigo.trim()}
            className="w-full py-3 bg-[var(--cor-dourada)] hover:bg-[var(--cor-dourada-hover)] disabled:opacity-50 text-black font-semibold rounded-lg transition"
          >
            {carregando ? 'Validando...' : 'Validar Ingresso'}
          </button>
        </form>
      )}

      {/* Resultado */}
      {resultado && (
        <div className={`p-5 border rounded-xl ${corResultado}`}>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl sm:text-3xl">
              {resultado.resultado === 'valido' && '✅'}
              {resultado.resultado === 'ja_utilizado' && '⚠️'}
              {resultado.resultado === 'invalido' && '❌'}
              {resultado.resultado === 'erro' && '❌'}
            </span>
            <p className="text-base sm:text-lg font-semibold text-[var(--cor-texto)]">
              {resultado.resultado === 'valido' && 'Ingresso Válido'}
              {resultado.resultado === 'ja_utilizado' && 'Já Utilizado'}
              {resultado.resultado === 'invalido' && 'Inválido'}
              {resultado.resultado === 'erro' && 'Erro'}
            </p>
          </div>
          <p className="text-sm text-[var(--cor-texto-muted)]">{resultado.mensagem}</p>
          {resultado.participante_nome && (
            <p className="text-sm text-[var(--cor-dourada)] mt-2 font-medium">
              {resultado.participante_nome}
            </p>
          )}
          {resultado.evento_nome && (
            <p className="text-xs text-[var(--cor-texto-muted)] mt-1">
              {resultado.evento_nome}
            </p>
          )}
          <button
            onClick={() => { setResultado(null); setCodigo(''); iniciarCamera() }}
            className="mt-4 w-full py-2.5 border border-[#2a2420] text-[var(--cor-texto-muted)] hover:text-[var(--cor-texto)] hover:bg-[#1a1612] rounded-lg text-sm transition"
          >
            Escanear Próximo →
          </button>
        </div>
      )}
    </div>
  )
}
