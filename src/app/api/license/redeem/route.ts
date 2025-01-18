import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import crypto from 'crypto';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

function generateAccessKey(): string {
  return crypto.randomBytes(16).toString('hex');
}

export async function POST(request: Request) {
  const { licenseKey, hostname, ipAddress } = await request.json()

  // Verify license
  const { data: license, error: licenseError } = await supabase
    .from('licenses')
    .select('*')
    .eq('key', licenseKey)
    .single()

  if (licenseError || !license) {
    return NextResponse.json({ error: 'Invalid license key' }, { status: 404 })
  }

  // Generate access key
  const accessKey = generateAccessKey();

  // Register computer with access key
  const { data: computer, error: computerError } = await supabase
    .from('computers')
    .upsert({
      license_id: license.id,
      hostname,
      ip_address: ipAddress,
      last_seen: new Date().toISOString(),
      access_key: accessKey
    })

  if (computerError) {
    console.log(computerError)
    return NextResponse.json({ error: 'Failed to register computer' }, { status: 500 })
  }

  return NextResponse.json({ valid: true, license, computer, accessKey })
}

