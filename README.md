# Poker Royal

**Juego de Poker 1vs1 en Tiempo Real**

---

## Descripción

Poker Royal es una plataforma full-stack para partidas de poker uno contra uno, desarrollada con tecnologías JavaScript: React en el frontend y Node.js con Express en el backend. La comunicación en tiempo real se gestiene mediante Socket.io, y los usuarios se autentican con JWT para garantizar seguridad. Los datos se almacenan en MongoDB Atlas.

---

## Características

* **Matchmaking 1vs1** por WebSockets (Socket.io)
* **Registro** y **login** con JWT
* **Verificación de cuenta** vía correo electrónico
* **Salas privadas** por código
* **Notificaciones** de turno y resultados en tiempo real
* **Responsive**: Compatible con escritorio y móvil

---

## Arquitectura del Proyecto

```
poker-royal/
├── client/             # Aplicación React (frontend)
├── server/             # API REST y Socket.io (backend Node/Express)
├── backend/            # Esquemas y definición de colecciones MongoDB
├── docs/               # Diagramas UML
└── README.md           # Este archivo
```

### Detalle de la carpeta `/backend`

En la carpeta **`backend/`** se encuentran los esquemas que representan las colecciones en MongoDB Atlas. Cada archivo define un modelo Mongoose para:

1. **`Users`** – Jugadores registrados
---

## Tecnologías

* **Frontend:** React, Create React App, Socket.io-client, Context API/Hooks
* **Backend (API):** Node.js, Express, Socket.io, Mongoose (MongoDB Atlas)
* **Base de datos:** MongoDB Atlas.
* **Autenticación:** JSON Web Tokens (JWT)
* **Correo:** Servicio SMTP para verificación de usuarios
* **Despliegue:** Netlify (frontend) y Render (backend)

---

## Instalación

### Prerrequisitos

* Node.js ≥ 16
* npm o yarn
* Cuenta en MongoDB Atlas (o MongoDB local)
* Credenciales SMTP (Mailtrap, SendGrid, etc.)

---

### Backend (API)

```bash
cd server
npm install        
cp .env.example .env
# Edita .env con tus valores:
# PORT, MONGO_ATLAS_URI, JWT_SECRET, JWT_SECRET_2, EMAIL_USER, EMAIL_PASS, CLIENT_URL
npm run dev        
```

El servidor se ejecutará en [http://localhost:3000](http://localhost:3000) con hot-reload.

---

### Frontend (Cliente)

```bash
cd client
npm install       
cp .env.example .env
# Edita .env con tus valores:
# REACT_APP_API_URL=http://localhost:3000/api
# REACT_APP_SOCKET_URL=http://localhost:3000
npm start          
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

## Visualización de Diagramas (`/docs`)

Dentro de la carpeta `docs/` encontrarás los archivos PlantUML con los diagramas UML y de flujo utilizados en la documentación. Para generar y visualizar estos diagramas tienes varias opciones:

1. **Extensión PlantUML en VS Code (recomendado)**

   * Instala la extensión **"PlantUML"** de jebbs.
   * Abre el archivo `.puml` dentro de `docs/`.
   * Pulsa `Alt + D` para activar la vista previa del diagrama en tiempo real.

2. **Servidor Online de PlantUML**

   * Accede a [https://www.planttext.com/](https://www.planttext.com/) o [https://www.plantuml.com/plantuml/uml/](https://www.plantuml.com/plantuml/uml/).
   * Copia y pega el contenido del archivo `.puml` y obtén la imagen generada inmediatamente.

3. **CLI de PlantUML (requiere Java)**

   * Descarga `plantuml.jar` desde la web oficial.
   * Ejecuta:

     ```bash
     java -jar plantuml.jar docs/mi_diagrama.puml
     ```
   * Generará un archivo PNG junto al `.puml` original.

---

## Despliegue

* **Backend (API):**

  ```bash
  cd server
  npm run build     # si aplica (por ejemplo, si transpilas TS)
  npm start
  ```

  Despliega en Render, Heroku o tu proveedor preferido.

* **Frontend (SPA):**

  ```bash
  cd client
  npm run build
  ```

  Sube `client/build` a Netlify.

---

## Licencia

© Agustín Álvarez Fijo – 2025
