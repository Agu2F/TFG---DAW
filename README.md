# Juego de Póquer Multijugador
- Un juego de póquer multijugador que utiliza WebSockets

- Implementado con la pila MERN (MongoDB, Express, React, NodeJS)

- Se utiliza Socket.io para proporcionar soporte de WebSocket

- Los usuarios pueden jugar entre sí usando códigos de sala o elegir hacer cola para emparejamiento automático

- Aunque el juego no necesita una base de datos, hemos implementado autenticación de usuarios mediante una API REST que requiere almacenar datos

- Usa patrones de autenticación con JWT; se implementaron Refresh Tokens y Access Tokens para proteger contra ataques XSS. Los tokens se almacenan en    cookies seguras y HttpOnly en lugar de LocalStorage para mayor protección

- Las contraseñas se hashean con la librería bcrypt antes de guardarse

- Se envía un correo de confirmación a los usuarios antes de activar su cuenta

## Demo en Vivo
Puedes probar el juego tú mismo abriéndolo en dos pestañas diferentes y haciendo clic en el botón Matchmaking: 
https://agustin-alvarez-fijo-poker-royale-tfg.netlify.app/

## Autor
Agustín Álvarez Fijo