"use client"

import { useState, useEffect } from "react"

interface BackgroundElement {
  left: string;
  top: string;
  width: string;
  height: string;
  animationDelay: string;
  animationDuration: string;
}

export function BackgroundElements() {
  const [backgroundElements, setBackgroundElements] = useState<BackgroundElement[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Generate fewer background elements for mobile, more for desktop
    const isMobile = window.innerWidth < 768
    const elementCount = isMobile ? 8 : 20
    const maxSize = isMobile ? 60 : 100
    
    const elements = Array.from({ length: elementCount }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * maxSize + 20}px`,
      height: `${Math.random() * maxSize + 20}px`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${Math.random() * 3 + 2}s`,
    }))
    setBackgroundElements(elements)
  }, [])

  return (
    <div className="absolute inset-0">
      {isClient && backgroundElements.map((element, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-teal-500/10 animate-pulse"
          style={{
            left: element.left,
            top: element.top,
            width: element.width,
            height: element.height,
            animationDelay: element.animationDelay,
            animationDuration: element.animationDuration,
          }}
        />
      ))}
    </div>
  )
} 