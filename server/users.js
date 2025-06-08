/**
 * Gestión de usuarios en memoria para partidas de Poker Royal
 *
 * Este módulo mantiene un array `users` con los usuarios actualmente
 * conectados y sus salas, proporcionando funciones para:
 * - addUser({ id, name, room }): añade un usuario a la sala si no está llena (máx. 2 jugadores)
 * - removeUser(id): elimina y devuelve el usuario desconectado
 * - getUser(id): obtiene los datos de un usuario por su socket id
 * - getUsersInRoom(room): lista todos los usuarios de una sala determinada
 *
 * Se usa para controlar el emparejamiento y la lógica de salas en tiempo real.
 */

const users = [];

/**
 * Añade un nuevo usuario a una sala, si no supera el límite de 2.
 * @param {Object} param0
 * @param {string} param0.id   - ID del socket del usuario.
 * @param {string} param0.name - Nombre asignado (Player 1 o Player 2).
 * @param {string} param0.room - Identificador de la sala.
 * @returns {Object}           - { newUser } o { error } si la sala está llena.
 */
const addUser = ({ id, name, room }) => {
    const numberOfUsersInRoom = users.filter(user => user.room === room).length;
    if (numberOfUsersInRoom === 2) {
        return { error: 'Room is full' };
    }
    const newUser = { id, name, room };
    users.push(newUser);
    return { newUser };
};

/**
 * Elimina un usuario por su socket id.
 * @param {string} id - ID del socket del usuario.
 * @returns {Object}  - Objeto del usuario eliminado, o undefined si no existía.
 */
const removeUser = id => {
    const removeIndex = users.findIndex(user => user.id === id);
    if (removeIndex !== -1) {
        return users.splice(removeIndex, 1)[0];
    }
};

/**
 * Obtiene un usuario por su socket id.
 * @param {string} id - ID del socket del usuario.
 * @returns {Object}  - Objeto del usuario, o undefined si no existe.
 */
const getUser = id => {
    return users.find(user => user.id === id);
};

/**
 * Lista todos los usuarios presentes en una sala.
 * @param {string} room - Identificador de la sala.
 * @returns {Array}     - Array de usuarios en esa sala.
 */
const getUsersInRoom = room => {
    return users.filter(user => user.room === room);
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
