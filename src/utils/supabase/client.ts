import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const sbKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

  if (!sbUrl || !sbKey) {
    throw new Error('Supabase URL and Key are required check .env')
  }

  return createBrowserClient(sbUrl, sbKey)
}
