import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validar que los campos requeridos estén presentes
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      )
    }

    // Configurar el transporter de nodemailer
    // Nota: Para producción, estas credenciales deberían estar en variables de entorno
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com', // Email desde el cual se enviará
        pass: process.env.EMAIL_PASS || 'your-app-password',    // App password de Gmail
      },
    })

    // Contenido del email
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: 'bryanruelas09@gmail.com',
      subject: `Nueva solicitud de demo de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #14b8a6;">Nueva Solicitud de Demo - Xquisito</h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Datos del Cliente:</h3>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${message ? `<p><strong>Mensaje:</strong></p><p style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #14b8a6;">${message}</p>` : ''}
          </div>
          
          <div style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            <p>Este mensaje fue enviado desde el sitio web de Xquisito.</p>
            <p>Fecha: ${new Date().toLocaleString('es-ES')}</p>
          </div>
        </div>
      `,
    }

    // Enviar el email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Email enviado exitosamente' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error enviando email:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 