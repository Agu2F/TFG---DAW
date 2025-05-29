/**Sockets de “sala de espera”:
 * ----------------------------

Lanza waiting cuando el usuario hace clic en WaitingButton (para apuntarse a la cola), y waitingDisconnection para salirse.

Escucha waitingRoomData (que el servidor le envía cada vez que cambia la cola) y actualiza el estado local waiting.

Cuando la longitud de la cola llega a 2, lanza randomCode —pidiendo al servidor que asigne un código de sala a esos dos sockets.

Escucha luego randomCode desde el servidor, y al recibirlo redirige a /play?roomCode=XXX.

No toca la base de datos
Esta pantalla solo usa sockets en memoria para coordinar quién espera y cuándo hay dos jugadores.
No hace llamadas REST, ni lee/escribe nada en la base de datos, todo es transitorio. */

import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import randomCodeGenerator from '../../utils/randomCodeGenerator'
import './Homepage.css'
import io from 'socket.io-client'
import { UserContext } from '../../utils/UserContext'
import SignIn from '../../components/auth/SignIn'
import {
    Heading,
    VStack,
    Spacer,
    Flex
} from '@chakra-ui/react'
import WaitingButton from './WaitingButton'
import GameCodeModal from './GameCodeModal'
import SignUp from '../auth/SignUp'

let socket
const ENDPOINT = process.env.REACT_APP_ENDPOINT

const Homepage = () => {
    const [waiting, setWaiting] = useState([])
    const [waitingToggle, setWaitingToggle] = useState(false)
    const [code, setCode] = useState('')
    const { user } = useContext(UserContext)

    useEffect(() => {
        const connectionOptions =  {
            "forceNew" : true,
            "reconnectionAttempts": "Infinity",                   
            "transports" : ["websocket"]
        }
        socket = io.connect(ENDPOINT, connectionOptions)

        //Limpio el componente 
        return function cleanup() {
            socket.emit('waitingDisconnection')
            //Apago la conexión
            socket.off()
        }
    }, [])

   
    useEffect(() => {
        socket.on('waitingRoomData', ({ waiting }) => {
            waiting && setWaiting(waiting)
        })
        socket.on('randomCode', ({ code }) =>{
            code && setCode(code)
        })
    }, [])

    useEffect(() => {
        !waitingToggle && socket.emit('waitingDisconnection')
        waitingToggle && socket.emit('waiting')
    }, [waitingToggle])

    if (waiting.length>=2) {
        const users = waiting.slice(0,2)
        socket.emit('randomCode', {
            id1: users[0],
            id2: users[1],
            code: randomCodeGenerator(3)
        })
        if (users[0] === socket.id && code!=='') {
            socket && socket.emit('waitingDisconnection', (users[0]))
            return <Redirect to={`/play?roomCode=${code}`}/>
        }
        else if (users[1] === socket.id && code!=='') {
            socket && socket.emit('waitingDisconnection', (users[0]))
            return <Redirect to={`/play?roomCode=${code}`}/>
        }
    }

    return (
        <div className="Homepage">
            {/* Título principal */}
            <header className="homepage-header">
            <h1>🎲 Poker Royale 🎲</h1>
            </header>

            <Flex
            className="noselect"
            justify="center"
            align="center"
            flexDir="column"
            flexWrap="wrap"
            >
            {!user && (
                <Heading m="1rem 0" color="whitesmoke" size="lg">
                TFG - DAW
                </Heading>
            )}
            {user && (
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
                onClose={() => {
                    setWaitingToggle(false);
                }}
                onTrigger={() => {
                    setWaitingToggle(true);
                }}
                queueLength={waiting.length}
                />
            </VStack>
            </Flex>

            {/* Footer */}
            <footer className="homepage-footer">
            <small>by Agustín Alvarez Fijo</small>
            </footer>
        </div>
        );

}

export default Homepage