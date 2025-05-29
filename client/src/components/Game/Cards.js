/* El componente Cards no habla directamente con la base, sino que recibe props que contienen:

Prop:	Contenido:
----    ----------
numberOfTurns:  Un contador entero que va subiendo en el frontend a medida que avanzan rondas (por ej. 0→1 preflop, 2→3 flop, 4→5 turn, 6→7 river).

houseDeck:	    Array de cartas comunitarias: [ { value: "A", suit: "hearts" }, … ]. Se renderizan boca abajo si numberOfTurns < 2.

player1Deck:	Array de cartas privadas de P1: idéntica forma que houseDeck.

player2Deck:	Array de cartas privadas de P2.

player1Chips:	Número de fichas que le quedan a P1.

player2Chips:	Número de fichas que le quedan a P2.
turn	Cadena "Player 1" o "Player 2", indicando de quién es el turno.

currentUser:	Cadena con tu rol en esta sesión ("Player 1" o "Player 2").

winner:	        Cadena con el nombre del ganador, o null si no hay aún.

player1Name:	Nombre de P1.

player2Name:	Nombre de P2.

gameOver:	Booleano que indique que la mano terminó (true al fin del river).
 */
import React, { useState, useEffect } from 'react'
import Card from './Card'
import Spinner from '../utils/Spinner'
import {
    HStack,
    VStack,
    Flex,
    Heading,
} from '@chakra-ui/react'

export default function Cards({ numberOfTurns, player1Deck, player2Deck, houseDeck, gameOver, currentUser, player1Chips, player2Chips, turn, winner, player1Name, player2Name }) {
    const [p1Heading, setP1Heading] = useState()
    const [p2Heading, setP2Heading] = useState()
    const [houseHeading, setHouseHeading] = useState()
    
    useEffect(() => {
        if (numberOfTurns<2) setHouseHeading('Buy In to reveal cards')
        else if (numberOfTurns>=2 && numberOfTurns<4) setHouseHeading('Flop')
        else if (numberOfTurns>=4 && numberOfTurns<6) setHouseHeading('Turn')
        else if (numberOfTurns>=6 && numberOfTurns<8) setHouseHeading('River')
        else if (numberOfTurns>=8) setHouseHeading('Game Over!')
    }, [numberOfTurns])

    useEffect(() => {
        if (currentUser === 'Player 1' && winner === player1Name) setP1Heading(`👑 ${player1Name} (You)`)            
        else if (currentUser === 'Player 1') setP1Heading(`${player1Name} (You)`)
        else if (winner === player1Name) setP1Heading(`👑 ${player1Name}`)
        else setP1Heading(player1Name)        
        if (currentUser === 'Player 2' && winner === player2Name) setP2Heading(`👑 ${player2Name} (You)`)            
        else if (currentUser === 'Player 2') setP2Heading(`${player2Name} (You)`)
        else if (winner === player2Name) setP2Heading(`👑 ${player2Name}`)
        else setP2Heading(player2Name)    
    }, [winner, player1Name, player2Name, currentUser])

    return (
        <Flex justify="center" align="center" flexDir="column">
            <Heading my="0.5rem" fontFamily="inherit" size="md" style={{color: (winner==='Player 2') ? "#FFD700" : "inherit"}}>{p2Heading}</Heading>
            <HStack spacing="1.5rem" >
                <HStack>
                    {player2Deck && player2Deck.map(item => {
                        if (((currentUser==='Player 2') || (gameOver===true)) && item) return <Card className="player-card" value={item.value} suit={item.suit}/>
                        else return <Card className="player-card-back" suit='BACK' />
                    })}
                </HStack>
                <VStack>
                    <Heading size="md" fontWeight="semibold" fontFamily="inherit">Chips: {player2Chips}</Heading>
                    {currentUser==='Player 1' && turn==='Player 2' && gameOver===false && <Spinner/>}
                </VStack>
            </HStack>

            <Heading my="0.5rem" fontFamily="inherit" size="md">{houseHeading}</Heading>
            <Flex justify="center" align="center" flexDir="row" gridGap="1rem" flexWrap="wrap">
                {houseDeck && houseDeck.map(item => {
                    if (item) return <Card value={item.value} suit={(numberOfTurns>=2) ? item.suit : "BACK"} className="card"/>
                })}
            </Flex>

            <Heading my="0.5rem" fontFamily="inherit" size="md" style={{color: (winner==='Player 1') ? "#FFD700" : "inherit"}}>{p1Heading}</Heading>
            <HStack spacing="1.5rem">
            <VStack>
                <Heading size="md" fontWeight="semibold" fontFamily="inherit">Chips: {player1Chips}</Heading>
                {currentUser==='Player 2' && turn==='Player 1' && gameOver===false && <Spinner/>}
            </VStack>
            <HStack>
                {player1Deck && player1Deck.map(item => {
                    if (((currentUser==='Player 1') || (gameOver===true)) && item) return <Card className="player-card" value={item.value} suit={item.suit}/>
                    else return <Card className="player-card-back" suit='BACK' />
                })}
            </HStack>
            </HStack>
        </Flex>
    )
}
