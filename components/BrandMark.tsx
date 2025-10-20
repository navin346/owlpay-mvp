import clsx from 'clsx'
import Link from 'next/link'

type BrandMarkProps = {
  theme?: 'light' | 'dark'
  className?: string
}

export function BrandMark({ theme = 'dark', className }: BrandMarkProps) {
  const textPrimary = theme === 'light' ? 'text-slate-900' : 'text-white'
  const textSecondary = theme === 'light' ? 'text-slate-500' : 'text-white/70'

  return (
    <Link
      href="/"
      aria-label="Return to OwlPe homepage"
      className={clsx('group inline-flex items-center gap-3', className)}
    >
      <span className="relative inline-flex h-10 w-10 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-500 via-ocean to-mint opacity-90 transition duration-300 group-hover:scale-105 group-hover:opacity-100" />
        <span className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-[90%] rotate-45 rounded-sm bg-white/80" />
        <span className="absolute -top-1 left-1/2 h-3 w-3 translate-x-[10%] -rotate-45 rounded-sm bg-white/80" />
        <span className="absolute left-[28%] top-[38%] h-3 w-3 rounded-full bg-white" />
        <span className="absolute right-[28%] top-[38%] h-3 w-3 rounded-full bg-white" />
        <span className="absolute left-[28%] top-[38%] h-1.5 w-1.5 rounded-full bg-slate-900/80" />
        <span className="absolute right-[28%] top-[38%] h-1.5 w-1.5 rounded-full bg-slate-900/80" />
        <span className="absolute bottom-[18%] left-1/2 h-1.5 w-6 -translate-x-1/2 rounded-full bg-white/70" />
      </span>
      <span className="leading-tight">
        <span className={clsx('block text-[0.65rem] uppercase tracking-[0.45em]', textSecondary)}>Owl</span>
        <span className={clsx('block text-base font-semibold', textPrimary)}>Pe</span>
      </span>
    </Link>
  )
}

export default BrandMark
