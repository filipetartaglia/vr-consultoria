import { createBrowserClient } from "@supabase/ssr";

// Usado em Client Components. Requer NEXT_PUBLIC_SUPABASE_URL e
// NEXT_PUBLIC_SUPABASE_ANON_KEY configurados em .env.local.
// A anon key é segura para expor no browser — o acesso real é controlado
// por Row Level Security (RLS) no Supabase.
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase não configurado: defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY em .env.local"
    );
  }

  return createBrowserClient(url, anonKey);
}
