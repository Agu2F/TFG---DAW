/**
 * Rutas de Autenticación y Gestión de Sesiones
 *
 * Este archivo define el router de Express para manejar:
 * - Registro de usuarios (`/signup`): crea nuevo usuario con hash de contraseña, genera un token único
 *   para verificación por correo y envía el email de activación.
 * - Inicio de sesión (`/signin`): valida credenciales, genera tokens JWT de acceso y refresh, y los
 *   envía como cookies seguras.
 * - Verificación de cuenta (`/verify/:uniqueString`): valida el token único enviado por email y marca
 *   la cuenta como verificada.
 * - Comprobación automática de sesión (`/`): middleware `verifyJWT` que renueva tokens si el de acceso
 *   ha expirado y sigue vigente el refresh.
 * - Cierre de sesión (`/signout`): elimina las cookies de acceso y refresh.
 *
 * Utiliza:
 * - bcrypt para hashing de contraseñas.
 * - jsonwebtoken para creación y verificación de JWT.
 * - cookies HTTP-only, secure y sameSite=’none’ para proteger los tokens.
 * - Mongoose para el modelo de usuario.
 * - Funciones auxiliares `randString` y `sendMail` para generación de tokens únicos y envío de emails.
 */

const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/auth/user');
const randString = require('../utils/randString');
const sendMail = require('../utils/send-mail');

const SALT_ROUNDS = 10;
const ACCESS_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 2 * 60 * 1000, // 2 minutos
};
const REFRESH_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 10 * 60 * 1000, // 10 minutos
};

/**
 * Genera tokens JWT de acceso y refresh a partir del usuario.
 * - accessToken: expira en 2 minutos, contiene id, email y username.
 * - refreshToken: expira en 1 día, contiene solo el id del usuario.
 */
const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { id: user._id, email: user.email, username: user.username },
        process.env.SECRET,
        { expiresIn: '2m' }
    );
    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.SECRET_2,
        { expiresIn: '1d' }
    );
    return { accessToken, refreshToken };
};

/**
 * Middleware que verifica el JWT de acceso. Si ha expirado y hay un refresh válido,
 * genera nuevos tokens y los envia como cookies. Si todo falla, delega al siguiente handler.
 */
const verifyJWT = async (req, res, next) => {
    const token = req.cookies.access;
    const refresh = req.cookies.refresh;

    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (!err && decoded) {
                return res.json({ user: decoded });
            }
            next();
        });
    } else if (refresh) {
        jwt.verify(refresh, process.env.SECRET_2, async (err, decoded) => {
            if (err || !decoded?.id) return next();
            //Mongoose para buscar al usuario por ID
            const user = await User.findById(decoded.id);
            if (!user) return next();

            const { accessToken, refreshToken } = generateTokens(user);
            res.cookie('refresh', refreshToken, REFRESH_COOKIE_OPTIONS);
            res.cookie('access', accessToken, ACCESS_COOKIE_OPTIONS);
            return res.json({
                user: { id: user._id, email: user.email, username: user.username },
            });
        });
    } else {
        next();
    }
};

// Ruta para comprobación de sesión; responde 401 si no hay usuario válido.
router.get('/', verifyJWT, (req, res) => {
    res.sendStatus(401);
});

// Inicio de sesión: valida credenciales y envía los tokens como cookies.
router.post('/signin', verifyJWT, async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Please fill all the fields' });
    }
    try {
        // Mongoose para buscar usuario por email
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: 'Not found' });
        if (!user.isValid) return res.status(401).json({ error: 'Email not verified' });

        const isValid = await bcrypt.compare(password, user.hash);
        if (!isValid) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        const { accessToken, refreshToken } = generateTokens(user);
        res.cookie('refresh', refreshToken, REFRESH_COOKIE_OPTIONS);
        res.cookie('access', accessToken, ACCESS_COOKIE_OPTIONS);
        res.json({
            user: { id: user._id, email: user.email, username: user.username },
            message: 'Signed in',
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
    next();
});

// Registro de usuario: comprueba duplicados, guarda hash y token único, envía email de verificación.
router.post('/signup', verifyJWT, async (req, res, next) => {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
        return res.status(400).json({ error: 'Please fill all the fields' });
    }
    try {
        // Mongoose para comprobar existencia por email
        if (await User.findOne({ email })) {                       // ← Mongoose: findOne
            return res.status(409).json({ error: 'Email already exists' });
        }
        // Mongoose para comprobar existencia por username
        if (await User.findOne({ username })) {                    // ← Mongoose: findOne
            return res.status(409).json({ error: 'Username already exists' });
        }
        // Crear y guardar nuevo usuario
        const hash = await bcrypt.hash(password, SALT_ROUNDS);
        const uniqueString = randString(10);
        await new User({ email, username, hash, uniqueString, isValid: false }).save();
        await sendMail(email, uniqueString);

        res.status(200).json({ message: 'Registered, verify your email to Sign In' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
    next();
});

// Verificación de cuenta: activa al usuario si el token único coincide.
router.get('/verify/:uniqueString', async (req, res) => {
    const { uniqueString } = req.params;
    const user = await User.findOne({ uniqueString });
    if (user && !user.isValid) {
        user.isValid = true;
        await user.save();
        console.log('User verified:', user.email);
        return res.status(200).send('verified');
    }
    res.status(401).send('not found');
});

// Cierre de sesión: elimina las cookies de acceso y refresh.
router.post('/signout', (req, res, next) => {
    res.clearCookie('access', ACCESS_COOKIE_OPTIONS);
    res.clearCookie('refresh', REFRESH_COOKIE_OPTIONS);
    res.sendStatus(200);
    next();
});

module.exports = router;
