import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Create a Supabase client specifically for the middleware
  const supabase = createMiddlewareClient({ req, res })

  // Get the token from the cookie
  const token = req.cookies.get('supabase-auth-token')?.value

  if (token) {
    // If token exists, set the session
    const { data, error } = await supabase.auth.setSession({
      access_token: token,
      refresh_token: token, // In this case, we're using the same token for both
    })

    if (error) {
      console.error('Error setting session:', error)
    }

    // Refresh session if expired - required for Server Components
    const { data: { session } } = await supabase.auth.getSession()

    // Log for debugging
    console.log('Middleware - Session:', session)
    console.log('Middleware - URL:', req.nextUrl.pathname)

    // Protect the /dashboard route
    if (req.nextUrl.pathname.startsWith('/dashboard') && !session) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/login'
      redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname)
      console.log('Middleware - Redirecting to login')
      return NextResponse.redirect(redirectUrl)
    }

    // Redirect logged-in users away from login/signup
    if (session && (req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/signup'))) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/dashboard'
      console.log('Middleware - Redirecting to dashboard')
      return NextResponse.redirect(redirectUrl)
    }
  } else {
    // If no token, redirect to login for protected routes
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/login'
      redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname)
      console.log('Middleware - No token, redirecting to login')
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Update response headers to set cookie
  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

