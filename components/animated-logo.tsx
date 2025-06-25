"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function AnimatedLogo() {
  const [spinLeft, setSpinLeft] = useState(false)

  useEffect(() => {
    // Logo animation cycle
    const interval = setInterval(() => {
      setSpinLeft(prev => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, [])

  return (
    <div className="mb-12">
      <Image
        src="/xquisito-logo.png"
        alt="Logo Xquisito"
        width={200}
        height={200}
        className={`w-[200px] mb-10 mt-0 opacity-0 scale-85 ${
          spinLeft ? 'animate-logo-spin-left' : 'animate-logo-fade-in'
        }`}
      />
    </div>
  )
} 