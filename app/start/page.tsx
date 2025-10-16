'use client'
import { useState } from 'react'
import { generateOTP, getProfile, setProfile } from '../lib/store'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
export default function Signup() {
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  function sendOTP() {
    if (!/^\+?\d{8,15}$/.test(phone.replace(/\s/g,''))) { setError('Enter a valid mobile number with country code (e.g. +1..., +91...)'); return }
    const code = generateOTP(); alert(`Demo OTP (visible only in demo): ${code}`)
    const existing = getProfile() || { phone, kyc: 'none' }
    existing.phone = phone; setProfile(existing); router.push('/otp')
  }
  return (
    <main className="space-y-8 max-w-md mx-auto">
      <div className="text-center mt-6">
        <h1>Sign Up</h1>
        <p className="text-zinc-400 mt-2">Enter your mobile number to continue</p>
      </div>
      <div className="card space-y-4">
        <input className="input" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="+91 90000 00000" inputMode="tel" aria-label="Mobile number" />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button className="btn-primary w-full" onClick={sendOTP}>Confirm</button>
        <p className="text-xs text-zinc-500">By registering, you accept our <Link href="/whitepaper" className="link">Terms</Link> and Privacy Policy.</p>
      </div>
    </main>
  )
}
