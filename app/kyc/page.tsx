'use client'
import { getProfile, setProfile } from '../lib/store'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
export default function KYC() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState(''); const [firstName, setFirstName] = useState(''); const [lastName, setLastName] = useState('')
  const [country, setCountry] = useState('India'); const [dob, setDob] = useState('')
  const [docCountry, setDocCountry] = useState('India'); const [docType, setDocType] = useState('passport')
  useEffect(()=>{ const p=getProfile(); if(!p?.pin) router.push('/start') },[router])
  function saveProfile(){ const p=getProfile(); if(!p) return; setProfile({ ...p, email, firstName, lastName, country, dob, docCountry, docType, kyc: 'pending' }); setStep(4) }
  return (
    <main className="space-y-6 max-w-xl mx-auto">
      <div className="text-center mt-2"><h1>Verify your identity</h1><p className="text-zinc-400">Takes about 2 minutes</p></div>
      {step===1 && (<div className="card space-y-4"><h2>Profile details</h2>
        <input className="input" placeholder="First name" value={firstName} onChange={e=>setFirstName(e.target.value)} />
        <input className="input" placeholder="Last name" value={lastName} onChange={e=>setLastName(e.target.value)} />
        <select className="input" value={country} onChange={e=>setCountry(e.target.value)}><option>India</option><option>United States</option><option>Philippines</option></select>
        <input className="input" placeholder="Date of birth (YYYY-MM-DD)" value={dob} onChange={e=>setDob(e.target.value)} />
        <button className="btn-primary w-full" onClick={()=>setStep(2)}>Continue</button></div>)}
      {step===2 && (<div className="card space-y-4"><h2>Email verification</h2>
        <input className="input" placeholder="email@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
        <button className="btn-primary w-full" onClick={()=>setStep(3)}>Send verification code</button>
        <p className="text-xs text-zinc-500">For the MVP we simulate email OTP.</p></div>)}
      {step===3 && (<div className="card space-y-4"><h2>Document check</h2>
        <select className="input" value={docCountry} onChange={e=>setDocCountry(e.target.value)}><option>India</option><option>United States</option><option>Philippines</option></select>
        <select className="input" value={docType} onChange={e=>setDocType(e.target.value)}><option value="passport">Passport</option><option value="driver">Driver license</option><option value="id">ID card</option></select>
        <button className="btn-primary w-full" onClick={saveProfile}>Submit for review</button></div>)}
      {step===4 && (<div className="card space-y-3 text-center"><h2>KYC submitted</h2><p className="text-zinc-400">Status: <span className="font-semibold">pending</span></p>
        <div className="flex gap-3 justify-center">
          <button className="btn-secondary" onClick={()=>{ const p=getProfile(); if(!p) return; p.kyc='approved'; setProfile(p); router.push('/dashboard') }}>Mark Approved (demo)</button>
          <button className="btn-secondary" onClick={()=>{ const p=getProfile(); if(!p) return; p.kyc='rejected'; setProfile(p); router.push('/dashboard') }}>Mark Rejected (demo)</button>
        </div><p className="text-xs text-zinc-500">For demo, toggle status above.</p></div>)}
    </main>
  )
}
