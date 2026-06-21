import Link from 'next/link'

export default async function PaginaSucesso() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black">
      <div className="w-full max-w-md text-center">
        <div className="bg-[#0f0f0f] border border-[#252525] rounded-2xl p-8 shadow-2xl">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-[#EAEAEC] mb-4 font-[family-name:var(--fonte-titulo)]">
            Inscrição Confirmada!
          </h1>
          <p className="text-[#8a8a8a] mb-6 text-sm leading-relaxed">
            Pagamento processado com sucesso. Verifique a sua caixa de entrada — o ingresso digital foi enviado para o e-mail cadastrado.
          </p>

          <Link
            href="/"
            className="inline-block px-6 py-3 bg-[#EAEAEC] hover:bg-[#d0d0d2] text-black font-semibold rounded-lg transition text-sm"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  )
}
