/**
 * Genera una cadena aleatoria de letras mayúsculas.
 *
 * Se utiliza para crear identificadores o códigos alfanuméricos,
 * pero en esta versión únicamente emplea caracteres A–Z.
 *
 * @param {number} length - Longitud deseada de la cadena resultante.
 * @returns {string} Cadena aleatoria compuesta por letras mayúsculas.
 */
export default function makeid(length) {
    var result           = '';
    //var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
