'use client'
import { clearProfile, getProfile } from '@/app/lib/store'
import { useRouter } from 'next/navigation'

export default function Header(){
  const router = useRouter()
  const p = getProfile()
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-blue-500 flex items-center justify-center">🦉</div>
        <div className="text-xl font-semibold">OwlPay</div>
      </div>
      <div className="flex items-center gap-3 text-sm text-zinc-400">
        {p?.phone && <span>📱 {p.phone}</span>}
        <button onClick={()=>{ clearProfile(); router.push('/start') }} className="btn-secondary px-3 py-2 rounded-xl">
          Log out
        </button>
      </div>
    </div>
  )
}
