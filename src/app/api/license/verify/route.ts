import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { licenseKey } = await request.json()
  const supabase = createRouteHandlerClient({ cookies })

  const { data, error } = await supabase
    .from('licenses')
    .select('*')
    .eq('key', licenseKey)
    .single()

  if (error) {
    return NextResponse.json({ error: 'License verification failed' }, { status: 400 })
  }

  if (!data) {
    return NextResponse.json({ error: 'Invalid license key' }, { status: 404 })
  }

  return NextResponse.json({ valid: true, data })
}

