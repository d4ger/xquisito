"use client"

import { useState, useEffect } from "react"

interface RotatingTextProps {
  texts: string[]
  className?: string
  duration?: number
  pauseDuration?: number
}

export function RotatingText({ 
  texts, 
  className = "", 
  duration = 800, 
  pauseDuration = 2500 
}: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isSliding, setIsSliding] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      // Iniciar animación de salida
      setIsVisible(false)
      setIsSliding(true)
      
      // Después de la animación de fade out, cambiar el texto
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length)
        
        // Breve pausa antes de mostrar el nuevo texto
        setTimeout(() => {
          setIsVisible(true)
          setIsSliding(false)
        }, 150)
        
      }, duration / 2)
      
    }, duration + pauseDuration)

    return () => clearInterval(interval)
  }, [texts.length, duration, pauseDuration])

  return (
    <span className="relative inline-block min-h-[1.5em] align-middle">
      <span 
        className={`
          absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
          whitespace-nowrap
          transition-all duration-500 ease-in-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
          ${isSliding ? 'scale-95' : 'scale-100'}
          ${className}
        `}
      >
        {texts[currentIndex]}
      </span>
    </span>
  )
} 