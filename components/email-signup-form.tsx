"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function EmailSignupForm() {
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
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Ingresa tu correo electrónico"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="flex-1 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500 h-11 sm:h-auto text-base"
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 whitespace-nowrap h-11 sm:h-auto text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed w-[140px] mx-auto"
          >
            {isLoading ? "Enviando..." : "Notifícame"}
          </Button>
        </form>
      )}
    </div>
  )
} 