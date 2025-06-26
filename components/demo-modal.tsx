"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email) {
      try {
        // Enviar datos al API endpoint
        const response = await fetch('/api/send-demo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          console.log("Demo request submitted and email sent:", formData)
          setIsSubmitted(true)

          // Reset form and close modal after 3 seconds
          setTimeout(() => {
            setIsSubmitted(false)
            setFormData({ name: "", email: "", message: "" })
            onClose()
          }, 3000)
        } else {
          console.error("Error sending email")
          // Aquí podrías mostrar un mensaje de error al usuario
        }
      } catch (error) {
        console.error("Error submitting demo request:", error)
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-[95vw] max-w-[425px] bg-white text-black p-0 gap-0 max-h-[90vh] overflow-y-auto" showCloseButton={false}>
        {/* Custom close button */}
        <button
          onClick={onClose}
          className="absolute right-3 sm:right-4 top-3 sm:top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="sr-only">Close</span>
        </button>

        <div className="p-4 sm:p-8">
          {/* Logo */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <Image src="/xquisito-logo.png" alt="Logo Xquisito" width={64} height={64} className="w-12 h-12 sm:w-16 sm:h-16" />
          </div>

          {/* Title */}
          <DialogHeader className="text-center mb-4 sm:mb-6">
            <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900">Solicita una reunión</DialogTitle>
          </DialogHeader>

          {/* Form */}
          {isSubmitted ? (
            <div className="text-center py-4 sm:py-8">
              <div className="mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">¡Solicitud enviada!</h3>
              <p className="text-sm sm:text-base text-gray-600">Nos pondremos en contacto contigo pronto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <Label htmlFor="name" className="sr-only">
                  Nombre completo
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nombre completo"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  className="w-full bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-teal-500 focus:ring-teal-500 h-10 sm:h-11"
                />
              </div>

              <div>
                <Label htmlFor="email" className="sr-only">
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="w-full bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-teal-500 focus:ring-teal-500 h-10 sm:h-11"
                />
              </div>

              <div>
                <Label htmlFor="message" className="sr-only">
                  Mensaje (opcional)
                </Label>
                <Textarea
                  id="message"
                  placeholder="Mensaje (opcional)"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  rows={3}
                  className="w-full bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-teal-500 focus:ring-teal-500 resize-none min-h-[80px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2.5 sm:py-3 text-sm sm:text-base font-medium"
              >
                Enviar solicitud
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
