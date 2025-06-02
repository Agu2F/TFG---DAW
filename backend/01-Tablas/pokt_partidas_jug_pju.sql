-- // pokt_partidas_jug_pju
-- // Documento ejemplo:
/*
{
  _id: ObjectId("…"),                  // pk_pju_id
  fk_pju_partida: ObjectId("…"),       // referencia a pokt_partidas_par._id
  fk_pju_jugador: ObjectId("…"),       // referencia a pokt_jugadores_jug._id
  pju_fichas_iniciales: 1000,         // fichas con las que entra el jugador
  pju_estado: "activo"                // 'activo' | 'fuera'
}
*/
{
  collection: "pokt_partidas_jug_pju",
  fields: {
    fk_pju_partida: {
      type: "ObjectId",
      ref: "pokt_partidas_par",
      required: true
    },
    fk_pju_jugador: {
      type: "ObjectId",
      ref: "pokt_jugadores_jug",
      required: true
    },
    pju_fichas_iniciales: {
      type: "number",
      required: true,
      min: 0
    },
    pju_estado: {
      type: "string",
      enum: ["activo", "fuera"],
      default: "activo",
      required: true
    }
  },
  indexes: [
    {
      fields: { fk_pju_partida: 1, fk_pju_jugador: 1 },
      options: { unique: true }
    }
    -- // Un índice único para que un jugador no aparezca dos veces en la misma partida
  ]
}
