-- // pokt_jugadores_jug
-- // Documento ejemplo:
/*
{
  _id: ObjectId("…"),         // pk_jug_id
  jug_nombre: "Juan Pérez",   // Nombre del jugador
  jug_email: "juan@ejemplo.com", // Email único
  jug_fichas: 1000,           // Nº de fichas iniciales
  jug_password: "<hash>",     // Contraseña hasheada
  jug_verify_token: "…",      // UUID u ObjectId como string
  jug_verified: false         // Booleano
}
*/

// Definición de esquema:
{
  collection: "pokt_jugadores_jug",
  fields: {
    jug_nombre: {
      type: "string",
      required: true
    },
    jug_email: {
      type: "string",
      required: true,
      unique: true,
      match: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    },
    jug_fichas: {
      type: "number",
      default: 1000,
      min: 0
    },
    jug_password: {
      type: "string",
      required: true
    },
    jug_verify_token: {
      type: "string",            
      unique: true,
      default: () => /* generar UUID o usar new ObjectId().toString() */
        require("crypto").randomUUID()
    },
    jug_verified: {
      type: "boolean",
      default: false,
      required: true
    }
  },
  indexes: [
    { fields: { jug_email: 1 }, options: { unique: true } },
    { fields: { jug_verify_token: 1 }, options: { unique: true } }
  ]
}
