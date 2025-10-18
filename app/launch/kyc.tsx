'use client'

import { useState } from 'react'

export default function KYCPage() {
  const [uploaded, setUploaded] = useState(false)
  const [scanning, setScanning] = useState(false)

  const handleUpload = () => {
    setUploaded(true)
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      window.location.href = '/launch/dashboard'
    }, 2000)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b0b0f] text-white px-6">
      <h1 className="text-3xl font-bold mb-6">KYC Verification</h1>
      {!uploaded ? (
        <button
          onClick={handleUpload}
          className="bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-3 rounded-full font-semibold"
        >
          Upload Document
        </button>
      ) : scanning ? (
        <p>Scanning document... 🔍</p>
      ) : (
        <p>KYC complete ✅ Redirecting...</p>
      )}
    </main>
  )
}
