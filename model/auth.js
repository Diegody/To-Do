const express = require('express');
const { findUser } = require('./database');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Secret key para firmar los tokens (debería ser secreto y seguro)
const secretKey = 'miSecretKeySuperSegura';

// Función para generar un token JWT dado un usuario
function generateToken(user) {
    const payload = {
        username: user.username,
        pass: user.password,
    };

    return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // El token expirará en 1 hora
}

// Ruta POST para iniciar sesión
router.post('/', (req, res) => {
    const { username, password } = req.body;

    // Buscar las credenciales del usuario en la base de datos
    findUser(username, password, (err, results) => {
        if (err) {
            console.error('Error al buscar usuario en la base de datos:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            if (results.length > 0) {
                // Credenciales válidas
                const token = generateToken({ username });
                res.json({ token });
            } else {
                // Credenciales inválidas
                res.status(401).json({ error: 'Credenciales inválidas' });
            }
        }
    });
});

module.exports = router;
