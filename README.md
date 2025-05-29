# Poker Royal

**Juego de Póker 1vs1 en Tiempo Real**

---

## Descripción

Poker Royal es una plataforma full-stack para partidas de póker uno contra uno, desarrollada con tecnologías JavaScript: React en el frontend y Node.js con Express en el backend. La comunicación en tiempo real se gestiona mediante Socket.io, y los usuarios se autentican con JWT para garantizar seguridad. Los datos se almacenan en MongoDB Atlas.

---

## Características

* **Matchmaking 1vs1** por WebSockets (Socket.io)
* **Registro** y **login** con JWT
* **Verificación de cuenta** vía correo electrónico
* **Salas privadas** por código
* **Notificaciones** de turno y resultados en tiempo real
* **Responsive**: Compatible con escritorio y móvil
* **Pruebas** unitarias e integración con Jest y Supertest

---

## Arquitectura del Proyecto

```
poker-royal/
├── client/             # Aplicación React (frontend)
├── server/             # API REST y Socket.io (backend)
├── docs/               # Documentación adicional y diagramas UML
└── README.md           # Este archivo
```

---

## Tecnologías

* **Frontend:** React, Create React App, Tailwind CSS, Socket.io-client, Context API/Hooks
* **Backend:** Node.js, Express, Socket.io, Mongoose (MongoDB Atlas)
* **Autenticación:** JSON Web Tokens (JWT)
* **Correo:** Servicio SMTP para verificación de usuarios
* **Despliegue:** Netlify (frontend) y Heroku/DigitalOcean/AWS (backend)
* **Pruebas:** Jest, Supertest

---

## Instalación

### Prerrequisitos

* Node.js ≥ 16
* npm o yarn
* Cuenta en MongoDB Atlas (o MongoDB local)
* Credenciales SMTP (Mailtrap, SendGrid, etc.)

### Clonar repositorio

```bash
git clone https://github.com/agustin-alvarez-fijo/poker-royal.git
cd poker-royal
```

### Backend

```bash
cd server
npm install        
cp .env.example .env
# Edita .env con tus valores:
# PORT, MONGO_URI, JWT_SECRET, EMAIL_USER, EMAIL_PASS, CLIENT_URL
npm run dev        # o yarn dev
```

El servidor se ejecutará en [http://localhost:4000](http://localhost:4000) con hot-reload.

### Frontend

```bash
cd ../client
npm install      
cp .env.example .env
# Edita .env con tus valores:
# REACT_APP_API_URL=http://localhost:4000/api
# REACT_APP_SOCKET_URL=http://localhost:4000
npm start          # o yarn start
```

El cliente estará disponible en [http://localhost:3000](http://localhost:3000).

---

## Uso

1. Regístrate con tu correo.
2. Verifica tu cuenta desde el email.
3. Inicia sesión.
4. Elige matchmaking automático o únete/crea una sala con código.
5. Juega y recibe notificaciones en tiempo real.

---

## Despliegue

* **Frontend:** Genera la build y sube a Netlify:

  ```bash
  cd client
  npm run build
  ```
* **Backend:** Compila (si aplica) y despliega en Heroku o tu proveedor preferido:

  ```bash
  cd server
  npm run build    # si usas TypeScript
  npm start
  ```

Asegúrate de configurar variables de entorno en tu plataforma de despliegue.

---

## Contribuir

1. Haz un fork del repositorio.
2. Crea una rama (`git checkout -b feature/mi-cambio`).
3. Implementa tu cambio y añade tests.
4. Envía un Pull Request describiendo tus modificaciones.

---

## Licencia

© Agustín Álvarez Fijo - 2025
