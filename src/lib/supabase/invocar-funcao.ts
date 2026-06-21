interface OpcoesChamada {
  metodo?: 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'GET'
  corpo?: Record<string, unknown>
  caminho?: string
}

/**
 * Invoca uma Edge Function via proxy Next.js (/api/funcoes/).
 * Evita problemas de CORS — o browser fala com o mesmo origin.
 */
export async function invocarFuncao<T = any>(
  nomeFuncao: string,
  opcoes: OpcoesChamada = {}
): Promise<{ dados: T | null; erro: string | null; status: number }> {
  const { metodo = 'POST', corpo, caminho = '' } = opcoes

  const url = `/api/funcoes/${nomeFuncao}${caminho ? `/${caminho}` : ''}`

  try {
    const resposta = await fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: corpo ? JSON.stringify(corpo) : undefined,
    })

    const dados = await resposta.json()

    if (!resposta.ok) {
      return { dados: null, erro: dados.erro || dados.message || 'Erro desconhecido', status: resposta.status }
    }

    return { dados, erro: null, status: resposta.status }
  } catch (err: any) {
    return { dados: null, erro: err.message || 'Erro de rede', status: 0 }
  }
}
