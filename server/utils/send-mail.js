/**
 * Envia correos de confirmación de email a nuevos usuarios.
 *
 * Este módulo configura un transportador con Nodemailer utilizando credenciales
 * de Gmail, genera el contenido HTML del email a partir de una plantilla
 * (confirmation-email-template) y envía el mensaje al usuario.
 *
 * - email: dirección de correo del destinatario.
 * - uniqueString: token único para verificar la cuenta, integrado en la URL.
 *
 * Se emplea:
 * - process.env.EMAIL_ID / EMAIL_PASSWORD para la autenticación SMTP.
 * - process.env.FRONTEND_ENDPOINT como base de la URL de verificación.
 * - getTemplateHTML para generar el cuerpo HTML del correo.
 */
const nodemailer = require('nodemailer')
const getTemplateHTML = require('./confirmation-email-template')

const sendMail = (email, uniqueString) => {
    var Transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSWORD 
        }
    })

    var mailOptions
    let sender = "Agustín Álvarez Fijo"
    mailOptions = {
        from: sender,
        to: email,
        subject: "Email confirmation",
        html: getTemplateHTML(`${process.env.FRONTEND_ENDPOINT}/verify?id=${uniqueString}`)
    }
    
    Transport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log('Nodemailer:\n',error)
        } else {
            console.log("Nodemailer: Message Sent")
        }
    })

}

module.exports = sendMail