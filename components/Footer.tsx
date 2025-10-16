export default function Footer(){
  return (
    <div className="text-xs text-zinc-500 mt-14 border-t border-zinc-800 pt-6">
      © {new Date().getFullYear()} OwlPay — Demo MVP. GENIUS-compliant stablecoins only. US on-ramp via Bridge (Stablecoin.xyz). INR off-ramp via CoinDCX for KYC’d users.
    </div>
  )
}
