"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DemoModal } from "@/components/demo-modal"
import { ComingSoonBanner } from "@/components/coming-soon-banner"
import { EmbersCanvas } from "@/components/embers-canvas"
import { CountdownTimer } from "@/components/countdown-timer"
import { EmailSignupForm } from "@/components/email-signup-form"
import { AnimatedLogo } from "@/components/animated-logo"
import { BackgroundElements } from "@/components/background-elements"

export default function ComingSoonPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ComingSoonBanner />
      
      {/* Canvas de brasas */}
      <EmbersCanvas />

      {/* Animated background elements */}
      <BackgroundElements />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-[38px]">
        {/* Logo with animations */}
        <AnimatedLogo />

        {/* Countdown */}
        <CountdownTimer />

        {/* Main heading with animation */}
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 max-w-4xl opacity-0 translate-y-5 animate-fade-in-up animation-delay-500">
          Revoluciona la experiencia en tu restaurante
        </h1>

        {/* Subtitle with animation */}
        <p className="text-lg md:text-xl text-gray-300 text-center mb-12 max-w-2xl opacity-0 translate-y-5 animate-fade-in-up animation-delay-1000">
          Pedidos sin fricción, pagos instantáneos y datos inteligentes.
        </p>

        {/* Email signup form with animation */}
        <EmailSignupForm />

        {/* Demo button with animation */}
        <Button
          variant="outline"
          className="bg-transparent border-teal-600 text-teal-400 hover:bg-teal-600 hover:text-white px-8 py-3 opacity-0 translate-y-5 animate-fade-in-up animation-delay-1000"
          onClick={() => setIsDemoModalOpen(true)}
        >
          Agenda un demo
        </Button>

        {/* Demo Modal */}
        <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
      </div>
    </div>
  )
}
