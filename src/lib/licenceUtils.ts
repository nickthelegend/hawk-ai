import { supabase } from './supabase'
import { v4 as uuidv4 } from 'uuid'

export interface License {
  id: string
  user_id: string
  key: string
  type: 'individual' | 'enterprise'
  created_at: string
  expires_at: string
}

export async function generateLicense(userId: string, type: 'individual' | 'enterprise'): Promise<License | null> {
  const licenseKey = generateLicenseKey()
  const expirationDate = new Date()
  expirationDate.setFullYear(expirationDate.getFullYear() + 1) // License valid for 1 year

  const { data, error } = await supabase
    .from('licenses')
    .insert({
      id: uuidv4(),
      user_id: userId,
      key: licenseKey,
      type: type,
      created_at: new Date().toISOString(),
      expires_at: expirationDate.toISOString()
    })
    .select()
    .single()

  if (error) {
    console.error('Error generating license:', error)
    return null
  }

  return data
}

function generateLicenseKey(): string {
  return uuidv4().replace(/-/g, '').toUpperCase().slice(0, 16)
}

export async function getLicenseByUserId(userId: string): Promise<License | null> {
  const { data, error } = await supabase
    .from('licenses')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error('Error fetching license:', error)
    return null
  }

  return data
}

export async function verifyLicense(licenseKey: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('licenses')
    .select('*')
    .eq('key', licenseKey)
    .single()

  if (error || !data) {
    return false
  }

  const currentDate = new Date()
  const expirationDate = new Date(data.expires_at)

  return currentDate < expirationDate
}

