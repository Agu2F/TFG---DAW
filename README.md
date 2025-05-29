# Juego de Poker Multijugador

Un entorno de Poker en línea que aprovecha WebSockets para partidas en tiempo real.

---

## Tecnologías

- **Frontend:** React  
- **Backend:** Node.js con Express  
- **Base de datos:** MongoDB  
- **Comunicación en tiempo real:** Socket.io  

---

## Características

- **Partidas multijugador:**  
  - Crea o únete a salas mediante códigos únicos.  
  - Emparejamiento automático “Matchmaking” para conectarte con otro jugador sin necesidad de código.

- **Autenticación y seguridad:**  
  - API REST con autenticación JWT.  
  - Uso de Access Tokens y Refresh Tokens para mayor seguridad.  
  - Tokens almacenados en cookies seguras y HttpOnly.  
  - Contraseñas encriptadas con bcrypt antes de persistir en la base de datos.

- **Verificación de cuentas:**  
  - Envío automático de correo electrónico para confirmar la activación del usuario.

---

## Demo en Vivo

Prueba el juego en dos pestañas distintas y haz clic en **Matchmaking**:  
https://agustin-alvarez-fijo-poker-royale-tfg.netlify.app/

---

## Autor

Agustín Álvarez Fijo  
