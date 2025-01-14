import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { licenseKey, hostname, ipAddress } = await request.json()
  const supabase = createRouteHandlerClient({ cookies })

  // Verify license
  const { data: license, error: licenseError } = await supabase
    .from('licenses')
    .select('*')
    .eq('key', licenseKey)
    .single()

  if (licenseError || !license) {
    return NextResponse.json({ error: 'Invalid license key' }, { status: 404 })
  }

  // Register computer
  const { data: computer, error: computerError } = await supabase
    .from('computers')
    .upsert({
      license_id: license.id,
      hostname,
      ip_address: ipAddress,
      last_seen: new Date().toISOString()
    }, {
      onConflict: 'license_id,hostname'
    })

  if (computerError) {
    return NextResponse.json({ error: 'Failed to register computer' }, { status: 500 })
  }

  return NextResponse.json({ valid: true, license, computer })
}

