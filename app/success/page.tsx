'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default function SuccessPage() {
  const router = useRouter()

  useEffect(() => {
    const paymentId = localStorage.getItem('paymentId')
    if (paymentId) {
      router.push('/')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-amber-800 mb-4">Thank You for Your Donation!</h1>
        <p className="text-xl text-amber-700 mb-6">Your support helps us rescue and rehome Golden Retrievers in need.</p>
        <Button asChild>
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  )
}

