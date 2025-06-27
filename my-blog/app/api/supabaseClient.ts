import { createClient } from '@supabase/supabase-js'
import { Database } from './supabaseType'

const supabaseUrl = 'https://aijenlytasmlxyoabgub.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpamVubHl0YXNtbHh5b2FiZ3ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MjgwMjksImV4cCI6MjA2NjUwNDAyOX0.QAqx-8s65-4UmnyHDBXMOPkdlgnC9CSu7MBTD970iK8'

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)