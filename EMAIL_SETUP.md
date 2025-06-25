# Configuración de Envío de Emails

## ¿Qué se implementó?

1. **API Endpoint**: `/api/send-demo` que recibe los datos del formulario y envía un email
2. **Componente actualizado**: `demo-modal.tsx` ahora envía los datos al API
3. **Email con formato**: Se envía un email con formato HTML a `bryanruelas09@gmail.com`

## Configuración requerida:

### 1. Crear archivo `.env.local` en la raíz del proyecto:

```env
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password-aqui
```

### 2. Para usar Gmail:

1. **Activar verificación en 2 pasos** en tu cuenta de Gmail
2. **Generar una App Password**:
   - Ve a tu cuenta de Google
   - Seguridad > Verificación en 2 pasos > Contraseñas de aplicaciones
   - Genera una nueva contraseña para "Correo"
   - Usa esa contraseña de 16 caracteres en `EMAIL_PASS`

### 3. Ejemplo de configuración:

```env
EMAIL_USER=bryanruelas09@gmail.com
EMAIL_PASS=abcdefghijklmnop
```

## ¿Cómo funciona?

1. Usuario llena el formulario en el modal
2. Al enviar, se hace una petición POST a `/api/send-demo`
3. El servidor envía un email a `bryanruelas09@gmail.com` con:
   - Nombre del cliente
   - Email del cliente
   - Mensaje (si lo proporcionó)
   - Fecha y hora del envío

## Formato del email que recibirás:

- **Asunto**: Nueva solicitud de demo de [Nombre]
- **Contenido**: Formato HTML con los datos del cliente
- **Estilo**: Colores de la marca Xquisito (teal)

## Para probar:

1. Configura las variables de entorno
2. Reinicia el servidor de desarrollo
3. Llena el formulario del demo
4. Verifica que llegue el email a bryanruelas09@gmail.com 