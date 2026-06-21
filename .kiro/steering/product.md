# Produto: Venetamater

O Venetamater é uma plataforma de gestão de eventos para uma empresa brasileira especializada em artes decorativas venezianas (técnicas decorativas italianas). O sistema possui duas interfaces:

## Site Público (grupo de rotas `(site)`)
- Landing page com serviços, portfólio, eventos, parceiros e seção "trabalhe conosco"
- Usuários podem visualizar eventos futuros e se inscrever neles (fluxo de inscrição)
- Visual rico com animações, fundos parallax e efeitos 3D

## Painel Administrativo (grupo de rotas `(painel)`)
- Área protegida por senha para uso interno da equipe
- Dois perfis: **administrador** (acesso total) e colaborador (acesso limitado)
- Módulos principais: Dashboard (KPIs), Eventos (criar/gerenciar), Participantes (por evento), Validação (check-in por QR code), Usuários (só admin), Auditoria (só admin)
- Colaboradores são integrados via tokens de convite — sem auto-cadastro

## Backend
- Supabase (Postgres + Auth + Edge Functions) como único backend
- Lógica de negócio nas Supabase Edge Functions, chamadas através de um proxy Next.js em `/api/funcoes/`
- Todo o conteúdo e dados estão em português (Brasil)
