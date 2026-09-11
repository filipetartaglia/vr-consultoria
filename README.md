# VR Consultoria — site

Next.js 14 (App Router) + TypeScript + Tailwind + Supabase.

## Rodar localmente

```bash
npm install
cp .env.example .env.local   # preencher depois de criar o Supabase
npm run dev
```

## Setup do Supabase (quando for criar)

1. Criar projeto em supabase.com.
2. Rodar `supabase/schema.sql` no SQL Editor.
3. Copiar URL + anon key + service role key para `.env.local`.
4. Criar um usuário em Authentication → Users para logar em `/admin`.

Sem isso configurado, o site público funciona normalmente — só o
formulário de diagnóstico e o `/admin` ficam inativos.

## Pendências sinalizadas no código (não inventadas, ver regra 28)

- Foto de Vinicius (Home, /sobre, /vinicius)
- Certificações/credenciais de Vinicius além de Ciências Contábeis
- Nome + foto dos 2 depoimentos sem identificação (`components/home/Testimonials.tsx`)
- Domínio final em `lib/constants.ts` (`SITE.url`) — hoje aponta pra um placeholder
- Meta Pixel / GA4 IDs em `.env.local` quando forem criados

## Deploy

Vercel: importar o repo, colar as env vars do `.env.example`, deploy.
