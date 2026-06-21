import { createBrowserClient } from '@supabase/ssr'

let clienteSingleton: ReturnType<typeof createBrowserClient> | null = null

export function criarClienteBrowser() {
  if (clienteSingleton) return clienteSingleton

  clienteSingleton = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return clienteSingleton
}
