'use client'
import { useEffect, useState } from 'react'
import { getProfile, setProfile } from '../lib/store'
import { useRouter } from 'next/navigation'
export default function PinPage() {
  const router = useRouter()
  const [pin, setPin] = useState('')
  useEffect(()=>{ const p=getProfile(); if(!p) router.push('/start') },[router])
  function save(){
    if (!/^\d{6}$/.test(pin)) return alert('PIN must be 6 digits')
    const p=getProfile(); if(!p) return router.push('/start'); p.pin=pin; setProfile(p); router.push('/dashboard')
  }
  return (
    <main className="space-y-8 max-w-md mx-auto">
      <div className="text-center mt-6">
        <h1>Input Your PIN</h1><p className="text-zinc-400 mt-2">Add a 6‑digit PIN for extra security.</p>
      </div>
      <div className="card space-y-4">
        <input className="input" value={pin} onChange={(e)=>setPin(e.target.value.replace(/\D/g,''))} placeholder="••••••" inputMode="numeric" maxLength={6} />
        <button className="btn-primary w-full" onClick={save}>Save PIN</button>
      </div>
    </main>
  )
}
