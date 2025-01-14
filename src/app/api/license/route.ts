import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: license, error } = await supabase
    .from('licenses')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch license' }, { status: 500 })
  }

  return NextResponse.json(license)
}

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { type } = await request.json()

  if (!type || (type !== 'individual' && type !== 'enterprise')) {
    return NextResponse.json({ error: 'Invalid license type' }, { status: 400 })
  }

  const licenseKey = generateLicenseKey()
  const expirationDate = new Date()
  expirationDate.setFullYear(expirationDate.getFullYear() + 1)

  const { data: license, error } = await supabase
    .from('licenses')
    .upsert({
      user_id: user.id,
      key: licenseKey,
      type: type,
      expires_at: expirationDate.toISOString()
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: 'Failed to generate license' }, { status: 500 })
  }

  return NextResponse.json(license)
}

function generateLicenseKey(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

