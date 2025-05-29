/**
 * Modelo de Usuario para MongoDB:
 *
 * Este archivo define el esquema y el modelo de usuario utilizando Mongoose.
 * El esquema incluye los campos:
 * - email:        Dirección de correo del usuario. Obligatorio.
 * - username:     Nombre de usuario público. Obligatorio.
 * - hash:         Hash de la contraseña para almacenamiento seguro. Obligatorio.
 * - uniqueString: Cadena única para verificación de cuenta (por ejemplo, token de activación). Opcional.
 * - isValid:      Indicador de si la cuenta está verificada. Opcional, por defecto false.
 *
 * Una vez definido el esquema, se exporta el modelo 'User' para poder usarlo en
 * cualquier parte de la aplicación (controladores, servicios, etc.).
 */
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true,
    },
    uniqueString: {
        type: String,
        required: false
    },
    isValid: {
        type: Boolean,
        required: false,
        default: false
    }
}) 

module.exports = mongoose.model('User', userSchema)