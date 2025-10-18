'use client'

import { useState } from 'react'

export default function OTPPage() {
  const [otp, setOtp] = useState('')

  const verify = () => {
    if (otp === '1234') window.location.href = '/launch/kyc'
    else alert('Wrong OTP, try 1234')
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b0b0f] text-white px-6">
      <h1 className="text-3xl font-bold mb-6">Enter OTP</h1>
      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="bg-zinc-800 rounded px-3 py-2 text-center w-40"
        placeholder="1234"
      />
      <button
        onClick={verify}
        className="mt-6 bg-gradient-to-r from-teal-400 to-blue-500 px-8 py-3 rounded-full font-semibold"
      >
        Verify
      </button>
    </main>
  )
}
