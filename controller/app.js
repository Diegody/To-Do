const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete cors
const authRoutes = require('./auth');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Usa el middleware de cors

// Rutas de autenticación
app.use('/auth', authRoutes);

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
