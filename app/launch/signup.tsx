'use client'

import { useState } from 'react'

export default function SignupPage() {
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('+1')

  const handleNext = () => {
    if (phone.length < 6) return alert('Enter valid phone')
    window.location.href = '/launch/otp'
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b0b0f] text-white px-6">
      <h1 className="text-3xl font-bold mb-6">Sign-up</h1>
      <div className="flex items-center gap-2 mb-6">
        <select
          className="bg-zinc-800 rounded px-3 py-2"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="+1">+1 (US)</option>
          <option value="+91">+91 (IN)</option>
        </select>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="bg-zinc-800 rounded px-3 py-2 w-48"
          placeholder="Enter mobile number"
        />
      </div>
      <button
        onClick={handleNext}
        className="bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-3 rounded-full font-semibold"
      >
        Get OTP
      </button>
    </main>
  )
}
