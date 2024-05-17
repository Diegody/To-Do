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

app.post('/register', async (req, res) => {
    const user = req.body.user;
    const name = req.body.name;
    const password = req.body.password;
    let passHash = await bcryptjs.hash(password, 8);

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
