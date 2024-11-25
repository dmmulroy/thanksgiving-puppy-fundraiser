'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'

const Confetti = dynamic(() => import('react-confetti'), { ssr: false })

export default function ConfettiWrapper() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const searchParams = useSearchParams()

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    
    const hasConfetti = searchParams.has('confetti')
    setShowConfetti(hasConfetti)

    if (hasConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000) // Stop confetti after 5 seconds
      return () => clearTimeout(timer)
    }
  }, [searchParams])

  if (!showConfetti) return null

  return (
    <Confetti
      width={windowSize.width}
      height={windowSize.height}
      recycle={false}
      numberOfPieces={200}
    />
  )
}

