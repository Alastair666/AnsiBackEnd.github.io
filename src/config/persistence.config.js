import dotenv from 'dotenv'

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: './src/settings.env' })

export default {
    persistence: process.env.PERSISTENCE,
    port: process.env.PORT,
    jwt_secret: process.env.JWT_SECRET,
    database: process.env.MONGODB_URI,
    sender: process.env.EMAIL_SENDER,
    attempts: process.env.ATTEMPTS,
    email_service: process.env.EMAIL_SERVICE,
    email_port: process.env.EMAIL_PORT,
    email_auth_user: process.env.EMAIL_AUTH_USER,
    email_auth_pass: process.env.EMAIL_AUTH_PASS,
    email_sender: process.env.EMAIL_SENDER
}