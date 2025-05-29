/**
 * Componente Cards
 *
 * Renderiza la disposición de cartas y fichas de ambos jugadores y las comunitarias.
 * No interactúa con la base de datos: recibe todo como props.
 *
 * Props:
 * @param {number} numberOfTurns   - Contador de rondas (0→1 preflop, 2→3 flop, 4→5 turn, 6→7 river, ≥8 game over).
 * @param {Array}  houseDeck       - Cartas comunitarias (se muestran boca abajo si numberOfTurns < 2).
 * @param {Array}  player1Deck     - Cartas privadas de Player 1.
 * @param {Array}  player2Deck     - Cartas privadas de Player 2.
 * @param {number} player1Chips    - Fichas restantes de Player 1.
 * @param {number} player2Chips    - Fichas restantes de Player 2.
 * @param {string} turn            - "Player 1" o "Player 2", indicando de quién es el turno.
 * @param {string} currentUser     - Tu rol en la partida ("Player 1" o "Player 2").
 * @param {string} winner          - Nombre del ganador, o falsy si aún no hay.
 * @param {string} player1Name     - Nombre de Player 1.
 * @param {string} player2Name     - Nombre de Player 2.
 * @param {boolean} gameOver       - TRUE si la mano ha terminado.
 *
 * Comportamiento:
 * - Muestra un encabezado con el nombre de cada jugador, marcando al ganador con 👑 y "(You)" si eres tú.
 * - En cada mano, solo el jugador correspondiente o todos (al finalizar) ven sus cartas propias boca arriba.
 * - Las cartas de la mesa aparecen según la ronda (BACK o su palo real).
 * - Muestra Spinner cuando no es tu turno y la acción del oponente está pendiente.
 */
import React, { useState, useEffect } from 'react';
import Card from './Card';
import Spinner from '../utils/Spinner';
import { HStack, VStack, Flex, Heading } from '@chakra-ui/react';

export default function Cards({
  numberOfTurns,
  player1Deck,
  player2Deck,
  houseDeck,
  gameOver,
  currentUser,
  player1Chips,
  player2Chips,
  turn,
  winner,
  player1Name,
  player2Name
}) {
  const [p1Heading, setP1Heading] = useState();
  const [p2Heading, setP2Heading] = useState();
  const [houseHeading, setHouseHeading] = useState();

  // Título de la sección de mesa según la ronda
  useEffect(() => {
    if (numberOfTurns < 2) setHouseHeading('Buy In to reveal cards');
    else if (numberOfTurns < 4) setHouseHeading('Flop');
    else if (numberOfTurns < 6) setHouseHeading('Turn');
    else if (numberOfTurns < 8) setHouseHeading('River');
    else setHouseHeading('Game Over!');
  }, [numberOfTurns]);

  // Construir encabezados de jugador con marca de ganador y "(You)"
  useEffect(() => {
    // Player 1
    if (currentUser === 'Player 1' && winner === player1Name) setP1Heading(`👑 ${player1Name} (You)`);
    else if (currentUser === 'Player 1') setP1Heading(`${player1Name} (You)`);
    else if (winner === player1Name) setP1Heading(`👑 ${player1Name}`);
    else setP1Heading(player1Name);

    // Player 2
    if (currentUser === 'Player 2' && winner === player2Name) setP2Heading(`👑 ${player2Name} (You)`);
    else if (currentUser === 'Player 2') setP2Heading(`${player2Name} (You)`);
    else if (winner === player2Name) setP2Heading(`👑 ${player2Name}`);
    else setP2Heading(player2Name);
  }, [winner, player1Name, player2Name, currentUser]);

  return (
    <Flex justify="center" align="center" flexDir="column">
      {/* Player 2 */}
      <Heading my="0.5rem" fontFamily="inherit" size="md"
        style={{ color: winner === player2Name ? "#FFD700" : "inherit" }}>
        {p2Heading}
      </Heading>
      <HStack spacing="1.5rem">
        <HStack>
          {player2Deck.map(item =>
            ((currentUser === 'Player 2' || gameOver) && item) ? (
              <Card className="player-card" value={item.value} suit={item.suit} />
            ) : (
              <Card className="player-card-back" suit="BACK" />
            )
          )}
        </HStack>
        <VStack>
          <Heading size="md" fontWeight="semibold" fontFamily="inherit">
            Chips: {player2Chips}
          </Heading>
          {currentUser === 'Player 1' && turn === 'Player 2' && !gameOver && <Spinner />}
        </VStack>
      </HStack>

      {/* Mesa */}
      <Heading my="0.5rem" fontFamily="inherit" size="md">
        {houseHeading}
      </Heading>
      <Flex justify="center" align="center" flexDir="row" gridGap="1rem" flexWrap="wrap">
        {houseDeck.map(item =>
          <Card
            value={item.value}
            suit={numberOfTurns >= 2 ? item.suit : 'BACK'}
            className="card"
          />
        )}
      </Flex>

      {/* Player 1 */}
      <Heading my="0.5rem" fontFamily="inherit" size="md"
        style={{ color: winner === player1Name ? "#FFD700" : "inherit" }}>
        {p1Heading}
      </Heading>
      <HStack spacing="1.5rem">
        <VStack>
          <Heading size="md" fontWeight="semibold" fontFamily="inherit">
            Chips: {player1Chips}
          </Heading>
          {currentUser === 'Player 2' && turn === 'Player 1' && !gameOver && <Spinner />}
        </VStack>
        <HStack>
          {player1Deck.map(item =>
            ((currentUser === 'Player 1' || gameOver) && item) ? (
              <Card className="player-card" value={item.value} suit={item.suit} />
            ) : (
              <Card className="player-card-back" suit="BACK" />
            )
          )}
        </HStack>
      </HStack>
    </Flex>
  );
}
