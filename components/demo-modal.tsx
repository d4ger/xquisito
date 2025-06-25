"use client"

import type React from "react"

import { useState } from "react"
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
      <DialogContent className="sm:max-w-md bg-white text-black p-0 gap-0" showCloseButton={false}>
        {/* Custom close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>

        <div className="p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src="/xquisito-logo.png" alt="Logo Xquisito" className="w-16 h-16" />
          </div>

          {/* Title */}
          <DialogHeader className="text-center mb-6">
            <DialogTitle className="text-2xl font-bold text-gray-900">Solicita una reunión</DialogTitle>
          </DialogHeader>

          {/* Form */}
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">¡Solicitud enviada!</h3>
              <p className="text-gray-600">Nos pondremos en contacto contigo pronto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  className="w-full bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-teal-500 focus:ring-teal-500"
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
                  className="w-full bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-teal-500 focus:ring-teal-500"
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
                  rows={4}
                  className="w-full bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-teal-500 focus:ring-teal-500 resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 text-base font-medium"
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
