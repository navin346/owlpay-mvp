'use client'

import Link from 'next/link'
import { useMemo, useState, type ReactNode } from 'react'

type Screen = {
  id: string
  eyebrow: string
  title: string
  description: string
  accent: string
  content: ReactNode
}

type FlowKey = 'new' | 'existing'

const contactBook = [
  { name: 'Aanya Sharma', country: 'IN', phone: '+91 98765 43210' },
  { name: 'Rohan Patel', country: 'IN', phone: '+91 99888 11223' },
  { name: 'Meera Kaur', country: 'IN', phone: '+91 90345 66554' },
  { name: 'Daniel Cooper', country: 'US', phone: '+1 415 555 0198' },
]

const newUserScreens: Screen[] = [
  {
    id: 'mobile',
    eyebrow: 'Step 1',
    title: 'Capture mobile number to start onboarding',
    description:
      'Localized phone entry with US ↔︎ India presets. We validate E.164 formats before progressing to OTP.',
    accent: 'from-brand-500 via-ocean to-mint',
    content: (
      <div className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-6 shadow-card">
          <div className="flex items-center justify-between text-sm text-white/60">
            <span>Mobile number</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-widest text-white/70">
              <span role="img" aria-label="flag">
                🇺🇸
              </span>
              +1
            </span>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-3 text-sm">
              <span className="text-lg" role="img" aria-label="flag">
                🇮🇳
              </span>
              <span className="font-semibold text-white/80">+91</span>
            </div>
            <input
              className="flex-1 rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-lg font-medium text-white placeholder:text-white/30"
              value="+91 88882 06307"
              readOnly
            />
          </div>
        </div>
        <button className="w-full rounded-xl bg-gradient-to-r from-brand-500 via-ocean to-mint py-3 font-semibold text-white shadow-[0_15px_40px_-10px_rgba(34,211,238,0.6)]">
          Confirm number
        </button>
        <p className="text-center text-xs text-white/60">
          By registering, you accept our <span className="text-ocean">Terms</span> and <span className="text-ocean">Privacy Policy</span>.
        </p>
      </div>
    ),
  },
  {
    id: 'otp',
    eyebrow: 'Step 2',
    title: 'Deliver and verify OTP securely',
    description: 'A six-digit OTP is delivered instantly with auto-fill hints. Expiry timer and resend controls are included.',
    accent: 'from-ocean via-brand-500 to-mint',
    content: (
      <div className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
          <p className="text-sm text-white/70">Enter confirmation code sent to</p>
          <p className="mt-1 text-lg font-semibold text-white">+91 88882 06307</p>
          <div className="mt-6 flex gap-3">
            {[0, 2, 1, 6, 8, 4].map((digit, index) => (
              <div
                key={index}
                className="flex h-14 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-xl font-semibold text-white shadow-inner shadow-black/40"
              >
                {digit}
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between text-xs text-white/60">
            <span>02:00 remaining</span>
            <button className="text-ocean">Resend code</button>
          </div>
        </div>
        <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-6 text-sm text-emerald-100">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">SMS preview</p>
          <p className="mt-3 leading-relaxed">
            “OwlPay: Your verification code is <span className="font-semibold text-emerald-300">021684</span>. Do not share this with anyone.”
          </p>
          <div className="mt-5 rounded-xl border border-emerald-400/30 bg-black/30 px-4 py-3 text-xs text-emerald-200">
            Protected by Privy • Device binding enabled
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'profile',
    eyebrow: 'Step 3',
    title: 'Collect profile information',
    description: 'Capture mandatory fields with inline validation before KYC submission.',
    accent: 'from-brand-500 via-purple-500 to-ocean',
    content: (
      <div className="space-y-4">
        {[
          { label: 'First name', value: 'Arjun' },
          { label: 'Last name', value: 'Menon' },
          { label: 'Country of residence', value: 'India' },
          { label: 'Date of birth', value: '1995-08-24' },
          { label: 'Email', value: 'arjun.menon@owlpay.com' },
        ].map((field) => (
          <div key={field.label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-4">
            <p className="text-xs uppercase tracking-wide text-white/50">{field.label}</p>
            <p className="mt-2 text-lg font-semibold text-white">{field.value}</p>
          </div>
        ))}
        <button className="w-full rounded-xl border border-white/20 bg-white/10 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/20">
          Continue to KYC
        </button>
      </div>
    ),
  },
  {
    id: 'kyc-docs',
    eyebrow: 'Step 4',
    title: 'Document capture & verification',
    description: 'Users pick issuing country and document type. OCR & liveness happen in background.',
    accent: 'from-ocean via-mint to-brand-500',
    content: (
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-widest text-white/60">Issuing country</p>
          <div className="mt-3 flex items-center justify-between rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white">
            <span className="flex items-center gap-2">
              <span role="img" aria-label="flag" className="text-xl">
                🇮🇳
              </span>
              India
            </span>
            <span className="text-xs text-white/50">Change</span>
          </div>
          <p className="mt-6 text-xs uppercase tracking-widest text-white/60">Document type</p>
          <div className="mt-3 space-y-3">
            {['Passport', 'Driver license', 'ID card'].map((doc, index) => (
              <div
                key={doc}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition ${
                  index === 0 ? 'border-ocean/50 bg-ocean/15 text-white' : 'border-white/10 bg-black/40 text-white/70 hover:text-white'
                }`}
              >
                <span>{doc}</span>
                {index === 0 && <span className="text-xs uppercase tracking-[0.2em] text-ocean">Selected</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-black/50 via-black/10 to-white/5 p-5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Live capture checklist</p>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-mint"></span>
                <span>Front & back images validated in under 10 seconds.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-ocean"></span>
                <span>Liveness selfie compared with document portrait.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-500"></span>
                <span>Sanctions & watchlist checks run automatically.</span>
              </li>
            </ul>
          </div>
          <button className="mt-6 w-full rounded-xl bg-gradient-to-r from-brand-500 via-ocean to-mint py-3 text-sm font-semibold shadow-[0_15px_40px_-12px_rgba(139,92,246,0.8)]">
            Submit for review
          </button>
        </div>
      </div>
    ),
  },
  {
    id: 'kyc-status',
    eyebrow: 'Step 5',
    title: 'KYC outcomes with retry loop',
    description: 'Instantly surface the status and allow users to retry if documentation fails.',
    accent: 'from-mint via-ocean to-brand-500',
    content: (
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-5 text-emerald-50">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Approved</p>
          <h4 className="mt-3 text-lg font-semibold">Welcome to OwlPay</h4>
          <p className="mt-2 text-sm leading-relaxed text-emerald-100/80">
            Your documents are verified. You can now receive and send up to $10,000 instantly.
          </p>
          <button className="mt-4 rounded-full border border-emerald-200/50 bg-emerald-400/20 px-4 py-2 text-xs font-semibold tracking-wide text-emerald-50">
            Go to wallet
          </button>
        </div>
        <div className="rounded-2xl border border-orange-400/40 bg-orange-500/10 p-5 text-orange-50">
          <p className="text-xs uppercase tracking-[0.2em] text-orange-200">Needs attention</p>
          <h4 className="mt-3 text-lg font-semibold">Document blur detected</h4>
          <p className="mt-2 text-sm leading-relaxed text-orange-100/80">
            Re-upload your passport photo page to complete verification. We keep your data encrypted during review.
          </p>
          <button className="mt-4 rounded-full border border-orange-200/50 bg-orange-400/20 px-4 py-2 text-xs font-semibold tracking-wide text-orange-50">
            Try again
          </button>
        </div>
      </div>
    ),
  },
  {
    id: 'wallet-home',
    eyebrow: 'Step 6',
    title: 'Wallet home with card-on-file',
    description: 'Account balance, saved Visa / Mastercard and core actions are front-and-center for first-time users.',
    accent: 'from-brand-500 via-ocean to-purple-500',
    content: (
      <div className="grid gap-5 lg:grid-cols-[1.5fr,1fr]">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/0 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Balance</p>
              <p className="mt-2 text-4xl font-bold text-white">$10,800.00</p>
            </div>
            <div className="flex flex-col items-end text-xs text-white/60">
              <span>USDC • Layer 2</span>
              <span>FX locked at ₹83.2</span>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <div className="h-28 flex-1 rounded-3xl bg-gradient-to-br from-black/60 via-black/40 to-black/10 p-4">
              <p className="text-xs text-white/50">Linked card</p>
              <p className="mt-3 text-lg font-semibold text-white">Visa •••• 2562</p>
              <p className="mt-1 text-xs text-white/60">Autoload enabled</p>
            </div>
            <div className="h-28 flex-1 rounded-3xl border border-dashed border-white/20 p-4">
              <p className="text-xs text-white/40">Add Mastercard</p>
              <p className="mt-2 text-xs text-white/60">Tap to connect</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-sm font-semibold">
            {['Send', 'Deposit', 'Receive'].map((label, index) => (
              <button
                key={label}
                className={`rounded-2xl py-3 transition ${
                  index === 0
                    ? 'bg-gradient-to-r from-sunset/80 via-brand-500/80 to-ocean/80 text-white shadow-card'
                    : 'border border-white/15 bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/30 p-6 text-sm text-white/70">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Transaction timeline</p>
          <div className="space-y-4">
            {[
              { label: 'Incoming from USD payroll', amount: '+$520.90', time: 'Today • 12:04 PM' },
              { label: 'Transfer to Aanya Sharma', amount: '-$140.00', time: 'Today • 11:52 AM' },
              { label: 'Deposit via Visa •••• 2562', amount: '+$450.00', time: 'Yesterday • 09:45 AM' },
            ].map((txn) => (
              <div key={txn.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div>
                  <p className="font-medium text-white">{txn.label}</p>
                  <p className="text-xs text-white/50">{txn.time}</p>
                </div>
                <span className={txn.amount.startsWith('+') ? 'text-mint font-semibold' : 'text-sunset font-semibold'}>
                  {txn.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'send',
    eyebrow: 'Step 7',
    title: 'Send to a new contact with guardrails',
    description: 'Max $5 on first transfer, then unlock $10k after a successful delivery. Recipients receive an SMS or WhatsApp link to onboard.',
    accent: 'from-sunset via-brand-500 to-ocean',
    content: (
      <div className="grid gap-6 xl:grid-cols-[1.4fr,1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Send USDC</p>
          <div className="mt-4 grid gap-4 text-sm">
            <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4">
              <p className="text-xs text-white/50">Recipient mobile</p>
              <p className="mt-2 text-lg font-semibold text-white">+91 90000 22111</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4">
              <p className="text-xs text-white/50">Amount (USD)</p>
              <p className="mt-2 text-lg font-semibold text-white">$5.00</p>
            </div>
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="rounded-full bg-sunset/20 px-3 py-2 text-sunset">New recipient limit • $5</span>
              <span className="rounded-full bg-mint/20 px-3 py-2 text-mint">After first success • $10,000</span>
            </div>
          </div>
          <button className="mt-6 w-full rounded-xl bg-gradient-to-r from-sunset via-brand-500 to-ocean py-3 text-sm font-semibold shadow-[0_20px_45px_-15px_rgba(251,113,133,0.6)]">
            Review transfer
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-3xl border border-white/10 bg-black/40 p-5 text-sm text-white/70">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">Contact book</p>
            <div className="mt-3 space-y-3">
              {contactBook.map((contact) => (
                <div key={contact.phone} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div>
                    <p className="font-semibold text-white">{contact.name}</p>
                    <p className="text-xs text-white/50">{contact.phone}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/40">{contact.country}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-5 text-sm text-emerald-100">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Recipient notification</p>
            <p className="mt-3 leading-relaxed">
              “You just received <span className="font-semibold text-emerald-200">$5.00</span> from <span className="font-semibold text-emerald-200">+1 415 555 0198</span>. Tap the link to create your OwlPay wallet and claim within 48 hours.”
            </p>
            <p className="mt-4 rounded-xl border border-emerald-300/40 bg-black/30 px-4 py-3 text-xs">
              Delivered over SMS & WhatsApp with deep-link into mobile web app.
            </p>
          </div>
        </div>
      </div>
    ),
  },
]

const existingScreens: Screen[] = [
  {
    id: 'existing-wallet',
    eyebrow: 'Wallet home',
    title: 'Existing user dashboard',
    description: 'Returning users land directly on their wallet with quick actions and FX insights.',
    accent: 'from-brand-500 via-ocean to-mint',
    content: (
      <div className="grid gap-5 lg:grid-cols-[1.5fr,1fr]">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-black/40 via-black/10 to-white/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/50">Total balance</p>
              <p className="mt-2 text-4xl font-bold text-white">$24,560.00</p>
            </div>
            <div className="text-right text-xs text-white/60">
              <p>USDC • Layer 2</p>
              <p>Live FX ₹82.8</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-sm font-semibold">
            {['Deposit', 'Send', 'Receive'].map((label, index) => (
              <button
                key={label}
                className={`rounded-2xl py-3 transition ${
                  index === 0
                    ? 'bg-gradient-to-r from-ocean/80 via-mint/80 to-brand-500/80 text-white shadow-card'
                    : 'border border-white/15 bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/70">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">Cards on file</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {[
                { brand: 'Visa', last4: '7382', status: 'Instant autoload' },
                { brand: 'Mastercard', last4: '4411', status: 'Manual top-up' },
              ].map((card) => (
                <div key={card.last4} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-sm font-semibold text-white">{card.brand} •••• {card.last4}</p>
                  <p className="text-xs text-white/50">{card.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/30 p-6 text-sm text-white/70">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Recent activity</p>
          <div className="space-y-4">
            {[
              { label: 'Payroll deposit', amount: '+$4,200.00', detail: 'ACH via JP Morgan', positive: true },
              { label: 'Transfer to Rohan Patel', amount: '-$3,500.00', detail: 'Settled in ₹', positive: false },
              { label: 'Gasless fee', amount: '-$0.30', detail: 'Sponsored transaction', positive: false },
            ].map((txn) => (
              <div key={txn.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div>
                  <p className="font-medium text-white">{txn.label}</p>
                  <p className="text-xs text-white/50">{txn.detail}</p>
                </div>
                <span className={`${txn.positive ? 'text-mint' : 'text-sunset'} font-semibold`}>{txn.amount}</span>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-ocean/30 bg-ocean/10 px-4 py-3 text-xs text-ocean">
            Zero gas fees • Paymaster covers Ethereum costs using USDC-as-gas
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'existing-deposit',
    eyebrow: 'Deposit flows',
    title: 'Seamless deposits for US residents',
    description: 'Users can ramp via bank ACH or saved cards. Estimated INR value appears instantly.',
    accent: 'from-mint via-brand-500 to-ocean',
    content: (
      <div className="grid gap-5 lg:grid-cols-[1.2fr,1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Deposit amount</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-lg font-semibold text-white">
              $2,000.00
            </div>
            <div className="flex-1 rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-lg font-semibold text-white/80">
              ₹165,600.00
            </div>
          </div>
          <p className="mt-3 text-xs text-white/50">Live FX locked for 60 seconds.</p>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {[
              { title: 'ACH via JP Morgan', subtitle: 'Arrives in < 5 min', accent: 'bg-mint/20 text-mint' },
              { title: 'Visa •••• 7382', subtitle: 'Instant settlement', accent: 'bg-ocean/20 text-ocean' },
            ].map((method) => (
              <div key={method.title} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <p className="text-sm font-semibold text-white">{method.title}</p>
                <p className="text-xs text-white/50">{method.subtitle}</p>
                <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] ${method.accent}`}>
                  Preferred
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-black/30 p-6 text-sm text-white/70">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Settlement summary</p>
          <ul className="mt-4 space-y-3">
            {[
              'USDC minted to self-custody smart wallet',
              'Funds available instantly for India payouts',
              'Compliance receipts sent via email',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-mint"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <button className="mt-6 w-full rounded-xl bg-gradient-to-r from-mint via-ocean to-brand-500 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_-15px_rgba(52,211,153,0.6)]">
            Confirm deposit
          </button>
        </div>
      </div>
    ),
  },
  {
    id: 'existing-send',
    eyebrow: 'Send to India',
    title: 'High-limit transfers with saved contacts',
    description: 'Existing users can send up to $10,000 per transfer with instant INR availability for beneficiaries.',
    accent: 'from-brand-500 via-sunset to-ocean',
    content: (
      <div className="grid gap-6 xl:grid-cols-[1.4fr,1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Recipient</p>
          <div className="mt-3 flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-sm text-white/70">
            <div>
              <p className="text-lg font-semibold text-white">Rohan Patel</p>
              <p className="text-xs text-white/50">+91 99888 11223</p>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/50">Saved</span>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-lg font-semibold text-white">$7,500.00</div>
            <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-lg font-semibold text-white/80">₹620,625.00</div>
          </div>
          <p className="mt-3 text-xs text-white/50">Remaining daily limit: <span className="text-white">$2,500.00</span></p>
          <div className="mt-6 space-y-3">
            {[
              'Compliance cleared • Aadhaar verified',
              'Bank account auto-filled from contact book',
              'Recipient notified instantly with WhatsApp deep link',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-white/70">
                <span className="h-2.5 w-2.5 rounded-full bg-ocean"></span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full rounded-xl bg-gradient-to-r from-sunset via-brand-500 to-ocean py-3 text-sm font-semibold text-white shadow-[0_18px_45px_-12px_rgba(251,113,133,0.6)]">
            Send now
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-3xl border border-white/10 bg-black/30 p-5 text-sm text-white/70">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">Contact book</p>
            <div className="mt-3 space-y-3">
              {contactBook.map((contact) => (
                <div key={contact.phone} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div>
                    <p className="font-semibold text-white">{contact.name}</p>
                    <p className="text-xs text-white/50">{contact.phone}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/40">{contact.country}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-5 text-sm text-emerald-100">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">WhatsApp confirmation</p>
            <p className="mt-3 leading-relaxed">
              “OwlPay: <span className="font-semibold text-emerald-200">$7,500</span> is on its way from <span className="font-semibold text-emerald-200">Sarah Lee</span>. Claim to your INR wallet instantly.”
            </p>
          </div>
        </div>
      </div>
    ),
  },
]

const flows: Record<FlowKey, { label: string; blurb: string; screens: Screen[] }> = {
  new: {
    label: 'New user journey',
    blurb: 'Guided onboarding for first-time users moving money between the US and India.',
    screens: newUserScreens,
  },
  existing: {
    label: 'Existing user workspace',
    blurb: 'Returning users with verified KYC jump straight into high-limit remittances.',
    screens: existingScreens,
  },
}

function ScreenCard({ eyebrow, title, description, accent, content }: Screen) {
  return (
    <article className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#07070b]/90 p-7 shadow-[0_35px_80px_-40px_rgba(8,112,255,0.4)]">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />
      <div className="space-y-5">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">{eyebrow}</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60">{description}</p>
        </div>
        <div className="relative rounded-[24px] border border-white/5 bg-gradient-to-br from-white/5 via-white/2 to-transparent p-5">
          {content}
          <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-white/10"></div>
        </div>
      </div>
    </article>
  )
}

export default function CrossBorderMVP() {
  const [selectedFlow, setSelectedFlow] = useState<FlowKey>('new')
  const flow = useMemo(() => flows[selectedFlow], [selectedFlow])

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050509] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-32 left-1/2 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_top,#8b5cf640,transparent_65%)] blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-[460px] w-[460px] translate-x-[-30%] translate-y-[30%] rounded-full bg-[radial-gradient(circle_at_bottom,#22d3ee30,transparent_70%)] blur-3xl"></div>
        <div className="absolute bottom-[-20%] right-[-10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_bottom,#34d39930,transparent_70%)] blur-3xl"></div>
      </div>
      <section className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 px-6 pb-24 pt-20">
        <header className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="space-y-4">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/70">
                <span role="img" aria-label="us flag">
                  🇺🇸
                </span>
                US ⇄ India
                <span role="img" aria-label="india flag">
                  🇮🇳
                </span>
              </p>
              <h1 className="text-4xl font-semibold md:text-5xl">Cross-border Payments MVP</h1>
              <p className="max-w-2xl text-base text-white/70">
                Showcase flows for launching OwlPay’s compliant corridor between the United States and India. Toggle between the new
                user onboarding journey and the high-limit experience for returning customers.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 rounded-[32px] border border-white/10 bg-white/5 p-6 text-sm text-white/70 md:max-w-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">Quick links</p>
              <Link href="/start" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 via-ocean to-mint px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-[0_15px_40px_-12px_rgba(139,92,246,0.7)]">
                Try interactive demo →
              </Link>
              <Link href="/dashboard" className="text-xs uppercase tracking-[0.3em] text-white/60 underline decoration-dotted underline-offset-4">
                View dashboard prototype
              </Link>
              <Link href="/whitepaper" className="text-xs uppercase tracking-[0.3em] text-white/60 underline decoration-dotted underline-offset-4">
                Read the whitepaper
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {(Object.keys(flows) as FlowKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedFlow(key)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  selectedFlow === key
                    ? 'bg-gradient-to-r from-brand-500 via-ocean to-mint text-white shadow-[0_12px_30px_-12px_rgba(34,211,238,0.7)]'
                    : 'border border-white/10 bg-white/5 text-white/60 hover:text-white'
                }`}
              >
                {flows[key].label}
              </button>
            ))}
          </div>
          <p className="max-w-2xl text-sm text-white/60">{flow.blurb}</p>
        </header>
        <div className="grid gap-10 lg:grid-cols-2">
          {flow.screens.map((screen) => (
            <ScreenCard key={screen.id} {...screen} />
          ))}
        </div>
        <footer className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-sm text-white/70">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Deployment</p>
          <p className="mt-3 max-w-2xl leading-relaxed">
            This MVP is optimised for a Vercel static deployment. All flows are front-end driven so you can demo the onboarding and
            remittance experience instantly.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
            <span className="rounded-full border border-white/15 px-4 py-2">Stablecoins</span>
            <span className="rounded-full border border-white/15 px-4 py-2">Self-custody</span>
            <span className="rounded-full border border-white/15 px-4 py-2">KYC</span>
            <span className="rounded-full border border-white/15 px-4 py-2">Paymaster</span>
          </div>
        </footer>
      </section>
    </main>
  )
}
