import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ajwzthchhbbznmwbkzqq.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqd3p0aGNoaGJiem5td2JrenFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1NDcxMzUsImV4cCI6MjEwNDEyMzEzNX0.jvpuLXa0LS7ScktbftcqnWlShn--mwoALGMnuzmSB-w'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
