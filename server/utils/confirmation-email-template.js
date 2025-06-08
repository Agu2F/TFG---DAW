/**
 * Genera el HTML de la plantilla de correo para confirmación de email en Poker Royal.
 *
 * Esta función devuelve un string con el contenido completo de un documento HTML,
 * listo para ser enviado como cuerpo de un email. Incluye:
 * - Estilos inlining mínimos y compatibles con la mayoría de clientes de correo.
 * - Estructura semántica con <header>, <main> y <footer>.
 * - Botón de confirmación que apunta a la URL pasada como parámetro.
 *
 * @param {string} url - URL única de confirmación que el usuario deberá pulsar.
 * @returns {string} HTML completo de la plantilla de email.
 */
const getTemplateHTML = (url) => {
  // Escapar la URL para evitar problemas de inyección
  const safeUrl = encodeURI(url);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="x-ua-compatible" content="ie=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirmación de Email | Poker Royal</title>

  <!-- Tipografía recomendada: será cargada por el cliente si admite <link> en head -->
  <!-- <link href="https://fonts.googleapis.com/css?family=Orbitron:400,700&display=swap" rel="stylesheet" /> -->

  <style type="text/css">
    /* RESET BÁSICO PARA EMAILS */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-rspace: 0pt; mso-table-lspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    a[x-apple-data-detectors] { 
      font-family: inherit !important; 
      font-size: inherit !important; 
      font-weight: inherit !important; 
      line-height: inherit !important; 
      color: inherit !important; 
      text-decoration: none !important; 
    }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #1a1a1a; }
    table { border-collapse: collapse !important; width: 100%; }
    /* FIN RESET */

    /* TIPOGRAFÍA Y COLORES */
    :root {
      --color-bg: #1a1a1a;
      --color-foreground: #ffffff;
      --color-primary: #00ffff;
      --color-accent: #ff00ff;
      --font-stack: 'Orbitron', sans-serif;
    }

    body, p, td {
      color: var(--color-foreground);
      font-family: var(--font-stack), Arial, sans-serif;
      line-height: 1.5;
    }
    h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      line-height: 32px;
    }
    a {
      color: var(--color-primary);
      text-decoration: none;
    }
    /* FIN TIPOGRAFÍA */

    /* BOTÓN PRINCIPAL */
    .btn-confirm {
      display: inline-block;
      padding: 12px 28px;
      color: var(--color-bg);
      background-color: var(--color-primary);
      border-radius: 6px;
      font-size: 16px;
      font-weight: 700;
      text-decoration: none;
    }
    .btn-confirm:hover {
      background-color: var(--color-accent);
    }
    /* FIN BOTÓN */

    /* OCULTAR PREHEADER A VISTA DEL USUARIO */
    .preheader {
      display: none; 
      max-height: 0; 
      overflow: hidden; 
      font-size: 1px; 
      line-height: 1px; 
      color: #1a1a1a; 
      opacity: 0;
    }
  </style>
</head>
<body>
  <!-- PREHEADER (texto oculto) -->
  <div class="preheader">
    Confirma tu dirección de email para Poker Royal.
  </div>

  <!-- CONTENEDOR PRINCIPAL -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" bgcolor="var(--color-bg)" style="padding: 20px 0;">
        <!-- CONTENIDO CENTRAL -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px;">
          <!-- ENCABEZADO -->
          <tr>
            <td align="center" bgcolor="#0d0d0d" style="padding: 30px 24px 20px; border-radius: 8px 8px 0 0;">
              <h1>¡Bienvenido a Poker Royal!</h1>
            </td>
          </tr>
          <!-- MENSAJE PRINCIPAL -->
          <tr>
            <td align="left" bgcolor="#2b2b2b" style="padding: 24px; border-left: 1px solid #444; border-right: 1px solid #444;">
              <p style="margin: 0 0 16px;">
                Para completar tu registro y activar tu cuenta, haz clic en el siguiente botón:
              </p>
              <p style="margin: 0 0 24px; text-align: center;">
                <a href="${safeUrl}" target="_blank" class="btn-confirm" role="button" aria-label="Confirmar Email">
                  Confirmar Email
                </a>
              </p>
              <p style="margin: 0 0 16px;">
                Si el botón no funciona, copia y pega esta URL en tu navegador:
              </p>
              <p style="margin: 0; word-break: break-all;">
                <a href="${safeUrl}" target="_blank">${safeUrl}</a>
              </p>
            </td>
          </tr>
          <!-- PIE -->
          <tr>
            <td align="left" bgcolor="#0d0d0d" style="padding: 24px; border-radius: 0 0 8px 8px; border-top: 1px solid #444;">
              <p style="margin: 0 0 8px;">
                ¡Gracias por unirte a Poker Royal!<br>
                Si no solicitaste esta confirmación, puedes ignorar este correo.
              </p>
              <p style="margin: 0; font-size: 14px; color: #888;">
                © 2025 Poker Royal. Todos los derechos reservados.
              </p>
            </td>
          </tr>
        </table>
        <!-- FIN CONTENIDO CENTRAL -->
      </td>
    </tr>
  </table>
  <!-- FIN CONTENEDOR -->
</body>
</html>`;
};

module.exports = getTemplateHTML;
