'use client'
import Header from '@/components/Header'
import { getProfile } from '../lib/store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
export default function Receive() {
  const router = useRouter()
  useEffect(()=>{ const p=getProfile(); if(!p?.pin) router.push('/start'); if(p?.kyc!=='approved') router.push('/kyc') },[router])
  return (
    <main className="space-y-4 max-w-xl mx-auto">
      <Header />
      <div className="card space-y-3">
        <h2>Receive</h2>
        <p className="text-zinc-400">Share your phone number with the sender. US user can on‑ramp via Bridge (Stablecoin.xyz) and send USDC to your mobile‑linked wallet.</p>
        <div className="bg-zinc-800 rounded-xl p-3">Your ID: <span className="font-mono">{getProfile()?.phone}</span></div>
      </div>
    </main>
  )
}
