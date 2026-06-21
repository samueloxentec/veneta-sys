import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Proxy genérico: /api/funcoes/<nome-da-funcao>
 * O browser chama esta rota (mesmo origin, sem CORS).
 * O Next.js repassa para o Supabase Edge Function server-side.
 */

async function obterTokenUsuario(): Promise<string | null> {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()
  return session?.access_token || null
}

async function handler(request: NextRequest, { params }: { params: Promise<{ caminho: string[] }> }) {
  const { caminho } = await params
  const nomeFuncao = caminho[0]
  const restoCaminho = caminho.slice(1).join('/')

  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/${nomeFuncao}${restoCaminho ? `/${restoCaminho}` : ''}`

  // Obter token do usuário autenticado
  const token = await obterTokenUsuario()

  // Preparar headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  // Ler body se não for GET/HEAD
  let body: string | undefined
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    try {
      body = await request.text()
    } catch {
      // sem body
    }
  }

  try {
    const resposta = await fetch(url, {
      method: request.method,
      headers,
      body,
    })

    const dados = await resposta.text()

    return new NextResponse(dados, {
      status: resposta.status,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err: any) {
    return NextResponse.json(
      { erro: err.message || 'Erro ao conectar com o servidor' },
      { status: 502 }
    )
  }
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const PATCH = handler
export const DELETE = handler
