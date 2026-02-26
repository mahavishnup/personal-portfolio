import 'server-only'
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: z.string().min(1),
})

const processEnv = {
  DATABASE_URL: process.env.DATABASE_URL,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
}

// Validate environment variables
// This will throw an error if validation fails, preventing the app from starting with invalid config
const parsed = envSchema.safeParse(processEnv)

if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables:',
    parsed.error.flatten().fieldErrors
  )
  throw new Error('Invalid environment variables')
}

export const env = parsed.data
