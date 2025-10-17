
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Signup() {
  const [phone, setPhone] = useState('')
  const router = useRouter()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b0b0f] text-white">
      <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
      <p className="text-gray-400 mb-6">Enter your mobile number (US/India)</p>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+1 555 555 5555"
        className="px-4 py-3 rounded-md bg-gray-800 border border-gray-700 w-72 text-center"
      />
      <button
        onClick={() => router.push('/launch/otp')}
        className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full font-semibold hover:scale-105 transition"
      >
        Get OTP
      </button>
    </main>
  )
}
