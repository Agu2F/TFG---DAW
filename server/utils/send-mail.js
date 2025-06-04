// utils/send-mail.js

/**
 * Módulo para enviar correos de confirmación a nuevos usuarios.
 *
 * - Usa un único transportador Nodemailer configurado con Gmail.
 * - Genera el body HTML a partir de una plantilla externa.
 * - Permite asunto personalizado y maneja errores con async/await.
 *
 * Requiere en el entorno:
 *   - EMAIL_ID         (tu cuenta Gmail)
 *   - EMAIL_PASSWORD   (contraseña o App Password de Gmail)
 *   - FRONTEND_ENDPOINT  (URL base del front para montar el link de verificación)
 */

const nodemailer = require('nodemailer');
const getTemplateHTML = require('./confirmation-email-template');

// Validar que existan las credenciales necesarias
const { EMAIL_ID, EMAIL_PASSWORD, FRONTEND_ENDPOINT } = process.env;
if (!EMAIL_ID || !EMAIL_PASSWORD || !FRONTEND_ENDPOINT) {
  throw new Error(
    'Faltan variables de entorno para enviar correos (EMAIL_ID, EMAIL_PASSWORD o FRONTEND_ENDPOINT).'
  );
}

// 1) Crear y exportar un transportador único, para no reconectar cada vez
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL_ID,
    pass: EMAIL_PASSWORD,
  }
});

/**
 * sendMail: envía un correo de confirmación de email.
 *
 * @param {string} email         - Dirección de correo del destinatario.
 * @param {string} uniqueString  - Token único para verificar la cuenta.
 * @param {string} [subject]     - Asunto del correo (opcional).
 * @returns {Promise<void>}      - Resuelve si se envía correctamente o lanza error.
 */
async function sendMail(email, uniqueString, subject = 'Email Confirmation') {
  // 2) Construir la URL de verificación
  const verificationUrl = `${FRONTEND_ENDPOINT}/verify?id=${encodeURIComponent(uniqueString)}`;

  // 3) Obtener el HTML desde la plantilla
  const htmlBody = getTemplateHTML(verificationUrl);

  // 4) Definir opciones del correo
  const mailOptions = {
    from: `"Agustín Álvarez Fijo" <${EMAIL_ID}>`,
    to: email,
    subject,
    html: htmlBody
  };

  try {
    // 5) Enviar el correo y esperar respuesta
    const info = await transporter.sendMail(mailOptions);
    console.log(`Nodemailer: mensaje enviado a ${email} (id: ${info.messageId})`);
  } catch (err) {
    console.error('Nodemailer: error al enviar correo', err);
    // Re-lanzar para que el llamante pueda manejar el error
    throw err;
  }
}

module.exports = sendMail;
