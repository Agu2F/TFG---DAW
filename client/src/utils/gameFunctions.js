/**
 * Funciones de lógica de juego de poker
 *
 * - getHand(pDeck, hDeck):
 *    • Recibe las cartas del jugador (pDeck) y las comunitarias (hDeck).
 *    • Combina ambas manos, convierte figuras (J,Q,K,A) a valores numéricos.
 *    • Cuenta pares, tríos, cuartetos y palos para detectar manos (pares, dobles pares, tríos, escalera, color, full, poker, escalera de color, escalera real).
 *    • Considera excepciones "Five High" y "Steel Wheel" (A-2-3-4-5).
 *    • Devuelve un objeto `hand` con:
 *        – type: tipo de mano (“One Pair”, “Flush”, etc.).
 *        – primary, secondary, tertiary: valores de desempate según la mano.
 *
 * - getWinner(p1, p2, hand1, hand2):
 *    • Asigna un rango numérico a cada tipo de mano.
 *    • Compara rangos para determinar ganador.
 *    • Si empatan, compara primary, luego secondary y tertiary.
 *    • Devuelve el nombre del jugador ganador o "Tie" en caso de empate.
 *
 * - checkFlush(suitMatch): comprueba si hay 5 o más cartas del mismo palo.
 */
export function getHand(pDeck, hDeck) {
    var valueMatch=[], suitMatch={}, twoMatches=[], threeMatches=[], fourMatches=[]
    var hand={type: 'None'}

    const playerDeck = pDeck.filter(item => { if (item) return item })
    const houseDeck = hDeck.filter(item => { if (item) return item })
    const combined = playerDeck && houseDeck && playerDeck.concat

    /**Combinamos las cartas del jugador (playerDeck) con las comunitarias (houseDeck)
     y convertimos J,Q,K,A en sus valores numéricos (11,12,13,14) para simplificar */
    (houseDeck).map(item => {
        if (!item) return 
        else if (item.value === 'J') return {suit: item.suit, value: 11}
        else if (item.value === 'Q') return {suit: item.suit, value: 12}
        else if (item.value === 'K') return {suit: item.suit, value: 13}
        else if (item.value === 'A') return {suit: item.suit, value: 14}
        else return {suit: item.suit, value: item.value}
      })

    if (!combined) return "Error"
      
    // Separamos valores y palos para evitar mapear varias veces
    const values = combined.map(item=> {return item.value})
    const descending = values.sort((a, b) => {return b-a})
    const suits = combined.map(item=> {return item.suit})

    // Contamos cuántas veces aparece cada valor y cada palo
    values.forEach(x=> { valueMatch[x] = (valueMatch[x] || 0) + 1 })
    suits.forEach(x=> { suitMatch[x] = (suitMatch[x] || 0) + 1 })

    // Agrupamos en arrays las parejas, tríos y cuartetos encontrados
    for(var i=1;i<14;i++) {
        if (valueMatch[i] === 2) twoMatches.push(i)
        else if (valueMatch[i] === 3) threeMatches.push(i)
        else if (valueMatch[i] === 4) fourMatches.push(i) 
    }

    // Recorremos cada carta para detectar escalera, color y sus variantes
    combined.forEach(({ suit, value }) => {
        const Straight = (values.includes(value+1)&&values.includes(value+2)&&values.includes(value+3)&&values.includes(value+4)) ? true : false

        // Escalera de color
        const StraightFlush = (combined.some(e => {return ((e.value === value+1)&&(e.suit === suit))})) &&
        (combined.some(e => {return ((e.value === value+2)&&(e.suit === suit))})) &&
        (combined.some(e => {return ((e.value === value+3)&&(e.suit === suit))})) && 
        (combined.some(e => {return ((e.value === value+4)&&(e.suit === suit))}))

        // Casos especiales 'A,2,3,4,5', estos son los únicos casos en los que el "A" actua como    carta baja
        const FiveHigh = (values.includes(14)&&values.includes(2)&&values.includes(3)&&values.includes(4)&&values.includes(5)) ? true : false

        const SteelWheel = (combined.some(e => {return ((e.value === 14)&&(e.suit === suit))})) &&
        (combined.some(e => {return ((e.value === 2)&&(e.suit === suit))})) &&
        (combined.some(e => {return ((e.value === 3)&&(e.suit === suit))})) && 
        (combined.some(e => {return ((e.value === 4)&&(e.suit === suit))})) && 
        (combined.some(e => {return ((e.value === 4)&&(e.suit === suit))}))

        // Ahora asignamos el tipo de mano según lo detectado:
        if ((value===10)&&(StraightFlush)) {
            hand.type = 'Royal Flush'
            /*Aunque en las reglas de alguna modalidad de poker dicen que un Royal Flush de un palo puede vencer a otro(♠︎ > ♥︎ > ♦︎ > ♣︎), en el póker competitivo se establece que dos Royal Flush siempre empatarán. Además, dado que la probabilidad de que aparezcan dos Royal Flush en la misma partida es de 1 en 649,739, asique no me voy a complicar implementándolo :)*/
        } 
        else if (StraightFlush) {
            hand.type = 'Straight Flush'
            hand.primary = value+4
        } 
        else if (Straight) {
            hand.type = 'Straight'
            hand.primary = value+4
        } 
        else if (([14,2,3,4,5].includes(value)) && (SteelWheel)) {
            hand.type = 'Straight Flush'
            hand.primary = 5
        } 
        else if (([14,2,3,4,5].includes(value)) && (FiveHigh)) {
            hand.type = 'Straight'
            hand.primary = 5
        } 
    })

    // Ahora cubrimos parejas, dobles parejas, trío, color, full y póker:

    // Pareja simple
    if ((hand.type==='None')&&(twoMatches.length===1)&&(threeMatches.length===0)) {
        hand.type = 'One Pair'
        hand.primary = twoMatches[0]

        const descendingFiltered = descending.filter(e => {return e!==hand.primary})
        hand.secondary = descendingFiltered[0]
        hand.tertiary = descendingFiltered[1]
    }
    // Dos parejas
    else if (twoMatches.length===2) {
        hand.type = 'Two Pair'
        hand.primary = twoMatches[1]
        hand.secondary = twoMatches[0]

        hand.tertiary = descending.filter(e => {return (e!==hand.primary && e!==hand.secondary )})[0]
    } 
    // Más de dos parejas (caso raro)
    else if (twoMatches.length>2) {
        hand.type = 'Two Pair'
        hand.primary = twoMatches[twoMatches.length]
        hand.secondary = twoMatches[twoMatches.length - 1]

        hand.tertiary = descending.filter(e => {return (e!==hand.primary && e!==hand.secondary )})[0]
    }
    // Trío
    else if ((twoMatches.length===0)&&(threeMatches.length===1)) {
        hand.type = 'Three of a kind'
        hand.primary = threeMatches[0]

        hand.secondary = descending.filter(e => {return e!==hand.primary})[0]
    }
    // Color
    else if ((Object.keys(suitMatch).length<4) && checkFlush(suitMatch)) {
        hand.type = 'Flush'
        hand.primary = descending[0]
    }
    // Full House
    else if ((twoMatches.length===1)&&(threeMatches.length===1)) {
        hand.type = 'Full House'
        hand.primary = threeMatches[0]
        hand.secondary = twoMatches[0]
    } 
    // Poker
    else if (fourMatches.length===1) {
        hand.type = 'Four of a kind'
        hand.primary = fourMatches[0]
        hand.secondary = descending.filter(e => {return e!==hand.primary})[0]
    }

    /**Para los casos en los que no hay ni parejas ni nada, ordeno los valores de la mano en un array de menera desdente y eliggo el primer elemento para ver quien gana por carta alta.
    Para los casos de Escalera real, escalera y color hacemos lo mismo que en caso de empate.*/
    else if ((hand.type = 'None') || (['Royal Flush','Straight Flush','Straight'].includes(hand.type))) {
        hand.primary = descending[0]
        hand.secondary = descending[1]
    }

    return hand
}

// Función para comparar dos manos y devolver el ganador
export function getWinner(p1, p2, hand1, hand2) {
    const rank1 = getRank(hand1.type), rank2 = getRank(hand2.type) 

    // Asignamos un número a cada tipo de mano
    function getRank(handType) {
        var rank

        switch (handType) {
            case 'None': rank=0; break;
            case 'One Pair': rank=1; break;
            case 'Two Pair': rank=2; break;
            case 'Three of a kind': rank=3; break;
            case 'Straight': rank=4; break;
            case 'Flush': rank=5; break;
            case 'Full House': rank=6; break;
            case 'Four of a kind': rank=7; break;
            case 'Straight Flush': rank=8; break;
            case 'Royal Flush': rank=8;
          }

          return rank
    }

    // Comparamos rangos primero, luego primary, luego secondary y tertiary
    if (rank1 > rank2) return p1
    else if (rank1 < rank2) return p2

    else if (rank1 === rank2) {
        // Para Royal Flush siempre empate
        if (rank1!=='Royal Flush') {

            // Comparamos valores altos
            if (hand1.primary > hand2.primary) return p1
            else if (hand1.primary < hand2.primary) return p2

            // Si primary empata, revisamos secondary/tertiary
            else if (hand1.primary === hand2.primary) {

                if (hand1.secondary) { // Compruebo que exista secondary

                    if (hand1.secondary > hand2.secondary) return p1
                    else if (hand1.secondary < hand2.secondary) return p2

                    else if (hand1.secondary === hand2.secondary) {

                        if (hand1.tertiary) { // Comprueba si tertiary existe

                            if (hand1.tertiary > hand2.tertiary) return p1
                            else if (hand1.tertiary < hand2.tertiary) return p2
                            
                            else if (hand1.tertiary === hand2.tertiary) return 'Tie'
                        }

                        else return 'Tie'
                    }

                }
                
                else return 'Tie'
            }
        }

        else if (rank1==='Royal Flush') {
            return 'Tie'
        }
    }



}
// Comprueba si hay color
function checkFlush(suitMatch) {
    if (suitMatch.diamonds && suitMatch.diamonds >= 5) return true
    else if (suitMatch.clubs && suitMatch.clubs >= 5) return true
    else if (suitMatch.spades && suitMatch.spades >= 5) return true
    else if (suitMatch.hearts && suitMatch.hearts >= 5) return true

    else return false
}