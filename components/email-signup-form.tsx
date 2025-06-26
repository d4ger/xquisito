"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface EmailSignupFormProps {
  onDemoClick: () => void
}

export function EmailSignupForm({ onDemoClick }: EmailSignupFormProps) {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email && !isLoading) {
      setIsLoading(true)
      
      try {
        // Enviar email al API endpoint
        const response = await fetch('/api/send-email-signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        })

        if (response.ok) {
          console.log("Email suscripción enviado:", email)
          setIsSubmitted(true)
          setEmail("")

          // Reset the success message after 3 seconds
          setTimeout(() => {
            setIsSubmitted(false)
          }, 3000)
        } else {
          console.error("Error enviando email de suscripción")
          // Aquí podrías mostrar un mensaje de error al usuario
        }
      } catch (error) {
        console.error("Error submitting email subscription:", error)
        // Aquí podrías mostrar un mensaje de error al usuario
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="w-full max-w-md mb-5 sm:mb-8 opacity-0 translate-y-5 animate-fade-in-up animation-delay-1000 px-3 sm:px-0">
      {isSubmitted ? (
        <div className="text-center p-3 sm:p-4 bg-teal-600/20 rounded-lg border border-teal-600/30">
          <p className="text-teal-400 font-medium text-sm sm:text-base">¡Gracias! Te notificaremos cuando estemos listos.</p>
        </div>
      ) : (
        <div>
          {/* Desktop layout: input + submit button in same row, demo button below */}
          <div className="hidden sm:block">
            <form onSubmit={handleSubmit} className="flex gap-3 mb-4">
              <Input
                type="email"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="flex-1 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500 h-auto text-base"
              />
              <Button 
                type="submit"
                disabled={isLoading}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 whitespace-nowrap h-auto text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed w-[140px]"
              >
                {isLoading ? "Enviando..." : "Notifícame"}
              </Button>
            </form>
            <div className="text-center">
              <Button
                variant="outline"
                className="bg-transparent border-teal-600 text-teal-400 hover:bg-teal-600 hover:text-white px-8 py-3 whitespace-nowrap h-auto text-base font-medium w-[140px]"
                onClick={onDemoClick}
              >
                Agenda un demo
              </Button>
            </div>
          </div>

          {/* Mobile layout: input on top, buttons side by side below */}
          <div className="block sm:hidden">
            <form onSubmit={handleSubmit} className="mb-3">
              <Input
                type="email"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500 h-11 text-base mb-3"
              />
              <div className="flex gap-3 justify-center">
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 whitespace-nowrap h-11 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed flex-1 max-w-[140px]"
                >
                  {isLoading ? "Enviando..." : "Notifícame"}
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-teal-600 text-teal-400 hover:bg-teal-600 hover:text-white px-4 py-2.5 whitespace-nowrap h-11 text-base font-medium flex-1 max-w-[140px]"
                  onClick={onDemoClick}
                >
                  Agenda un demo
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 