import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: {
      getItem: (key) => {
        if (typeof window !== 'undefined') {
          return sessionStorage.getItem(key);
        }
        return null;
      },
      setItem: (key, value) => {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(key, value);
        }
      },
      removeItem: (key) => {
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem(key);
        }
      },
    },
  },
})

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  
  if (error) throw error

  // Explicitly store the session
  if (data.session) {
    sessionStorage.setItem('supabase.auth.token', JSON.stringify(data.session));
    document.cookie = `supabase-auth-token=${data.session.access_token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax; Secure`;
  }

  return { session: data.session, user: data.user }
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error

  // Clear session storage and cookie
  sessionStorage.removeItem('supabase.auth.token');
  document.cookie = 'supabase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error

  // If no session, try to get from sessionStorage
  if (!data.session) {
    const storedSession = sessionStorage.getItem('supabase.auth.token');
    if (storedSession) {
      return { session: JSON.parse(storedSession) };
    }
  }

  return data
}

export async function setSession(access_token: string, refresh_token: string) {
  const { data, error } = await supabase.auth.setSession({ access_token, refresh_token })
  if (error) throw error

  // Store the new session in sessionStorage and cookie
  if (data.session) {
    sessionStorage.setItem('supabase.auth.token', JSON.stringify(data.session));
    document.cookie = `supabase-auth-token=${data.session.access_token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax; Secure`;
  }

  return data
}

