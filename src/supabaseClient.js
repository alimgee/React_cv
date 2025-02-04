import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // From .env.local
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // From .env.local

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;