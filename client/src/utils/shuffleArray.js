/**
 * Mezcla un array (por ejemplo, un mazo de cartas) intercambiando pares de elementos
 * de forma aleatoria durante un número fijo de iteraciones.
 *
 * Este método realiza 1000 intercambios aleatorios entre dos posiciones del array,
 * proporcionando una mezcla suficientemente desordenada para juegos sencillos.
 *
 * @param {Array} deck - Array de elementos a mezclar.
 * @returns {Array} El mismo array `deck`, ya reordenado.
 */
export default function shuffleArray(deck)
{
	// for 1000 turns
	// switch the values of two random cards
	for (var i = 0; i < 1000; i++)
	{
		var location1 = Math.floor((Math.random() * deck.length));
		var location2 = Math.floor((Math.random() * deck.length));
		var tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}

  return deck
}