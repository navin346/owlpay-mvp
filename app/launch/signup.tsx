// @ts-nocheck
'use client'

import { useState } from 'react'

export default function SignupPage() {
  const [mobile, setMobile] = useState('')
  const [country, setCountry] = useState('+91')

  const handleContinue = () => {
    if (!mobile.trim()) {
      alert('Enter your phone number.')
      return
    }
    window.location.href = '/launch/otp'
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b0b0f] text-white px-6">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

      <div className="flex gap-2">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="bg-black border border-gray-600 p-2 rounded-md"
        >
          <option value="+91">🇮🇳 +91</option>
          <option value="+1">🇺🇸 +1</option>
        </select>
        <input
          type="tel"
          inputMode="numeric"
          placeholder="Enter mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="bg-black border border-gray-600 p-2 rounded-md text-white w-64"
        />
      </div>

      <button
        onClick={handleContinue}
        className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full font-semibold hover:scale-105 transition"
      >
        Continue
      </button>

      <p className="mt-4 text-xs text-gray-500">
        India (+91) or US (+1) mobiles only for this demo.
      </p>
    </main>
  )
}
