"use client"

import Image from "next/image"

export function AnimatedLogo() {
  return (
    <div className="mb-12">
      <Image
        src="/xquisito-logo.png"
        alt="Logo Xquisito"
        width={200}
        height={200}
        className="w-[200px] mb-10 mt-0 opacity-0 scale-85 animate-logo-fade-in"
      />
    </div>
  )
} 