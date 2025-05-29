/**
 * Página de inicio con lógica de “sala de espera” mediante sockets
 *
 * - Conecta al servidor Socket.io en ENDPOINT.
 * - Gestiona el estado `waiting` con los socket IDs en cola.
 * - Emite `waiting` y `waitingDisconnection` al pulsar el botón de espera.
 * - Escucha `waitingRoomData` para actualizar la cola en tiempo real.
 * - Cuando `waiting.length >= 2`, solicita un `randomCode` al servidor,
 *   que asigna un código de sala a los dos primeros sockets.
 * - Al recibir `randomCode`, redirige al usuario correspondiente a `/play?roomCode=XXX`.
 * - No realiza llamadas REST ni interacciona con la base de datos; toda la
 *   coordinación es transitoria y en memoria vía sockets.
 */

import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import randomCodeGenerator from '../../utils/randomCodeGenerator';
import './Homepage.css';
import io from 'socket.io-client';
import { UserContext } from '../../utils/UserContext';
import SignIn from '../../components/auth/SignIn';
import SignUp from '../../components/auth/SignUp';
import {
  Heading,
  VStack,
  Spacer,
  Flex
} from '@chakra-ui/react';
import WaitingButton from './WaitingButton';
import GameCodeModal from './GameCodeModal';

let socket;
const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const Homepage = () => {
  const [waiting, setWaiting] = useState([]);
  const [waitingToggle, setWaitingToggle] = useState(false);
  const [code, setCode] = useState('');
  const { user } = useContext(UserContext);

  // Conexión y limpieza de socket
  useEffect(() => {
    const options = {
      forceNew: true,
      reconnectionAttempts: Infinity,
      transports: ['websocket']
    };
    socket = io.connect(ENDPOINT, options);

    return () => {
      socket.emit('waitingDisconnection');
      socket.off();
    };
  }, []);

  // Suscripción a eventos de socket
  useEffect(() => {
    socket.on('waitingRoomData', ({ waiting }) => {
      waiting && setWaiting(waiting);
    });
    socket.on('randomCode', ({ code }) => {
      code && setCode(code);
    });
  }, []);

  // Emitir eventos de unión o salida de la cola
  useEffect(() => {
    waitingToggle
      ? socket.emit('waiting')
      : socket.emit('waitingDisconnection');
  }, [waitingToggle]);

  // Emparejamiento cuando hay ≥2 usuarios en espera
  if (waiting.length >= 2) {
    const users = waiting.slice(0, 2);
    socket.emit('randomCode', {
      id1: users[0],
      id2: users[1],
      code: randomCodeGenerator(3)
    });

    // Si soy uno de los dos primeros y ya tengo código, redirijo
    if ((users[0] === socket.id || users[1] === socket.id) && code) {
      socket.emit('waitingDisconnection');
      return <Redirect to={`/play?roomCode=${code}`} />;
    }
  }

  return (
    <div className="Homepage">
      {/* Cabecera */}
      <header className="homepage-header">
        <h1>🎲 Poker Royale 🎲</h1>
      </header>

      <Flex
        className="noselect"
        justify="center"
        align="center"
        flexDir="column"
      >
        {!user ? (
          <Heading m="1rem 0" color="whitesmoke" size="lg">
            TFG - DAW
          </Heading>
        ) : (
          <Heading m="1rem 0" color="whitesmoke" size="lg">
            Welcome, {user.username}!
          </Heading>
        )}
        <VStack w="lg" s="1rem" align="center" justify="center">
          <Spacer />
          <SignIn w="30%" size="lg" />
          {!user && <SignUp w="30%" size="lg" />}
          <GameCodeModal w="30%" size="lg" />
          <WaitingButton
            w="30%"
            size="lg"
            onTrigger={() => setWaitingToggle(true)}
            onClose={() => setWaitingToggle(false)}
            queueLength={waiting.length}
          />
        </VStack>
      </Flex>

      {/* Pie de página */}
      <footer className="homepage-footer">
        <small>by Agustín Alvarez Fijo</small>
      </footer>
    </div>
  );
};

export default Homepage;
