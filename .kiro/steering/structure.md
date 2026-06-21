# Estrutura do Projeto

## Raiz
```
src/
  app/          # Páginas e rotas de API do Next.js App Router
  componentes/  # Componentes React reutilizáveis (agrupados por domínio)
  lib/          # Utilitários compartilhados e clientes de serviço
  proxy.ts      # Middleware Next.js (refresh de sessão Supabase)
```

## Grupos de Rotas (`src/app/`)
```
(site)/               # Site público (sem autenticação)
  page.tsx            # Landing page (monta todas as SecaoXxx)
  layout.tsx          # Layout do site (Navegacao + Rodape)
  eventos/[id]/       # Detalhe do evento + fluxo de inscrição

(painel)/             # Painel interno (autenticação obrigatória)
  login/              # Página de login ('use client')
  convite/[token]/    # Aceite de convite ('use client')
  admin/              # Área administrativa protegida por auth
    layout.tsx        # Verificação de auth + sidebar + cabeçalho (Server Component)
    dashboard/
    eventos/          # Listagem, novo/, [id]/participantes/
    validacao/        # Check-in por QR code
    usuarios/
    auditoria/

api/
  funcoes/[...caminho]/route.ts  # Proxy genérico para Supabase Edge Functions
```

## Componentes (`src/componentes/`)
```
admin/        # BarraLateral, CabecalhoAdmin — estrutura visual do painel
animacoes/    # FundoImagens, FundoParticulas, ProvedorGsap,
              # ScrollFadeSection, StaggerContainer — primitivas de animação
landing/      # SecaoHero, SecaoSobre, SecaoServicos, SecaoEventos,
              # SecaoPortfolio, SecaoParceiros, SecaoTrabalheConosco,
              # SecaoCTA, ModalInscricao — seções do site público
ui/           # Card3D, Navegacao, Rodape — elementos de UI compartilhados
```

## Lib (`src/lib/`)
```
supabase/
  cliente-browser.ts    # Cliente Supabase para o browser (singleton)
  cliente-servidor.ts   # Cliente Supabase para o servidor (assíncrono, baseado em cookies)
  invocar-funcao.ts     # Helper para chamar Edge Functions via /api/funcoes/
```

## Convenções de Nomenclatura
- **Arquivos e pastas**: português, kebab-case (ex: `cliente-servidor.ts`, `BarraLateral.tsx`)
- **Componentes**: PascalCase, nomes em português (ex: `SecaoHero`, `BarraLateral`)
- **Páginas**: export default nomeado `PaginaXxx` (ex: `PaginaLogin`, `PaginaEventos`)
- **Funções/variáveis**: camelCase, português (ex: `criarClienteServidor`, `carregando`)
- **Interfaces de props**: `PropsNomeComponente` (ex: `PropsBarraLateral`)
- **Variáveis CSS**: use `var(--cor-texto)` etc. nas classes, nunca hex fixo

## Padrões Arquiteturais
- **Server Components por padrão** — páginas que precisam de dados fazem fetch diretamente com `criarClienteServidor()`; adicione `'use client'` apenas quando hooks ou interatividade forem necessários
- **Guard de auth no layout** — `src/app/(painel)/admin/layout.tsx` faz `getUser()` + consulta no banco e redireciona para `/login` se não autenticado; páginas individuais não repetem essa verificação
- **Mutações de dados** — passam pelas Supabase Edge Functions via `invocarFuncao()`; escritas diretas no banco pelo cliente são evitadas para tudo além de leituras simples
- **UI baseada em perfil** — o campo `perfil` (`'administrador'` | outros) é passado como prop para filtrar itens de navegação e renderizar condicionalmente elementos exclusivos do admin
