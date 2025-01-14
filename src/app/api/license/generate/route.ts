import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { generateLicense } from '@/lib/licenceUtils'

export async function POST(request: Request) {
  const { userId, type } = await request.json()
  const supabase = createRouteHandlerClient({ cookies })

  const licenseKey = generateLicense(userId, type)

  const { data, error } = await supabase
    .from('licenses')
    .upsert({ user_id: userId, key: licenseKey, type })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: 'Failed to generate license key' }, { status: 500 })
  }

  return NextResponse.json({ licenseKey: data.key })
}

