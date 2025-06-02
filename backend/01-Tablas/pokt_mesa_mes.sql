-- // pokt_mesa_mes
-- // Documento ejemplo:
/*
{
  _id: ObjectId("…"),           // pk_mes_id
  fk_mes_partida: ObjectId("…"),// referencia a pokt_partidas_par._id
  fk_mes_carta: ObjectId("…"),  // referencia a pokt_cartas_car._id
  mes_posicion: 3               // posición en la mesa (1=flop1, 2=flop2, 3=flop3, 4=turn, 5=river)
}
*/
{
  collection: "pokt_mesa_mes",
  fields: {
    fk_mes_partida: {
      type: "ObjectId",
      ref: "pokt_partidas_par",
      required: true
    },
    fk_mes_carta: {
      type: "ObjectId",
      ref: "pokt_cartas_car",
      required: true
    },
    mes_posicion: {
      type: "number",
      required: true,
      min: 1
    }
  },
  indexes: [
    { fields: { fk_mes_partida: 1, mes_posicion: 1 }, options: { unique: true } }
    -- // Un índice único (partida + posición) para que no se repita la misma posición
  ]
}
