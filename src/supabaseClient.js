import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ndjjsqinyqmpqznwnfmw.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kampzcWlueXFtcHF6bnduZm13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2MjgzMTAsImV4cCI6MjA4NjIwNDMxMH0.BzBtpTKEUkl_Awb0BjH-HIcVqj3eUkGUgiVVp_ylkFk'

export const supabase = createClient(supabaseUrl, supabaseKey)
