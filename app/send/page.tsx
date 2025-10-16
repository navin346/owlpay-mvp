'use client'
import Header from '@/components/Header'
import { getProfile } from '../lib/store'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
export default function Send() {
  const router = useRouter()
  const [to, setTo] = useState(''); const [amount, setAmount] = useState(''); const [note, setNote] = useState('')
  useEffect(()=>{ const p=getProfile(); if(!p?.pin) router.push('/start'); if(p?.kyc!=='approved') router.push('/kyc') },[router])
  function submit(){
    if (!/^\+?\d{8,15}$/.test(to.replace(/\s/g,''))) return alert('Enter valid recipient phone (E.164)')
    if (!amount || Number(amount)<=0) return alert('Enter amount in USD')
    alert(`Demo: Sent $${amount} USDC to ${to}.\nSMS preview to recipient:\n"You’ve received $${amount} from ${getProfile()?.phone}. Download OwlPay to claim."`)
  }
  return (
    <main className="space-y-4 max-w-xl mx-auto">
      <Header />
      <div className="card space-y-3">
        <h2>Send</h2>
        <input className="input" placeholder="Recipient mobile (+1..., +91...)" value={to} onChange={e=>setTo(e.target.value)} />
        <input className="input" placeholder="Amount (USD)" value={amount} onChange={e=>setAmount(e.target.value.replace(/[^0-9.]/g,''))} />
        <input className="input" placeholder="Note (optional)" value={note} onChange={e=>setNote(e.target.value)} />
        <button className="btn-primary w-full" onClick={submit}>Send</button>
        <p className="text-xs text-zinc-500">Jurisdiction filters for unsupported regions should be added in production.</p>
      </div>
    </main>
  )
}
