'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function OtpPage() {
  const [otp, setOtp] = useState('')
  const router = useRouter()

  const verify = () => {
    if (otp === '1234') {
      // @ts-ignore
      router.push('/launch/kyc')
    } else {
      alert('Invalid OTP — use 1234 for demo.')
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b0b0f] text-white">
      <h1 className="text-3xl font-bold mb-4">Enter OTP</h1>
      <p className="text-gray-400 mb-6">Enter the 4-digit code sent to your phone.</p>

      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={4}
        className="text-center text-2xl bg-black border border-gray-600 p-2 rounded-md text-white w-32"
      />

      <button
        onClick={verify}
        className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full font-semibold hover:scale-105 transition"
      >
        Verify
      </button>
    </main>
  )
}
