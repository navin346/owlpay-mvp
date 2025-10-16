'use client'
import { useRouter } from 'next/navigation'
import { verifyOTP, getProfile, setProfile } from '../lib/store'
import { useState, useEffect } from 'react'
export default function OTPPage() {
  const router = useRouter()
  const [code, setCode] = useState(''); const [error, setError] = useState('')
  useEffect(()=>{ const p = getProfile(); if(!p) router.push('/start') },[router])
  function verify(){
    if (verifyOTP(code)) { const p=getProfile(); if(!p) return router.push('/start'); setProfile(p); router.push('/pin') }
    else setError('Invalid code. Try again.')
  }
  return (
    <main className="space-y-8 max-w-md mx-auto">
      <div className="text-center mt-6">
        <h1>Enter confirmation code</h1>
        <p className="text-zinc-400 mt-2">We sent a 6‑digit code to your phone.</p>
      </div>
      <div className="card space-y-4">
        <input className="input" value={code} onChange={(e)=>setCode(e.target.value)} placeholder="Enter 6‑digit OTP" inputMode="numeric" maxLength={6} />
        <button onClick={verify} className="btn-primary w-full">Continue</button>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
    </main>
  )
}
