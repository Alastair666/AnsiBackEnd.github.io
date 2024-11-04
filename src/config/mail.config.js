import config from './persistence.config'
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    service: config.email_service,
    port: config.email_port,
    auth: {
        user: config.email_auth_user,
        pass: config.email_auth_pass
    }
})
export default transport