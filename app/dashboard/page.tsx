'use client'
import Header from '@/components/Header'
import { getProfile } from '../lib/store'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
export default function Dashboard() {
  const router = useRouter()
  const [kyc, setKyc] = useState<'none'|'pending'|'approved'|'rejected'>('none')
  useEffect(()=>{ const p=getProfile(); if(!p?.pin) router.push('/start'); else setKyc(p.kyc) },[router])
  return (
    <main className="space-y-4 max-w-xl mx-auto">
      <Header />
      <div className="card">
        <div className="flex items-center justify-between">
          <div><h2>Balance</h2><div className="text-5xl font-bold mt-2">$0</div></div>
          <div className="w-44 h-28 rounded-2xl border border-zinc-800 flex items-center justify-center">Add Card</div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-6">
          <Link href={kyc==='approved'?'/receive':'/kyc'} className="btn-primary text-center">Receive</Link>
          <Link href={kyc==='approved'?'/send':'/kyc'} className="btn-secondary text-center">Send</Link>
        </div>
      </div>
      <div className="card"><h2>Transactions</h2><p className="text-zinc-500 mt-3">No transactions</p></div>
    </main>
  )
}
