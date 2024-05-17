import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuración del servidor
const app = express();
app.set("port", 3000);
app.listen(app.get("port"));
console.log("corriendo en el puerto", app.get("port"));

// DB
import connection from './controller/connection.js';


// Configuración
app.use(express.static(__dirname + "/public"));

// Rutas
app.get("/", (req, res) => res.sendFile(__dirname + "/view/login.html"));
app.get("/task", (req, res) => res.sendFile(__dirname + "/view/inicio.html"));


// app.use(express.urlencoded({ extended: false }))
// app.use(express.json());
// app.use(express.static('public'));

// app.get('/login', (req, res) => {
//     res.send(`
//     `);
// });

// app.post('/auth', (req, res) => {
//     const { username, password } = req.body;
//     const accessToken = generateAccessToken(username);

//     res.header('authorization', accessToken).json({
//         message: 'Usuario autenticado',
//         token: accessToken
//     });

//     const sqlQuery = 'SELECT * FROM Usuario WHERE usuario = ? AND contraseña = ?';

//     connection.query(sqlQuery, [username], [password], (error, results) => {
//         if (error) {
//             console.error('Error al consultar la base de datos:', error);
//             res.status(500).json({ error: 'Error interno del servidor' });
//         } else {
//             if (results.length > 0) {
//                 const user = results[0];

//                 if (user.password === password) {
//                     res.json({ message: 'Inicio de sesión exitoso', user });
//                 } else {
//                     res.status(401).json({ error: 'Credenciales inválidas' });
//                 }
//             } else {
//                 res.status(404).json({ error: 'Usuario no encontrado' });
//             }
//         }
//     });
// })

// function generateAccessToken(username) {
//     return jwt.sign(username, process.env.SECRET, { expiresIn: '5m' });
// }

// app.listen(3000, () => {
//     console.log('Servidor iniciado');
// });
