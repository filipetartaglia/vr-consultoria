import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// ATENÇÃO: usa a service role key (bypassa RLS). Só pode ser importado
// dentro de Route Handlers (app/api/**) ou Server Actions — nunca em
// código que roda no browser. A service role key NUNCA deve ter o
// prefixo NEXT_PUBLIC_.
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase (service role) não configurado: defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  return createSupabaseClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
