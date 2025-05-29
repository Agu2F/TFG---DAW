/**
 * Genera una cadena aleatoria de caracteres alfanuméricos.
 *
 * Se utiliza para crear tokens únicos, por ejemplo, para verificación de cuentas
 * o generación de identificadores temporales.
 *
 * @param {number} length - Longitud deseada de la cadena resultante.
 * @returns {string} Cadena aleatoria compuesta por letras mayúsculas, minúsculas y dígitos.
 */
function randString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

module.exports = randString