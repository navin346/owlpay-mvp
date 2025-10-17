
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function OTP() {
  const [otp, setOtp] = useState('')
  const router = useRouter()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b0b0f] text-white">
      <h2 className="text-3xl font-bold mb-4">Verify OTP</h2>
      <p className="text-gray-400 mb-6">Enter the 6-digit code sent to your phone</p>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="123456"
        className="px-4 py-3 rounded-md bg-gray-800 border border-gray-700 w-48 text-center"
      />
      <button
        onClick={() => router.push('/launch/kyc')}
        className="mt-6 px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full font-semibold hover:scale-105 transition"
      >
        Verify
      </button>
    </main>
  )
}
