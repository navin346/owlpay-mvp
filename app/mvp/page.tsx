'use client'

import clsx from 'clsx'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type FlowKey = 'new' | 'existing'

type Transaction = {
  id: string
  label: string
  amount: number
  currency: 'USD' | 'INR'
  detail: string
  channel: 'ach' | 'card' | 'transfer'
  time: string
}

type Contact = {
  name: string
  phone: string
  country: 'US' | 'IN'
  relationship: string
}

type NewUserState = {
  phone: string
  otpInput: string
  otpGenerated: string | null
  otpSent: boolean
  profile: {
    firstName: string
    lastName: string
    email: string
    country: string
    dob: string
  }
  kyc: {
    docCountry: string
    docType: 'passport' | 'driver' | 'id'
    status: 'idle' | 'pending' | 'approved' | 'rejected'
  }
  wallet: {
    balance: number
    fxRate: number
    limit: 'intro' | 'full'
    transactions: Transaction[]
    cards: { brand: 'Visa' | 'Mastercard'; last4: string; autopay: boolean }[]
  }
  send: {
    recipient: string
    amount: string
    note: string
    notification?: {
      channel: 'sms' | 'whatsapp'
      copy: string
    }
    error?: string
    successBanner?: string
  }
}

type ExistingUserState = {
  wallet: {
    balance: number
    fxRate: number
    transactions: Transaction[]
    cards: { brand: 'Visa' | 'Mastercard'; last4: string; autopay: boolean }[]
  }
  deposit: {
    method: 'ach' | 'card'
    amount: string
    estimation: string
    status?: 'idle' | 'processing' | 'completed'
  }
  send: {
    recipient: string
    amount: string
    note: string
    error?: string
    successBanner?: string
  }
  receive: {
    linkCopied: boolean
  }
}

type StepProps<State> = {
  state: State
  setState: React.Dispatch<React.SetStateAction<State>>
  goNext: () => void
  goPrev: () => void
}

type StepDefinition<State> = {
  id: string
  label: string
  blurb: string
  component: (props: StepProps<State>) => JSX.Element
}

const contactBook: Contact[] = [
  { name: 'Aanya Sharma', phone: '+91 98765 43210', country: 'IN', relationship: 'Family' },
  { name: 'Rohan Patel', phone: '+91 99888 11223', country: 'IN', relationship: 'Friend' },
  { name: 'Meera Kaur', phone: '+91 90345 66554', country: 'IN', relationship: 'Business' },
  { name: 'Daniel Cooper', phone: '+1 415 555 0198', country: 'US', relationship: 'Self' },
]

const newInitialState: NewUserState = {
  phone: '+1 415 555 0110',
  otpInput: '',
  otpGenerated: null,
  otpSent: false,
  profile: {
    firstName: 'Arjun',
    lastName: 'Menon',
    email: 'arjun.menon@owlpay.com',
    country: 'India',
    dob: '1995-08-24',
  },
  kyc: {
    docCountry: 'India',
    docType: 'passport',
    status: 'idle',
  },
  wallet: {
    balance: 10800,
    fxRate: 83.2,
    limit: 'intro',
    cards: [
      { brand: 'Visa', last4: '2562', autopay: true },
      { brand: 'Mastercard', last4: '4411', autopay: false },
    ],
    transactions: [
      {
        id: 'txn-1',
        label: 'Incoming payroll in USDC',
        amount: 520.9,
        currency: 'USD',
        detail: 'Today • 12:04 PM',
        channel: 'transfer',
        time: '12:04 PM',
      },
      {
        id: 'txn-2',
        label: 'Transfer to Aanya Sharma',
        amount: -140,
        currency: 'USD',
        detail: 'Today • 11:52 AM',
        channel: 'transfer',
        time: '11:52 AM',
      },
      {
        id: 'txn-3',
        label: 'Deposit via Visa •••• 2562',
        amount: 450,
        currency: 'USD',
        detail: 'Yesterday • 09:45 AM',
        channel: 'card',
        time: '09:45 AM',
      },
    ],
  },
  send: {
    recipient: '+91 90000 22111',
    amount: '5',
    note: 'Dinner with team',
  },
}

const existingInitialState: ExistingUserState = {
  wallet: {
    balance: 24560,
    fxRate: 82.8,
    cards: [
      { brand: 'Visa', last4: '7382', autopay: true },
      { brand: 'Mastercard', last4: '4411', autopay: false },
    ],
    transactions: [
      {
        id: 'ex-1',
        label: 'Payroll deposit',
        amount: 4200,
        currency: 'USD',
        detail: 'ACH via JP Morgan',
        channel: 'ach',
        time: '09:00 AM',
      },
      {
        id: 'ex-2',
        label: 'Transfer to Rohan Patel',
        amount: -3500,
        currency: 'USD',
        detail: 'Settled in ₹',
        channel: 'transfer',
        time: '08:24 AM',
      },
      {
        id: 'ex-3',
        label: 'Gasless fee',
        amount: -0.3,
        currency: 'USD',
        detail: 'Sponsored transaction',
        channel: 'transfer',
        time: '08:23 AM',
      },
    ],
  },
  deposit: {
    method: 'ach',
    amount: '2000',
    estimation: '₹165,600.00',
    status: 'idle',
  },
  send: {
    recipient: '+91 99888 11223',
    amount: '3500',
    note: 'Invoice OWL-448',
  },
  receive: {
    linkCopied: false,
  },
}

const gradientByFlow: Record<FlowKey, string> = {
  new: 'from-brand-500 via-ocean to-mint',
  existing: 'from-ocean via-mint to-brand-500',
}

const headingByFlow: Record<FlowKey, { title: string; intro: string }> = {
  new: {
    title: 'New user launch journey',
    intro:
      'Walk through onboarding an unverified customer from phone capture to first remittance with OwlPay. Each step mirrors the production workflow with validations, guardrails, and notifications.',
  },
  existing: {
    title: 'Returning customer workspace',
    intro:
      'Demonstrate how a verified customer jumps straight into high-limit remittances. Explore deposits, contact book payouts, and instant INR claim links.',
  },
}

const ThemeContext = createContext<'dark' | 'light'>('dark')

function useTheme() {
  return useContext(ThemeContext)
}

function formatCurrency(value: number, currency: 'USD' | 'INR' = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value)
}

function StepShell({
  title,
  description,
  children,
  accent,
}: {
  title: string
  description: string
  children: React.ReactNode
  accent: FlowKey
}) {
  const theme = useTheme()
  const isLight = theme === 'light'
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-3xl border p-6 shadow-[0_40px_80px_-45px_rgba(34,211,238,0.45)] backdrop-blur-xl transition-colors',
        isLight ? 'border-slate-200/70 bg-white/80 text-slate-800' : 'border-white/10 bg-white/10 text-white/80',
      )}
    >
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${gradientByFlow[accent]}`} />
      <div className="space-y-4">
        <header className="space-y-2">
          <h2 className={clsx('text-2xl font-semibold', isLight ? 'text-slate-900' : 'text-white')}>{title}</h2>
          <p className={clsx('text-sm', isLight ? 'text-slate-600' : 'text-white/70')}>{description}</p>
        </header>
        <div
          className={clsx(
            'rounded-2xl border p-5 shadow-inner transition-colors',
            isLight
              ? 'border-slate-200/70 bg-white text-slate-800'
              : 'border-white/5 bg-black/40 text-white shadow-black/40',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

const phoneRegex = /^\+?[0-9\s-]{8,16}$/

function PhoneCaptureStep({ state, setState, goNext }: StepProps<NewUserState>) {
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)

  function sendOtp() {
    if (!phoneRegex.test(state.phone)) {
      setError('Enter a valid international mobile number (E.164).')
      return
    }
    const generated = Math.floor(100000 + Math.random() * 900000).toString()
    setState((prev) => ({
      ...prev,
      otpGenerated: generated,
      otpSent: true,
      otpInput: '',
    }))
    setError(null)
    setInfo(`Demo OTP sent • Code ${generated}`)
  }

  function continueFlow() {
    if (!state.otpSent) {
      setError('Send an OTP to continue the onboarding.')
      return
    }
    goNext()
  }

  return (
    <StepShell
      accent="new"
      title="Enter mobile number"
      description="We localise formats for US ⇄ India and pre-validate before dispatching an OTP."
    >
      <div className="space-y-4">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-white/50">Mobile number</span>
          <input
            value={state.phone}
            onChange={(event) =>
              setState((prev) => ({ ...prev, phone: event.target.value }))
            }
            placeholder="+1 415 555 0110"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base font-medium text-white placeholder:text-white/40 focus:border-ocean focus:outline-none"
            inputMode="tel"
          />
        </label>
        {error && <p className="text-sm text-sunset">{error}</p>}
        {info && <p className="text-sm text-mint">{info}</p>}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <button
            onClick={sendOtp}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-brand-500 via-ocean to-mint px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_rgba(34,211,238,0.7)] transition hover:scale-[1.02]"
          >
            Send OTP
          </button>
          <button
            onClick={continueFlow}
            className="text-sm font-semibold text-white/70 underline decoration-dotted underline-offset-4 hover:text-white"
          >
            Continue →
          </button>
        </div>
        <p className="text-xs text-white/60">
          By registering you accept OwlPay&apos;s Terms and Privacy Policy. SMS delivery is powered by Twilio with fallback to WhatsApp.
        </p>
      </div>
    </StepShell>
  )
}

function OTPStep({ state, setState, goNext, goPrev }: StepProps<NewUserState>) {
  const [error, setError] = useState<string | null>(null)
  const codeHint = state.otpGenerated ?? '———'

  function verify() {
    if (!state.otpGenerated) {
      setError('Send a code first.')
      return
    }
    if (state.otpInput !== state.otpGenerated) {
      setError('Invalid code. Try again or resend.')
      return
    }
    setState((prev) => ({
      ...prev,
      otpGenerated: null,
      otpSent: true,
    }))
    setError(null)
    goNext()
  }

  return (
    <StepShell
      accent="new"
      title="Confirm OTP"
      description="A six digit code is generated instantly with auto-fill hints and two minute expiry."
    >
      <div className="space-y-5">
        <p className="text-sm text-white/60">
          Enter the code sent to <span className="font-semibold text-white">{state.phone}</span>.
        </p>
        <div className="flex gap-3">
          <input
            value={state.otpInput}
            onChange={(event) =>
              setState((prev) => ({
                ...prev,
                otpInput: event.target.value.replace(/[^0-9]/g, '').slice(0, 6),
              }))
            }
            placeholder="••••••"
            inputMode="numeric"
            className="flex-1 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-center text-2xl tracking-[0.5em] text-white focus:border-ocean focus:outline-none"
          />
          <div className="flex w-40 flex-col justify-between rounded-xl border border-mint/50 bg-mint/10 p-3 text-xs text-mint">
            <span className="font-semibold uppercase tracking-[0.3em] text-mint/80">Demo code</span>
            <span className="text-lg font-mono tracking-[0.4em] text-mint-100">{codeHint}</span>
            <span className="text-[10px] text-mint/70">Auto-clears after successful verification.</span>
          </div>
        </div>
        {error && <p className="text-sm text-sunset">{error}</p>}
        <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
          <button onClick={goPrev} className="underline decoration-dotted underline-offset-4 hover:text-white">
            ← Edit number
          </button>
          <button onClick={verify} className="font-semibold text-white hover:text-mint">
            Verify & continue
          </button>
          <span className="ml-auto text-xs uppercase tracking-[0.4em] text-white/40">02:00 timer</span>
        </div>
      </div>
    </StepShell>
  )
}

function ProfileStep({ state, setState, goNext, goPrev }: StepProps<NewUserState>) {
  const profile = state.profile
  const [error, setError] = useState<string | null>(null)

  function continueProfile() {
    if (!profile.firstName || !profile.lastName || !profile.email || !profile.dob) {
      setError('Complete all fields before continuing.')
      return
    }
    setError(null)
    goNext()
  }

  return (
    <StepShell
      accent="new"
      title="Capture profile information"
      description="Required for compliance in both the United States and India."
    >
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">First name</span>
            <input
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white focus:border-ocean focus:outline-none"
              value={profile.firstName}
              onChange={(event) =>
                setState((prev) => ({
                  ...prev,
                  profile: { ...prev.profile, firstName: event.target.value },
                }))
              }
              placeholder="Arjun"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">Last name</span>
            <input
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white focus:border-ocean focus:outline-none"
              value={profile.lastName}
              onChange={(event) =>
                setState((prev) => ({
                  ...prev,
                  profile: { ...prev.profile, lastName: event.target.value },
                }))
              }
              placeholder="Menon"
            />
          </label>
          <label className="space-y-2 text-sm md:col-span-2">
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">Email</span>
            <input
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white focus:border-ocean focus:outline-none"
              value={profile.email}
              onChange={(event) =>
                setState((prev) => ({
                  ...prev,
                  profile: { ...prev.profile, email: event.target.value },
                }))
              }
              placeholder="you@example.com"
              type="email"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">Country of residence</span>
            <select
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white focus:border-ocean focus:outline-none"
              value={profile.country}
              onChange={(event) =>
                setState((prev) => ({
                  ...prev,
                  profile: { ...prev.profile, country: event.target.value },
                }))
              }
            >
              <option value="India">India</option>
              <option value="United States">United States</option>
            </select>
          </label>
          <label className="space-y-2 text-sm">
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">Date of birth</span>
            <input
              type="date"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white focus:border-ocean focus:outline-none"
              value={profile.dob}
              onChange={(event) =>
                setState((prev) => ({
                  ...prev,
                  profile: { ...prev.profile, dob: event.target.value },
                }))
              }
            />
          </label>
        </div>
        {error && <p className="text-sm text-sunset">{error}</p>}
        <div className="flex items-center gap-3 text-sm text-white/60">
          <button onClick={goPrev} className="underline decoration-dotted underline-offset-4 hover:text-white">
            ← Back
          </button>
          <button onClick={continueProfile} className="font-semibold text-white hover:text-mint">
            Continue to KYC
          </button>
        </div>
      </div>
    </StepShell>
  )
}

function KYCCaptureStep({ state, setState, goNext, goPrev }: StepProps<NewUserState>) {
  const kyc = state.kyc
  const [info, setInfo] = useState<string | null>(null)

  function submit() {
    setState((prev) => ({
      ...prev,
      kyc: { ...prev.kyc, status: 'pending' },
    }))
    setInfo('Submitted for review — liveness and sanctions checks running.')
    goNext()
  }

  return (
    <StepShell
      accent="new"
      title="Document capture"
      description="We support passport, driver licence, or national ID with selfie and sanctions screening."
    >
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">Issuing country</span>
            <select
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white focus:border-ocean focus:outline-none"
              value={kyc.docCountry}
              onChange={(event) =>
                setState((prev) => ({
                  ...prev,
                  kyc: { ...prev.kyc, docCountry: event.target.value },
                }))
              }
            >
              <option value="India">India</option>
              <option value="United States">United States</option>
            </select>
          </label>
          <label className="space-y-2 text-sm">
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">Document type</span>
            <select
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white focus:border-ocean focus:outline-none"
              value={kyc.docType}
              onChange={(event) =>
                setState((prev) => ({
                  ...prev,
                  kyc: {
                    ...prev.kyc,
                    docType: event.target.value as NewUserState['kyc']['docType'],
                  },
                }))
              }
            >
              <option value="passport">Passport</option>
              <option value="driver">Driver licence</option>
              <option value="id">National ID</option>
            </select>
          </label>
        </div>
        <ul className="space-y-3 text-sm text-white/70">
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-mint" />
            Selfie liveness compared with passport photo in under 10 seconds.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-ocean" />
            OFAC, BIS, and Indian AML checks run asynchronously with retries.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-500" />
            Audit trail stored for 7 years per federal guidelines.
          </li>
        </ul>
        {info && <p className="text-sm text-mint">{info}</p>}
        <div className="flex items-center gap-3 text-sm text-white/60">
          <button onClick={goPrev} className="underline decoration-dotted underline-offset-4 hover:text-white">
            ← Back
          </button>
          <button onClick={submit} className="font-semibold text-white hover:text-mint">
            Submit for review
          </button>
        </div>
      </div>
    </StepShell>
  )
}
function KYCOutcomeStep({ state, setState, goNext, goPrev }: StepProps<NewUserState>) {
  const status = state.kyc.status

  function setStatus(next: 'approved' | 'rejected') {
    setState((prev) => ({
      ...prev,
      kyc: { ...prev.kyc, status: next },
      wallet: {
        ...prev.wallet,
        limit: next === 'approved' ? 'intro' : prev.wallet.limit,
      },
    }))
  }

  return (
    <StepShell
      accent="new"
      title="Review outcome"
      description="Compliance can approve instantly or request another upload."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-5 text-sm text-emerald-100">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">Approve</p>
          <h3 className="mt-2 text-lg font-semibold text-emerald-50">KYC approved</h3>
          <p className="mt-2 leading-relaxed">
            Unlock send limits to $10,000 after the first successful payout. Wallet access is available immediately.
          </p>
          <button
            className="mt-4 inline-flex items-center rounded-full border border-emerald-200/40 px-4 py-2 text-xs font-semibold tracking-[0.3em] text-emerald-50"
            onClick={() => {
              setStatus('approved')
              goNext()
            }}
          >
            Mark approved
          </button>
        </div>
        <div className="rounded-2xl border border-orange-400/40 bg-orange-500/10 p-5 text-sm text-orange-100">
          <p className="text-xs uppercase tracking-[0.3em] text-orange-200">Reject</p>
          <h3 className="mt-2 text-lg font-semibold text-orange-50">Needs attention</h3>
          <p className="mt-2 leading-relaxed">
            Surface actionable feedback (e.g. blur or mismatch) and allow the user to re-upload immediately.
          </p>
          <button
            className="mt-4 inline-flex items-center rounded-full border border-orange-200/40 px-4 py-2 text-xs font-semibold tracking-[0.3em] text-orange-50"
            onClick={() => setStatus('rejected')}
          >
            Flag for retry
          </button>
        </div>
        <div className="space-y-3 rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-white/70 md:col-span-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/40">
            Status timeline
            <span
              className={clsx(
                'h-2 w-2 rounded-full',
                status === 'approved' ? 'bg-mint' : status === 'rejected' ? 'bg-sunset' : 'bg-white/20',
              )}
            />
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {['Submitted', status === 'rejected' ? 'Retry requested' : 'Under review', status === 'approved' ? 'Approved' : 'Ready for retry'].map((label, index) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">{`T+${index * 2} min`}</p>
                <p className="mt-2 text-sm font-semibold text-white">{label}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-white/50">
            <button onClick={goPrev} className="underline decoration-dotted underline-offset-4 hover:text-white">
              ← Back
            </button>
            <button
              onClick={() => status === 'approved' && goNext()}
              className="rounded-full bg-white/10 px-4 py-2 font-semibold text-white/70 hover:bg-white/20"
            >
              Proceed to wallet
            </button>
          </div>
        </div>
      </div>
    </StepShell>
  )
}

function WalletOverviewStep({ state, goNext }: StepProps<NewUserState>) {
  const wallet = state.wallet

  return (
    <StepShell
      accent="new"
      title="Wallet home"
      description="Balance, cards on file, and quick actions for the newly verified customer."
    >
      <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
        <div className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Balance</p>
              <p className="mt-2 text-4xl font-bold text-white">{formatCurrency(wallet.balance, 'USD')}</p>
              <p className="text-xs text-white/50">USDC • Layer 2</p>
            </div>
            <div className="text-right text-xs text-white/60">
              <p>FX locked at ₹{wallet.fxRate}</p>
              <p>Limit: {wallet.limit === 'intro' ? '$5 first transfer' : '$10k per transfer'}</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {wallet.cards.map((card) => (
              <div key={card.last4} className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/70">
                <p className="text-sm font-semibold text-white">{card.brand} •••• {card.last4}</p>
                <p className="text-xs text-white/50">{card.autopay ? 'Instant autoload' : 'Manual top-up'}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3 text-sm font-semibold">
            {['Send', 'Deposit', 'Receive'].map((action, index) => (
              <button
                key={action}
                onClick={() => goNext()}
                className={clsx(
                  'rounded-2xl py-3 transition',
                  index === 0
                    ? 'bg-gradient-to-r from-sunset via-brand-500 to-ocean text-white shadow-[0_20px_45px_-18px_rgba(251,113,133,0.6)]'
                    : 'border border-white/10 bg-white/5 text-white hover:bg-white/10',
                )}
              >
                {action}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-6 text-sm text-white/70">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Timeline</p>
          <div className="space-y-3">
            {wallet.transactions.map((txn) => (
              <div key={txn.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <div>
                  <p className="font-medium text-white">{txn.label}</p>
                  <p className="text-xs text-white/50">{txn.detail}</p>
                </div>
                <span
                  className={clsx('font-semibold', txn.amount >= 0 ? 'text-mint' : 'text-sunset')}
                >
                  {formatCurrency(Math.abs(txn.amount), txn.currency)}
                </span>
              </div>
            ))}
          </div>
          <p className="rounded-xl border border-ocean/30 bg-ocean/10 px-4 py-3 text-xs text-ocean">
            Zero gas fees — OwlPay Paymaster sponsors Ethereum costs with USDC as gas.
          </p>
        </div>
      </div>
    </StepShell>
  )
}

function SendStep({ state, setState, goPrev }: StepProps<NewUserState>) {
  const { recipient, amount, note, notification, error, successBanner } = state.send
  const walletLimit = state.wallet.limit === 'intro' ? 5 : 10000

  function handleSend() {
    const numeric = Number(amount)
    if (!recipient || !phoneRegex.test(recipient)) {
      setState((prev) => ({
        ...prev,
        send: {
          ...prev.send,
          error: 'Enter a valid recipient mobile number with country code.',
          successBanner: undefined,
        },
      }))
      return
    }
    if (!numeric || numeric <= 0) {
      setState((prev) => ({
        ...prev,
        send: {
          ...prev.send,
          error: 'Add an amount greater than $0.',
          successBanner: undefined,
        },
      }))
      return
    }
    if (numeric > walletLimit) {
      setState((prev) => ({
        ...prev,
        send: {
          ...prev.send,
          error: `Limit is $${walletLimit.toLocaleString()} for this recipient right now.`,
          successBanner: undefined,
        },
      }))
      return
    }

    const notificationCopy = `You just received $${numeric.toFixed(2)} from ${state.phone}. Tap the link to create your OwlPay wallet and claim within 48 hours.`

    setState((prev) => ({
      ...prev,
      wallet: {
        ...prev.wallet,
        balance: Math.max(prev.wallet.balance - numeric, 0),
        limit: prev.wallet.limit === 'intro' ? 'full' : prev.wallet.limit,
        transactions: [
          {
            id: `txn-${Date.now()}`,
            label: `Transfer to ${recipient}`,
            amount: -numeric,
            currency: 'USD',
            detail: 'Demo transfer • instantly settled',
            channel: 'transfer',
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          },
          ...prev.wallet.transactions,
        ].slice(0, 6),
      },
      send: {
        recipient: prev.send.recipient,
        amount: '',
        note: '',
        notification: { channel: 'sms', copy: notificationCopy },
        error: undefined,
        successBanner: `Sent $${numeric.toFixed(2)} to ${recipient}. Intro limit unlocked to $10,000 for future payouts.`,
      },
    }))
  }

  function applyContact(contact: Contact) {
    setState((prev) => ({
      ...prev,
      send: {
        ...prev.send,
        recipient: contact.phone,
        note: `${contact.relationship} payout`,
        error: undefined,
      },
    }))
  }

  return (
    <StepShell
      accent="new"
      title="Send with guardrails"
      description="Supports contact book quick-fill and intro limits before unlocking $10k payouts."
    >
      <div className="grid gap-6 xl:grid-cols-[1.2fr,1fr]">
        <div className="space-y-4">
          <label className="space-y-2 text-sm">
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">Recipient mobile</span>
            <input
              value={recipient}
              onChange={(event) =>
                setState((prev) => ({
                  ...prev,
                  send: { ...prev.send, recipient: event.target.value, error: undefined },
                }))
              }
              placeholder="+91 90000 22111"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white focus:border-ocean focus:outline-none"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">Amount (USD)</span>
            <input
              value={amount}
              onChange={(event) =>
                setState((prev) => ({
                  ...prev,
                  send: {
                    ...prev.send,
                    amount: event.target.value.replace(/[^0-9.]/g, ''),
                    error: undefined,
                  },
                }))
              }
              placeholder="$5"
              inputMode="decimal"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white focus:border-ocean focus:outline-none"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">Note (optional)</span>
            <input
              value={note}
              onChange={(event) =>
                setState((prev) => ({
                  ...prev,
                  send: { ...prev.send, note: event.target.value },
                }))
              }
              placeholder="Dinner reimbursement"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white focus:border-ocean focus:outline-none"
            />
          </label>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-sunset/20 px-3 py-2 text-sunset">Intro limit • $5 to new recipients</span>
            <span className="rounded-full bg-mint/20 px-3 py-2 text-mint">After delivery • $10,000</span>
          </div>
          {error && <p className="text-sm text-sunset">{error}</p>}
          {successBanner && (
            <p className="rounded-xl border border-mint/40 bg-mint/10 px-4 py-3 text-sm text-mint">{successBanner}</p>
          )}
          <div className="flex items-center justify-between text-sm text-white/60">
            <button onClick={goPrev} className="underline decoration-dotted underline-offset-4 hover:text-white">
              ← Back to wallet
            </button>
            <button
              onClick={handleSend}
              className="rounded-xl bg-gradient-to-r from-sunset via-brand-500 to-ocean px-6 py-3 font-semibold text-white shadow-[0_22px_45px_-20px_rgba(251,113,133,0.6)]"
            >
              Send now
            </button>
          </div>
          {notification && (
            <div className="rounded-2xl border border-mint/40 bg-mint/10 p-4 text-sm text-mint">
              <p className="text-xs uppercase tracking-[0.3em] text-mint/80">Recipient notification</p>
              <p className="mt-2 leading-relaxed">“{notification.copy}”</p>
              <p className="mt-3 rounded-xl border border-mint/30 bg-black/30 px-4 py-2 text-xs text-mint/80">
                Delivered over SMS & WhatsApp with deep link into the mobile web app.
              </p>
            </div>
          )}
        </div>
        <aside className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-white/70">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Contact book</p>
          <div className="space-y-3">
            {contactBook.map((contact) => (
              <button
                key={contact.phone}
                onClick={() => applyContact(contact)}
                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-ocean hover:text-white"
              >
                <div>
                  <p className="font-semibold text-white">{contact.name}</p>
                  <p className="text-xs text-white/50">{contact.phone}</p>
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-white/40">{contact.country}</span>
              </button>
            ))}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/60">
            Payout links auto-expire in 48 hours. Recipients complete onboarding on their device with 30-second KYC.
          </div>
        </aside>
      </div>
    </StepShell>
  )
}

const newSteps: StepDefinition<NewUserState>[] = [
  {
    id: 'phone',
    label: 'Mobile',
    blurb: 'Collect number + send OTP',
    component: PhoneCaptureStep,
  },
  {
    id: 'otp',
    label: 'OTP',
    blurb: 'Verify code',
    component: OTPStep,
  },
  {
    id: 'profile',
    label: 'Profile',
    blurb: 'Personal info',
    component: ProfileStep,
  },
  {
    id: 'kyc-docs',
    label: 'Documents',
    blurb: 'Capture & submit',
    component: KYCCaptureStep,
  },
  {
    id: 'kyc-status',
    label: 'Review',
    blurb: 'Approve / retry',
    component: KYCOutcomeStep,
  },
  {
    id: 'wallet',
    label: 'Wallet',
    blurb: 'Balance + cards',
    component: (props) => <WalletOverviewStep {...props} goPrev={() => {}} />,
  },
  {
    id: 'send',
    label: 'Send',
    blurb: 'Transfer with guardrails',
    component: SendStep,
  },
]
function ExistingWalletStep({ state, goNext }: StepProps<ExistingUserState>) {
  const wallet = state.wallet

  return (
    <StepShell
      accent="existing"
      title="Wallet home"
      description="Returning users land on balance, quick actions, and FX insights."
    >
      <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
        <div className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Balance</p>
              <p className="mt-2 text-4xl font-bold text-white">{formatCurrency(wallet.balance, 'USD')}</p>
              <p className="text-xs text-white/50">USDC • Layer 2</p>
            </div>
            <div className="text-right text-xs text-white/60">
              <p>Live FX ₹{wallet.fxRate}</p>
              <p>Zero gas fees</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-sm font-semibold">
            {['Deposit', 'Send', 'Receive'].map((action, index) => (
              <button
                key={action}
                onClick={() => goNext()}
                className={clsx(
                  'rounded-2xl py-3 transition',
                  index === 0
                    ? 'bg-gradient-to-r from-ocean via-mint to-brand-500 text-white shadow-[0_18px_40px_-18px_rgba(34,211,238,0.7)]'
                    : 'border border-white/10 bg-white/5 text-white hover:bg-white/10',
                )}
              >
                {action}
              </button>
            ))}
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/70">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Cards on file</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {wallet.cards.map((card) => (
                <div key={card.last4} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-sm font-semibold text-white">{card.brand} •••• {card.last4}</p>
                  <p className="text-xs text-white/50">{card.autopay ? 'Instant autoload' : 'Manual top-up'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-6 text-sm text-white/70">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Recent activity</p>
          <div className="space-y-3">
            {wallet.transactions.map((txn) => (
              <div key={txn.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <div>
                  <p className="font-medium text-white">{txn.label}</p>
                  <p className="text-xs text-white/50">{txn.detail}</p>
                </div>
                <span className={clsx('font-semibold', txn.amount >= 0 ? 'text-mint' : 'text-sunset')}>
                  {formatCurrency(Math.abs(txn.amount), txn.currency)}
                </span>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-ocean/30 bg-ocean/10 px-4 py-3 text-xs text-ocean">
            Paymaster covers Ethereum fees — no gas deduction from the user.
          </div>
        </div>
      </div>
    </StepShell>
  )
}

function DepositStep({ state, setState, goPrev, goNext }: StepProps<ExistingUserState>) {
  const deposit = state.deposit
  const [info, setInfo] = useState<string | null>(null)
  const fxRate = state.wallet.fxRate

  function simulateDeposit() {
    if (!deposit.amount) {
      setInfo('Enter an amount to start the deposit flow.')
      return
    }
    setState((prev) => ({
      ...prev,
      deposit: { ...prev.deposit, status: 'processing' },
    }))
    setInfo('ACH initiated — funds settle in 2 minutes via Circle ramp.')
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        wallet: {
          ...prev.wallet,
          balance: prev.wallet.balance + Number(deposit.amount),
          transactions: [
            {
              id: `dep-${Date.now()}`,
              label: `${deposit.method.toUpperCase()} deposit`,
              amount: Number(deposit.amount),
              currency: 'USD',
              detail: 'Instant ramp completed',
              channel: deposit.method,
              time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            },
            ...prev.wallet.transactions,
          ].slice(0, 6),
        },
        deposit: {
          ...prev.deposit,
          status: 'completed',
          estimation:
            prev.deposit.amount && Number(prev.deposit.amount)
              ? formatCurrency(Number(prev.deposit.amount) * prev.wallet.fxRate, 'INR')
              : '',
        },
      }))
      setInfo('Deposit completed — wallet balance updated.')
    }, 1000)
  }

  return (
    <StepShell
      accent="existing"
      title="Deposit"
      description="Ramp via ACH or saved cards with instant INR estimation."
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="text-xs uppercase tracking-[0.3em] text-white/50">Amount (USD)</span>
              <input
                value={deposit.amount}
                onChange={(event) => {
                  const raw = event.target.value.replace(/[^0-9.]/g, '')
                  const numeric = raw ? Number(raw) : 0
                  setState((prev) => ({
                    ...prev,
                    deposit: {
                      ...prev.deposit,
                      amount: raw,
                      estimation: numeric ? formatCurrency(numeric * fxRate, 'INR') : '',
                      status: 'idle',
                    },
                  }))
                }}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white focus:border-ocean focus:outline-none"
                placeholder="2000"
                inputMode="decimal"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-xs uppercase tracking-[0.3em] text-white/50">Estimated INR</span>
              <input
                value={deposit.estimation}
                readOnly
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-base text-white"
              />
            </label>
          </div>
          <div className="flex gap-3 text-sm">
            {['ach', 'card'].map((method) => (
              <button
                key={method}
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    deposit: {
                      ...prev.deposit,
                      method: method as ExistingUserState['deposit']['method'],
                      status: 'idle',
                    },
                  }))
                }
                className={clsx(
                  'flex-1 rounded-xl border px-4 py-3 transition',
                  deposit.method === method
                    ? 'border-mint/60 bg-mint/10 text-white'
                    : 'border-white/10 bg-white/5 text-white/70 hover:text-white',
                )}
              >
                {method === 'ach' ? 'ACH • 0% fee' : 'Card • 1.2% fee'}
              </button>
            ))}
          </div>
          {info && <p className="text-sm text-mint">{info}</p>}
          <div className="flex items-center justify-between text-sm text-white/60">
            <button onClick={goPrev} className="underline decoration-dotted underline-offset-4 hover:text-white">
              ← Back
            </button>
            <button
              onClick={simulateDeposit}
              className="rounded-xl bg-gradient-to-r from-ocean via-mint to-brand-500 px-6 py-3 font-semibold text-white"
            >
              Start deposit
            </button>
          </div>
        </div>
        <div className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-white/70">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Method comparison</p>
          <div className="space-y-3">
            {[
              { label: 'ACH ramp', speed: 'Instant', fee: '0%', limits: '$25k/day' },
              { label: 'Card top up', speed: 'Instant', fee: '1.2%', limits: '$5k/day' },
            ].map((option) => (
              <div key={option.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white">{option.label}</p>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">{option.speed}</span>
                </div>
                <p className="mt-2 text-xs text-white/60">Fee {option.fee} • Limit {option.limits}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/60">
            INR estimate updates every second from XE feed. Locks for 60 seconds once user confirms.
          </div>
        </div>
      </div>
    </StepShell>
  )
}
function ExistingSendStep({ state, setState, goPrev, goNext }: StepProps<ExistingUserState>) {
  const { recipient, amount, note, error, successBanner } = state.send

  function sendMoney() {
    const numeric = Number(amount)
    if (!recipient || !phoneRegex.test(recipient)) {
      setState((prev) => ({
        ...prev,
        send: { ...prev.send, error: 'Enter a valid recipient number.', successBanner: undefined },
      }))
      return
    }
    if (!numeric || numeric <= 0) {
      setState((prev) => ({
        ...prev,
        send: { ...prev.send, error: 'Amount must be greater than $0.', successBanner: undefined },
      }))
      return
    }
    setState((prev) => ({
      ...prev,
      wallet: {
        ...prev.wallet,
        balance: Math.max(prev.wallet.balance - numeric, 0),
        transactions: [
          {
            id: `send-${Date.now()}`,
            label: `Transfer to ${recipient}`,
            amount: -numeric,
            currency: 'USD',
            detail: 'High-limit user • instant settlement',
            channel: 'transfer',
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          },
          ...prev.wallet.transactions,
        ].slice(0, 6),
      },
      send: {
        recipient,
        amount: '',
        note: '',
        error: undefined,
        successBanner: `Sent $${numeric.toFixed(2)} to ${recipient}. Recipient receives INR claim link immediately.`,
      },
    }))
    goNext()
  }

  function pickContact(contact: Contact) {
    setState((prev) => ({
      ...prev,
      send: { ...prev.send, recipient: contact.phone, note: `${contact.relationship} payout`, error: undefined },
    }))
  }

  return (
    <StepShell
      accent="existing"
      title="Send"
      description="Existing users can send up to $10k instantly with trusted contacts pre-filled."
    >
      <div className="grid gap-6 xl:grid-cols-[1.2fr,1fr]">
        <div className="space-y-4">
          <label className="space-y-2 text-sm">
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">Recipient</span>
            <input
              value={recipient}
              onChange={(event) =>
                setState((prev) => ({
                  ...prev,
                  send: { ...prev.send, recipient: event.target.value, error: undefined },
                }))
              }
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white focus:border-mint focus:outline-none"
              placeholder="+91 98765 43210"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">Amount (USD)</span>
            <input
              value={amount}
              onChange={(event) =>
                setState((prev) => ({
                  ...prev,
                  send: { ...prev.send, amount: event.target.value.replace(/[^0-9.]/g, ''), error: undefined },
                }))
              }
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white focus:border-mint focus:outline-none"
              placeholder="3500"
              inputMode="decimal"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">Note</span>
            <input
              value={note}
              onChange={(event) =>
                setState((prev) => ({
                  ...prev,
                  send: { ...prev.send, note: event.target.value },
                }))
              }
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white focus:border-mint focus:outline-none"
              placeholder="Invoice OWL-448"
            />
          </label>
          {error && <p className="text-sm text-sunset">{error}</p>}
          {successBanner && <p className="rounded-xl border border-mint/40 bg-mint/10 px-4 py-3 text-sm text-mint">{successBanner}</p>}
          <div className="flex items-center justify-between text-sm text-white/60">
            <button onClick={goPrev} className="underline decoration-dotted underline-offset-4 hover:text-white">
              ← Back
            </button>
            <button
              onClick={sendMoney}
              className="rounded-xl bg-gradient-to-r from-ocean via-mint to-brand-500 px-6 py-3 font-semibold text-white"
            >
              Send
            </button>
          </div>
        </div>
        <aside className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-white/70">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Suggested contacts</p>
          <div className="space-y-3">
            {contactBook.map((contact) => (
              <button
                key={contact.phone}
                onClick={() => pickContact(contact)}
                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-mint hover:text-white"
              >
                <div>
                  <p className="font-semibold text-white">{contact.name}</p>
                  <p className="text-xs text-white/50">{contact.phone}</p>
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-white/40">{contact.country}</span>
              </button>
            ))}
          </div>
          <div className="rounded-xl border border-mint/40 bg-mint/10 px-4 py-3 text-xs text-mint">
            WhatsApp and SMS claim links trigger immediately with pre-filled onboarding for the recipient.
          </div>
        </aside>
      </div>
    </StepShell>
  )
}

function ReceiveStep({ state, setState, goPrev }: StepProps<ExistingUserState>) {
  const { linkCopied } = state.receive

  function copyLink() {
    setState((prev) => ({
      ...prev,
      receive: { linkCopied: true },
    }))
  }

  return (
    <StepShell
      accent="existing"
      title="Receive"
      description="Generate INR wallet QR and shareable link for USDC off-ramps."
    >
      <div className="grid gap-6 md:grid-cols-[1.2fr,1fr]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Your INR wallet</p>
            <p className="mt-2 text-2xl font-semibold text-white">OWL-9934</p>
            <p className="text-sm text-white/60">Accept up to ₹10 lakh / day with instant FX lock.</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-white/70">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">QR mode</p>
                <p className="mt-2">Scan to claim in under 30 seconds.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-white/70">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Link mode</p>
                <p className="mt-2">Shareable deep link with WhatsApp preview.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-white/60">
            <button onClick={goPrev} className="underline decoration-dotted underline-offset-4 hover:text-white">
              ← Back
            </button>
            <button
              onClick={copyLink}
              className="rounded-xl bg-gradient-to-r from-ocean via-mint to-brand-500 px-6 py-3 font-semibold text-white"
            >
              {linkCopied ? 'Link copied!' : 'Copy receive link'}
            </button>
          </div>
        </div>
        <aside className="space-y-3 rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-white/70">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Link preview</p>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
            <p>
              “Claim ₹ instantly from OwlPay. Tap to authenticate with your Aadhaar-linked mobile number. Link expires in 48 hours.”
            </p>
          </div>
          <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/60">
            Supports bank transfers to HDFC, ICICI, SBI, and 20+ partners. Instant UPI credit for verified recipients.
          </p>
        </aside>
      </div>
    </StepShell>
  )
}

const existingSteps: StepDefinition<ExistingUserState>[] = [
  {
    id: 'wallet',
    label: 'Wallet',
    blurb: 'Balance overview',
    component: (props) => <ExistingWalletStep {...props} goPrev={() => {}} />,
  },
  {
    id: 'deposit',
    label: 'Deposit',
    blurb: 'Ramp funds',
    component: DepositStep,
  },
  {
    id: 'send',
    label: 'Send',
    blurb: 'High-limit transfer',
    component: ExistingSendStep,
  },
  {
    id: 'receive',
    label: 'Receive',
    blurb: 'Generate claim link',
    component: ReceiveStep,
  },
]
function StepRail<State>({
  flow,
  steps,
  activeIndex,
  setActiveIndex,
}: {
  flow: FlowKey
  steps: StepDefinition<State>[]
  activeIndex: number
  setActiveIndex: (index: number) => void
}) {
  const theme = useTheme()
  const isLight = theme === 'light'
  return (
    <div
      className={clsx(
        'rounded-3xl border p-6 text-sm transition-colors',
        isLight ? 'border-slate-200/80 bg-white/90 text-slate-600' : 'border-white/10 bg-white/5 text-white/70',
      )}
    >
      <p className={clsx('text-xs uppercase tracking-[0.3em]', isLight ? 'text-slate-400' : 'text-white/40')}>Journey</p>
      <ul className="mt-4 space-y-2">
        {steps.map((step, index) => {
          const active = index === activeIndex
          return (
            <li key={step.id}>
              <button
                onClick={() => setActiveIndex(index)}
                className={clsx(
                  'w-full rounded-2xl border px-4 py-3 text-left transition',
                  active
                    ? `border-transparent bg-gradient-to-r ${gradientByFlow[flow]} text-white shadow-[0_20px_45px_-25px_rgba(34,211,238,0.7)]`
                    : isLight
                    ? 'border-slate-200/80 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
                    : 'border-white/10 bg-black/40 text-white/60 hover:border-white/20 hover:text-white',
                )}
              >
                <p className={clsx('text-sm font-semibold', !active && isLight && 'text-slate-800')}>{step.label}</p>
                <p className={clsx('text-xs', isLight ? 'text-slate-500' : 'text-white/60')}>{step.blurb}</p>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function CrossBorderMVP() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [selectedFlow, setSelectedFlow] = useState<FlowKey>('new')
  const [newStepIndex, setNewStepIndex] = useState(0)
  const [existingStepIndex, setExistingStepIndex] = useState(0)
  const [newState, setNewState] = useState<NewUserState>(newInitialState)
  const [existingState, setExistingState] = useState<ExistingUserState>(existingInitialState)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem('mvp-theme') as 'dark' | 'light' | null
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('mvp-theme', theme)
    }
  }, [theme])

  const flowMeta = headingByFlow[selectedFlow]
  const { steps, state, setState, activeIndex, setActiveIndex } = useMemo(() => {
    if (selectedFlow === 'new') {
      return {
        steps: newSteps,
        state: newState,
        setState: setNewState,
        activeIndex: newStepIndex,
        setActiveIndex: setNewStepIndex,
      }
    }
    return {
      steps: existingSteps,
      state: existingState,
      setState: setExistingState,
      activeIndex: existingStepIndex,
      setActiveIndex: setExistingStepIndex,
    }
  }, [selectedFlow, newState, existingState, newStepIndex, existingStepIndex])

  const ActiveStep = steps[activeIndex]?.component
  const isLight = theme === 'light'

  return (
    <ThemeContext.Provider value={theme}>
      <main
        data-theme={theme}
        className={clsx(
          'relative min-h-screen overflow-hidden transition-colors',
          isLight ? 'mvp-theme-light bg-slate-100 text-slate-900' : 'mvp-theme-dark bg-[#050509] text-white',
        )}
      >
        <div className={clsx('pointer-events-none absolute inset-0', isLight ? 'opacity-60' : 'opacity-80')}>
          <div className="absolute -top-32 left-1/2 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_top,#8b5cf640,transparent_65%)] blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[460px] w-[460px] translate-x-[-30%] translate-y-[30%] rounded-full bg-[radial-gradient(circle_at_bottom,#22d3ee30,transparent_70%)] blur-3xl" />
          <div className="absolute bottom-[-20%] right-[-10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_bottom,#34d39930,transparent_70%)] blur-3xl" />
        </div>
        <section className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-24 pt-20">
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
                <h1 className="text-4xl font-semibold md:text-5xl">Cross-border payments MVP</h1>
                <p className="max-w-2xl text-base text-white/70">{flowMeta.intro}</p>
              </div>
              <button
                onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:border-white/30 hover:text-white"
              >
                {theme === 'dark' ? 'View in light mode' : 'View in dark mode'}
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {(Object.keys(headingByFlow) as FlowKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedFlow(key)}
                  className={clsx(
                    'rounded-full px-5 py-2 text-sm font-semibold transition',
                    selectedFlow === key
                      ? 'bg-gradient-to-r from-brand-500 via-ocean to-mint text-white shadow-[0_12px_30px_-12px_rgba(34,211,238,0.7)]'
                      : isLight
                      ? 'border border-slate-200/80 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
                      : 'border border-white/10 bg-white/5 text-white/60 hover:text-white',
                  )}
                >
                  {headingByFlow[key].title}
                </button>
              ))}
            </div>
          </header>
          <div className="grid gap-6 lg:grid-cols-[1fr,2fr]">
            <StepRail flow={selectedFlow} steps={steps} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
            <div className="space-y-6">
              {ActiveStep ? (
                <ActiveStep
                  state={state as never}
                  setState={setState as never}
                  goNext={() => setActiveIndex(Math.min(activeIndex + 1, steps.length - 1))}
                  goPrev={() => setActiveIndex(Math.max(activeIndex - 1, 0))}
                />
              ) : (
                <div
                  className={clsx(
                    'rounded-3xl border p-6 text-sm transition-colors',
                    isLight ? 'border-slate-200/80 bg-white/90 text-slate-600' : 'border-white/10 bg-white/5 text-white/70',
                  )}
                >
                  Select a step to preview the experience.
                </div>
              )}
            </div>
          </div>
          <footer
            className={clsx(
              'rounded-[32px] border p-8 text-sm transition-colors',
              isLight ? 'border-slate-200/80 bg-white/90 text-slate-600' : 'border-white/10 bg-white/5 text-white/70',
            )}
          >
            <p className={clsx('text-xs uppercase tracking-[0.3em]', isLight ? 'text-slate-400' : 'text-white/50')}>
              Deployment
            </p>
            <p className={clsx('mt-3 max-w-2xl leading-relaxed', isLight ? 'text-slate-600' : 'text-white/70')}>
              This MVP is optimised for a Vercel static deployment. All flows are front-end driven so you can demo onboarding,
              send limits, and payouts end-to-end without backend dependencies. Reload to reset the sandbox.
            </p>
          </footer>
        </section>
      </main>
    </ThemeContext.Provider>
  )
}
