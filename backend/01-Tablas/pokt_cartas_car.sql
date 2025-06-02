-- // pokt_cartas_car 
-- // Documento ejemplo:
/*
{
  _id: ObjectId("…"),    // pk_car_id
  car_valor: "A",        // Valor de la carta (e.g. 'A','K','Q','J','10', …)
  car_palo: "corazones", // Palo de la carta (e.g. 'corazones','picas','tréboles','diamantes')
  car_imagen: "/img/A_corazones.png" // Ruta o URL a la imagen
}
*/

{
  collection: "pokt_cartas_car",
  fields: {
    car_valor: {
      type: "string",
      required: true
    },
    car_palo: {
      type: "string",
      required: true
    },
    car_imagen: {
      type: "string",
      required: true
    }
  },
  indexes: [
    -- // buscar por valor/palo:
    { fields: { car_valor: 1, car_palo: 1 }, options: { unique: true } }
  ]
}
