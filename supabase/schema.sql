-- VR Consultoria — schema inicial (V1)
-- Rodar no SQL Editor do projeto Supabase.

create type lead_status as enum (
  'novo',
  'contatado',
  'diagnostico_agendado',
  'diagnostico_realizado',
  'proposta',
  'cliente',
  'perdido'
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  message text,
  interest text,
  source text,

  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,

  landing_page text,
  referrer text,

  status lead_status not null default 'novo',
  notes text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_source_idx on public.leads (source);

-- updated_at automático
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

-- RLS: ninguém acessa via anon key. Inserção pública acontece via
-- Route Handler server-side usando a service role key (bypassa RLS).
-- Leitura/edição só para admins autenticados via Supabase Auth.
alter table public.leads enable row level security;

create policy "Admins autenticados podem ler leads"
  on public.leads for select
  to authenticated
  using (true);

create policy "Admins autenticados podem atualizar leads"
  on public.leads for update
  to authenticated
  using (true);

-- Nenhuma policy de insert/delete para authenticated/anon:
-- inserts só passam pela service role (Route Handler), deletes não são
-- permitidos pela V1 (evita perda acidental de leads).
