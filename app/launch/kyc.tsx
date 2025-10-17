'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function KycPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleUpload = () => {
    if (!file) return alert('Please upload a KYC file (<10 MB).')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert('KYC verified successfully ✅')
      // @ts-ignore
      router.push('/launch/dashboard')
    }, 2000)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b0b0f] text-white">
      <h1 className="text-3xl font-bold mb-4">Upload KYC Documents</h1>
      <p className="text-gray-400 mb-6 text-center">
        Upload your Aadhaar & bank statement (for India) or SSN/ID (for US). Max 10 MB.
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
