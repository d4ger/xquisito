"use client"

import { useState } from "react"
import { DemoModal } from "@/components/demo-modal"
import { ComingSoonBanner } from "@/components/coming-soon-banner"
import { EmbersCanvas } from "@/components/embers-canvas"
import { CountdownTimer } from "@/components/countdown-timer"
import { EmailSignupForm } from "@/components/email-signup-form"
import { AnimatedLogo } from "@/components/animated-logo"
import { BackgroundElements } from "@/components/background-elements"
import { RotatingText } from "@/components/rotating-text"

export default function ComingSoonPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)

  const rotatingTexts = [
    "Pedidos sin fricción",
    "Pagos instantáneos", 
    "Datos inteligentes"
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ComingSoonBanner />
      
      {/* Canvas de brasas */}
      <EmbersCanvas />

      {/* Animated background elements */}
      <BackgroundElements />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-3 sm:px-6 lg:px-4 pt-[34px] sm:pt-[40px] pb-4 sm:pb-0">
        {/* Logo with animations */}
        <AnimatedLogo />

        {/* Countdown */}
        <CountdownTimer />

        {/* Main heading with animation */}
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-light text-center mb-3 sm:mb-6 max-w-4xl opacity-0 translate-y-5 animate-fade-in-up animation-delay-500 px-1 sm:px-0 leading-tight">
          Revoluciona la experiencia en tu restaurante
        </h1>

        {/* Animated subtitle with rotating text */}
        <p className="text-base sm:text-lg md:text-xl font-thin text-gray-300 text-center mb-6 sm:mb-12 max-w-2xl opacity-0 translate-y-5 animate-fade-in-up animation-delay-1000 px-3 sm:px-0">
          <RotatingText 
            texts={rotatingTexts}
            duration={700}
            pauseDuration={2800}
            className="text-teal-400 font-medium"
          />
        </p>

        {/* Email signup form with animation */}
        <EmailSignupForm onDemoClick={() => setIsDemoModalOpen(true)} />

        {/* Demo Modal */}
        <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />

        {/* Espaciado adicional para móviles */}
        <div className="h-6 sm:h-0"></div>
      </div>
    </div>
  )
}
