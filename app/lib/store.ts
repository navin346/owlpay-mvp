'use client'
export type Profile = { phone: string; pin?: string; kyc: 'none'|'pending'|'approved'|'rejected';
  email?: string; firstName?: string; lastName?: string; country?: string; dob?: string;
  docCountry?: string; docType?: 'passport'|'driver'|'id' }
const KEY='owlpay_profile', OTP_KEY='owlpay_otp'
export function getProfile(){ if (typeof window==='undefined') return null; const r=localStorage.getItem(KEY); return r? JSON.parse(r): null }
export function setProfile(p:any){ localStorage.setItem(KEY, JSON.stringify(p)) }
export function clearProfile(){ localStorage.removeItem(KEY); localStorage.removeItem(OTP_KEY) }
export function generateOTP(){ const c=(Math.floor(100000+Math.random()*900000)).toString(); localStorage.setItem(OTP_KEY,c); return c }
export function verifyOTP(i:string){ return localStorage.getItem(OTP_KEY)===i }
