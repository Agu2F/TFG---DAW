/**
 * Punto de entrada del servidor de Poker Royal
 *
 * Este archivo configura y arranca la aplicación Express junto con Socket.io
 * para manejar tanto la API REST de autenticación como la comunicación en
 * tiempo real de las partidas. Incluye:
 *
 * - Carga de variables de entorno con dotenv.
 * - Conexión a MongoDB Atlas con Mongoose.
 * - Configuración de middleware de CORS, JSON y cookies.
 * - Rutas de autenticación (signup, signin, verify, signout).
 * - Gestión de WebSockets:
 *   • Sala de espera (“waitingRoom”) para matchmaking.
 *   • Emisión de códigos de sala y datos de usuarios.
 *   • Eventos de unión a partida, inicialización y actualización de estado.
 *   • Chat en tiempo real (sendMessage).
 * - Inicio del servidor HTTP y escucha en el puerto especificado.
 */

require('dotenv').config();
console.log('🔑 MONGO_ATLAS_URI=', process.env.MONGO_ATLAS_URI);
console.log('🚀 PORT=', process.env.PORT);

const express = require('express');
const cookieParser = require('cookie-parser');
const socketio = require('socket.io');
const http = require('http');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const authRoutes = require('./routes/auth');
const mongoose = require('mongoose');

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_ATLAS_URI);
const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB error:', error));
db.once('open', () => console.log('Connected to database'));

const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Middleware CORS personalizado para permitir cookies y orígenes dinámicos
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers','X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.json());
app.use(cookieParser());

// Rutas de autenticación
app.use('/auth', authRoutes);

// WebSockets: lógica de matchmaking y comunicación de partidas
io.on('connection', (socket) => {
    // Usuario espera para matchmaking
    socket.on('waiting', () => {
        socket.join('waitingRoom');
        const waitingClients = io.sockets.adapter.rooms.get('waitingRoom');
        io.to('waitingRoom').emit('waitingRoomData', { waiting: [...waitingClients] });
    });

    // Usuario sale de la sala de espera
    socket.on('waitingDisconnection', (id) => {
        if (id) io.sockets.sockets.get(id)?.leave('waitingRoom');
        else socket.leave('waitingRoom');
        const waitingClients = io.sockets.adapter.rooms.get('waitingRoom') || [];
        io.to('waitingRoom').emit('waitingRoomData', { waiting: [...waitingClients] });
        socket.emit('waitingRoomData', { waiting: [...waitingClients] });
    });

    // Envío de código aleatorio para salas privadas
    socket.on('randomCode', ({ id1, id2, code }) => {
        id1 && io.sockets.sockets.get(id1)?.emit('randomCode', { code });
        id2 && io.sockets.sockets.get(id2)?.emit('randomCode', { code });
    });

    // Unión a una sala de partida
    socket.on('join', (payload, callback) => {
        const usersInRoom = getUsersInRoom(payload.room);
        const { error, newUser } = addUser({
            id: socket.id,
            name: usersInRoom.length === 0 ? 'Player 1' : 'Player 2',
            room: payload.room,
        });
        if (error) return callback(error);

        socket.join(newUser.room);
        io.to(newUser.room).emit('roomData', {
            room: newUser.room,
            users: getUsersInRoom(newUser.room),
        });
        socket.emit('currentUserData', { name: newUser.name });
        callback();
    });

    // Inicializar estado de juego
    socket.on('initGameState', (gameState) => {
        const user = getUser(socket.id);
        if (user) io.to(user.room).emit('initGameState', gameState);
    });

    // Actualizar estado de juego
    socket.on('updateGameState', (gameState) => {
        const user = getUser(socket.id);
        if (user) io.to(user.room).emit('updateGameState', gameState);
    });

    // Chat dentro de la sala de juego
    socket.on('sendMessage', (payload, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: payload.message });
        callback();
    });

    // Desconexión de usuario
    socket.on('disconnection', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room),
            });
        }
    });
});

// Arrancar servidor
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});