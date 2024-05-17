import express from 'express';
import path from 'path';
import bcryptjs from 'bcryptjs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuración del servidor
const app = express();
app.set("port", 3000);

// Middlewares para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(app.get("port"), () => {
    console.log("Corriendo en el puerto", app.get("port"));
});

// DB
import connection from './controller/connection.js';

// Configuración
app.use(express.static(__dirname + "/public"));

// Rutas
app.get('/', (req, res) => res.sendFile(__dirname + "/view/login.html"));
app.get('/task', (req, res) => res.sendFile(__dirname + "/view/inicio.html"));

// Registrar Usuario
app.post('/register', async (req, res) => {
    const user = req.body.user;
    const name = req.body.name;
    const pass = req.body.password;
    let passHash = await bcryptjs.hash(pass, 8);

    const query = `
        INSERT INTO Usuario (usuario, nombre, contraseña, creacion)
        VALUES (?, ?, ?, (SELECT SYSDATE() FROM DUAL))
    `;

    connection.query(query, [user, name, passHash], (error, results, fields) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            return res.status(500).json({ success: false, message: 'Error al registrar el usuario', error: error.message });
        }
        res.status(200).json({ success: true, message: 'Usuario registrado con éxito' });
    });
});

// Iniciar Sesión
app.post('/auth', async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        connection.query('SELECT * FROM Usuario WHERE usuario = ?', [username], async (error, results, fields) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
                return res.status(500).json({ success: false, message: 'Error al autenticar el usuario', error: error.message });
            }

            if (results.length > 0) {
                const user = results[0];
                const validPassword = await bcryptjs.compare(password, user.contraseña);
                console.log("Hash: ", password);
                console.log("Hash: ", user.contraseña);

                if (validPassword) {
                    return res.status(200).json({ success: true, message: 'Autenticación exitosa' });
                } else {
                    return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
                }
            } else {
                return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
            }
        });
    } else {
        return res.status(400).json({ success: false, message: 'Por favor, proporciona un nombre de usuario y una contraseña' });
    }
});
