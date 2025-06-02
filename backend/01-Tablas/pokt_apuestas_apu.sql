-- // pokt_apuestas_apu (colección)
-- // Documento ejemplo:
/*
{
  _id: ObjectId("…"),                  // pk_apu_id
  fk_apu_partida: ObjectId("…"),       // referencia a pokt_partidas_par._id
  fk_apu_jugador: ObjectId("…"),       // referencia a pokt_jugadores_jug._id
  apu_tipo: "apostar",                 // 'apostar'|'subir'|'igualar'|'retirarse'
  apu_monto: 500,                      // monto de la apuesta
  apu_fecha: ISODate("…")              // timestamp de la apuesta
}
*/
{
  collection: "pokt_apuestas_apu",
  fields: {
    fk_apu_partida: {
      type: "ObjectId",
      ref: "pokt_partidas_par",
      required: true
    },
    fk_apu_jugador: {
      type: "ObjectId",
      ref: "pokt_jugadores_jug",
      required: true
    },
    apu_tipo: {
      type: "string",
      enum: ["apostar", "subir", "igualar", "retirarse"],
      required: true
    },
    apu_monto: {
      type: "number",
      required: true,
      min: 0
    },
    apu_fecha: {
      type: "date",
      default: () => new Date(),
      required: true
    }
  },
  indexes: [
    { fields: { fk_apu_partida: 1 }, options: {} },
    { fields: { fk_apu_jugador: 1 }, options: {} }
    -- // para buscar rápido por partida o por jugador
  ]
}
