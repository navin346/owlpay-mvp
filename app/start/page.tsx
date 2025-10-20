'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BrandMark } from '../../components/BrandMark'
import { generateOTP, getProfile, setProfile } from '../lib/store'
import { useRouter } from 'next/navigation'
export default function Signup() {
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [theme, setTheme] = useState<'dark' | 'light'>('light')
  const router = useRouter()
  useEffect(() => {
    if (typeof window === 'undefined') return
    const isDark = document.documentElement.classList.contains('dark')
    setTheme(isDark ? 'dark' : 'light')
  }, [])
  const isDark = theme === 'dark'
  function sendOTP() {
    if (!/^\+?\d{8,15}$/.test(phone.replace(/\s/g,''))) { setError('Enter a valid mobile number with country code (e.g. +1..., +91...)'); return }
    const code = generateOTP(); alert(`Demo OTP (visible only in demo): ${code}`)
    const existing = getProfile() || { phone, kyc: 'none' }
    existing.phone = phone; setProfile(existing); router.push('/otp')
  }
  return (
    <main
      className={clsx(
        'min-h-screen',
        isDark
          ? 'bg-[#050509] text-white'
          : 'bg-gradient-to-br from-[#f7f8fc] via-[#eef2ff] to-[#f5f8ff] text-slate-900',
      )}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <BrandMark theme={theme} />
          <Link
            href="/"
            className={clsx(
              'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition',
              isDark
                ? 'border-white/10 bg-white/10 text-white/70 hover:border-white/20 hover:text-white'
                : 'border-slate-200/80 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900',
            )}
          >
            <span aria-hidden="true">←</span>
            Back to website
          </Link>
        </div>
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="text-center">
            <h1>Sign Up</h1>
            <p className={clsx('mt-2 text-sm', isDark ? 'text-white/70' : 'text-slate-500')}>
              Enter your mobile number to continue
            </p>
          </div>
          <div className="card space-y-4">
            <input
              className="input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 90000 00000"
              inputMode="tel"
              aria-label="Mobile number"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button className="btn-primary w-full" onClick={sendOTP}>
              Confirm
            </button>
            <p className={clsx('text-xs', isDark ? 'text-white/60' : 'text-slate-500')}>
              By registering, you accept our{' '}
              <Link href="/whitepaper" className="link">
                Terms
              </Link>{' '}
              and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
