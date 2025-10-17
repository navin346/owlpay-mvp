'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function OtpPage() {
  const router = useRouter()
  const [otp, setOtp] = useState('')

  const handleVerify = () => {
    if (otp === '1234') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      router.push('/launch/kyc')
    } else {
      alert('Invalid OTP. Try 1234 for demo.')
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b0b0f] text-white">
      <h1 className="text-3xl font-bold mb-4">Verify OTP</h1>
      <p className="text-gray-400 mb-6">Enter the 4-digit OTP sent to your phone.</p>

      <input
        type="text"
        maxLength={4}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="1234"
        className="w-32 text-center text-2xl p-2 rounded-md border border-gray-600 bg-black text-white"
      />

      <button
        onClick={handleVerify}
        className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full font-semibold hover:scale-105 transition"
      >
        Verify
      </button>
    </main>
  )
}
