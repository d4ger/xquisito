import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validar que el email esté presente
    if (!email) {
      return NextResponse.json(
        { error: 'Email es requerido' },
        { status: 400 }
      )
    }

    // Configurar el transporter de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password',
      },
    })

    // Email de notificación al admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: 'bryanruelas09@gmail.com',
      subject: `Nueva suscripción - Xquisito`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #14b8a6;">Nueva Suscripción - Xquisito</h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Nuevo Suscriptor:</h3>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            <p>Este mensaje fue enviado desde el formulario de suscripción de Xquisito.</p>
            <p>Fecha: ${new Date().toLocaleString('es-ES')}</p>
          </div>
        </div>
      `,
    }

    // Email de confirmación al usuario
    const userMailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email,
      subject: '¡Gracias por suscribirte a Xquisito!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px;">
            <h1 style="color: #14b8a6;">¡Bienvenido a Xquisito!</h1>
            
            <div style="background-color: #f8fafc; padding: 30px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #374151; margin-top: 0;">¡Gracias por suscribirte!</h2>
              <p style="color: #6b7280; font-size: 16px; line-height: 1.6;">
                Hemos recibido tu suscripción y te notificaremos tan pronto como Xquisito esté disponible.
              </p>
              <p style="color: #6b7280; font-size: 16px; line-height: 1.6;">
                Mientras tanto, mantente atento a tu bandeja de entrada para recibir actualizaciones exclusivas.
              </p>
            </div>
            
            <div style="background-color: #14b8a6; color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">¿Quieres una demostración?</h3>
              <p style="margin-bottom: 15px;">Si estás interesado en ver Xquisito en acción, no dudes en agendar una demo.</p>
            </div>
            
            <div style="color: #6b7280; font-size: 14px; margin-top: 30px;">
              <p>Equipo Xquisito</p>
              <p>Email: bryanruelas09@gmail.com</p>
            </div>
          </div>
        </div>
      `,
    }

    // Enviar ambos emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ])

    return NextResponse.json(
      { message: 'Suscripción registrada y emails enviados exitosamente' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error enviando emails de suscripción:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 