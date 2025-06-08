/**
 * Genera una cadena aleatoria de caracteres alfanuméricos con alta entropía criptográfica.
 *
 * Se usa para crear tokens únicos, por ejemplo, para verificación de cuentas o identificadores temporales.
 * En lugar de Math.random(), se emplea crypto.randomBytes para garantizar valores verdaderamente aleatorios.
 *
 * @param {number} length - Longitud deseada de la cadena resultante.
 * @returns {string} Cadena aleatoria compuesta por letras mayúsculas, minúsculas y dígitos.
 */
const crypto = require('crypto');

function randString(length) {
  if (!Number.isInteger(length) || length <= 0) {
    throw new Error('La longitud debe ser un número entero positivo.');
  }

  // Conjunto de caracteres permitidos
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charsLen = chars.length;

  // Calcular cuántos bytes aleatorios necesitamos
  // Cada byte de crypto.randomBytes produce un valor entre 0 y 255.
  // Podemos extraer tantos índices válidos como sea posible por byte.
  const bytes = crypto.randomBytes(length);
  let result = '';

  for (let i = 0; i < length; i++) {
    // Convertir cada byte en un índice válido dentro de chars
    // módulo charsLen asegura que esté en el rango 0..charsLen-1
    const index = bytes[i] % charsLen;
    result += chars.charAt(index);
  }

  return result;
}

module.exports = randString;
