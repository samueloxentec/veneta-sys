# Stack Tecnológica

## Framework Principal
- **Next.js 16.2.9** (App Router) — versão de ponta, as APIs podem diferir do conhecimento de treinamento. Leia `node_modules/next/dist/docs/` antes de escrever código Next.js.
- **React 19.2.4**
- **TypeScript 5**

## Estilização
- **Tailwind CSS v4** (plugin PostCSS via `@tailwindcss/postcss`) — v4 tem breaking changes em relação à v3, sem arquivo `tailwind.config.js`
- Variáveis CSS definidas em `src/app/globals.css` — sempre prefira estas ao invés de valores hex fixos:
  - `--cor-texto`, `--cor-texto-muted`, `--cor-borda`
  - `--cor-prata` (#EAEAEC), `--cor-prata-media` (#AFAFAF), `--cor-prata-escura` (#5A5A5A)
  - `--cor-dourada` / `--cor-dourada-hover` (aliases de prata, mantidos por compatibilidade)
  - `--cor-verde` (#366C20), `--cor-vermelho` (#97150F)
  - `--fonte-titulo` (Space Grotesk), `--fonte-corpo` (Inter)

## Backend / Dados
- **Supabase** (`@supabase/supabase-js` + `@supabase/ssr`)
  - Auth: email/senha via Supabase Auth
  - Banco de dados: Postgres (acessado via cliente Supabase)
  - Edge Functions: lógica de negócio, chamadas através do proxy Next.js (nunca diretamente do browser)
- **Proxy Next.js** em `/api/funcoes/[...caminho]` — todas as chamadas a Edge Functions passam por `invocarFuncao()` de `src/lib/supabase/invocar-funcao.ts`

## Animações / 3D
- **GSAP 3 + `@gsap/react`** — animações de timeline, usado com o contexto `ProvedorGsap`
- **Motion (Framer Motion v12)** — fades acionados por scroll via `motion/react`
- **Three.js + `@react-three/fiber` + `@react-three/drei`** — elementos de canvas 3D
- **`html5-qrcode`** — leitura de QR code para check-in de eventos (página de validação)

## Comandos Comuns
```bash
npm run dev      # Inicia servidor de desenvolvimento (porta 3000)
npm run build    # Build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa o ESLint
```

## Variáveis de Ambiente
Necessárias no `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Uso dos Clientes Supabase
- **Server Components / Route Handlers**: `criarClienteServidor()` de `src/lib/supabase/cliente-servidor.ts` (assíncrono, usa cookies)
- **Client Components**: `criarClienteBrowser()` de `src/lib/supabase/cliente-browser.ts` (singleton)
- **Edge Functions**: sempre chame via `invocarFuncao(nomeFuncao, opcoes)` — nunca chame funções Supabase diretamente do browser
- O middleware de refresh de sessão está em `src/proxy.ts` (usado como middleware Next.js)
