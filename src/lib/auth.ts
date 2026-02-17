import { createClient } from '@/utils/supabase/server'
import { cache } from 'react'
import 'server-only'

// Cached helper to get the user session
export const getSession = cache(async () => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
})
