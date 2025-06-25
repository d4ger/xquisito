"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function EmailSignupForm() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [registeredEmails, setRegisteredEmails] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Verificar si el email ya está registrado
      if (!registeredEmails.includes(email)) {
        // Agregar el email al arreglo de emails registrados
        setRegisteredEmails(prev => [...prev, email])
        console.log("Email submitted:", email)
        console.log("Emails registrados:", [...registeredEmails, email])
        
        setIsSubmitted(true)
        setEmail("")

        // Reset the success message after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false)
        }, 3000)
      } else {
        // Si el email ya está registrado, mostrar mensaje diferente
        console.log("Email ya registrado:", email)
        setIsSubmitted(true)
        setEmail("")

        // Reset the success message after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false)
        }, 3000)
      }
    }
  }

  return (
    <div className="w-full max-w-md mb-8 opacity-0 translate-y-5 animate-fade-in-up animation-delay-1000">
      {isSubmitted ? (
        <div className="text-center p-4 bg-teal-600/20 rounded-lg border border-teal-600/30">
          <p className="text-teal-400 font-medium">¡Gracias! Te notificaremos cuando estemos listos.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Ingresa tu correo electrónico"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
            className="flex-1 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500"
          />
          <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2 whitespace-nowrap">
            Notifícame
          </Button>
        </form>
      )}
      
      {/* Mostrar la cantidad de emails registrados (opcional para debug) */}
      {registeredEmails.length > 0 && (
        <div className="mt-2 text-xs text-gray-500 text-center">
          {registeredEmails.length} email{registeredEmails.length !== 1 ? 's' : ''} registrado{registeredEmails.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
} 