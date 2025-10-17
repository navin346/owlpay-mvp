// @ts-nocheck
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function KycPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleUpload = () => {
    if (!file) {
      alert('Please upload a KYC file (<10 MB).')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('File too large. Keep it under 10 MB.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert('KYC verified successfully ✅')
      router.push('/launch/dashboard')
    }, 1600)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b0b0f] text-white px-6">
      <h1 className="text-3xl font-bold mb-2">KYC Verification</h1>
      <p className="text-gray-400 mb-6 text-center max-w-xl">
        Upload Aadhaar + bank statement (India) or SSN/ID (US). This demo accepts any image/PDF and simulates verification.
      </p>

      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="p-2 bg-black border border-gray-600 rounded-md"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-6 px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full font-semibold hover:scale-105 transition disabled:opacity-50"
      >
        {loading ? 'Scanning KYC…' : 'Upload & Verify'}
      </button>
    </main>
  )
}
