import './globals.css'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'OwlPay — Cross-border Stablecoin Remittance',
  description: 'Stripe-level UX for US→India stablecoin remittances. Demo MVP.',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className="min-h-dvh"><div className="max-w-5xl mx-auto px-4 py-6">{children}</div></body></html>)
}
