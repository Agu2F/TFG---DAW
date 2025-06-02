-- pokt_partidas_par
-- Documento ejemplo:
/*
{
  _id: ObjectId("…"),           // pk_par_id
  par_codigo: "ABC123",         // Código de sala (unique)
  par_fase: "preflop",          // 'preflop' | 'flop' | 'turn' | 'river' | 'showdown'
  par_phase_start: ISODate("…"),// Fecha en la que empezó la fase actual
  par_turno: ObjectId("…"),     // Referencia a fk al jugador que tiene el turno (pk_jug_id)
  par_inicio: ISODate("…")      // Cuándo se creó la partida
}
*/

{
  collection: "pokt_partidas_par",
  fields: {
    -- // Mongo ya incluye su propio _id: ObjectId
    par_codigo: {
      type: "string",
      unique: true,
      required: false,      
      maxlength: 10
    },
    par_fase: {
      type: "string",
      enum: ["preflop", "flop", "turn", "river", "showdown"],
      default: "preflop",
      required: true
    },
    par_phase_start: {
      type: "date",
      default: () => new Date(),
      required: true
    },
    par_turno: {
      type: "ObjectId",
      ref: "pokt_jugadores_jug",
      required: false
    },
    par_inicio: {
      type: "date",
      default: () => new Date(),
      required: true
    }
  },
  indexes: [
    { fields: { par_codigo: 1 }, options: { unique: true } },
    { fields: { par_fase: 1 }, options: {} }
  ]
}
