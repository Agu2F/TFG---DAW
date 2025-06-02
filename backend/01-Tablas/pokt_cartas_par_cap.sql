-- // pokt_cartas_par_cap (colección)
-- // Documento ejemplo:
/*
{
  _id: ObjectId("…"),              // pk_cap_id
  fk_cap_partida: ObjectId("…"),   // referencia a partida (pokt_partidas_par._id)
  fk_cap_jugador: ObjectId("…"),   // referencia a jugador (pokt_jugadores_jug._id)
  fk_cap_carta: ObjectId("…"),     // referencia a la carta (pokt_cartas_car._id)
  cap_tipo: "mano",                // 'mano' | 'descartada'
  cap_posicion: 1                  // posición dentro de la mano (1 o 2 normalmente)
}
*/
{
  collection: "pokt_cartas_par_cap",
  fields: {
    fk_cap_partida: {
      type: "ObjectId",
      ref: "pokt_partidas_par",
      required: true
    },
    fk_cap_jugador: {
      type: "ObjectId",
      ref: "pokt_jugadores_jug",
      required: true
    },
    fk_cap_carta: {
      type: "ObjectId",
      ref: "pokt_cartas_car",
      required: true
    },
    cap_tipo: {
      type: "string",
      enum: ["mano", "descartada"],
      required: true
    },
    cap_posicion: {
      type: "number",
      required: true,
      min: 1
    }
  },
  indexes: [
    -- // Evitar que el mismo jugador tenga dos cartas con misma posición en una partida
    {
      fields: {
        fk_cap_partida: 1,
        fk_cap_jugador: 1,
        cap_posicion: 1
      },
      options: { unique: true }
    }
  ]
}
