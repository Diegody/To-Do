const express = require('express');
const app = express();

// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

app.get('/login', (req, res) => {
    res.send(`
            <!DOCTYPE html>
            <html lang="en">

            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!-- Enlace a tu archivo CSS en la carpeta 'public' -->
            <link rel="stylesheet" href="login.css">
            <title>Login</title>
            </head>

            <body>
            <div class="form">

                <ul class="tab-group">
                <li class="tab active"><a href="#login">Iniciar Sesión</a></li>
                <li class="tab"><a href="#signup">Registrarse</a></li>
                </ul>

                <div class="tab-content">
                <div id="login">
                    <h1><b>Bienvenido</b></h1>
                    <form action="/auth" method="post">
                    <div class="field-wrap" id="username">
                        <label>
                        Usuario<span class="req">*</span>
                        </label>
                        <input type="text" name="username" required autocomplete="off" />
                    </div>

                    <div class="field-wrap" id="password">
                        <label>
                        Contraseña<span class="req">*</span>
                        </label>
                        <input type="password" name="password" required autocomplete="off" />
                    </div>

                    <!-- <p class="forgot"><a href="#">Forgot Password?</a></p> -->
                    <button class="button button-block" />Iniciar Sesión</button>
                    </form>

                </div>

                <div id="signup">
                    <h1><b>Registrarse Gratis</b></h1>
                    <form action="/" method="post">
                    <div class="field-wrap">
                        <label>
                        Usuario<span class="req">*</span>
                        </label>
                        <input type="text" required autocomplete="off" />
                    </div>

                    <div class="field-wrap">
                        <label>
                        Nombre<span class="req">*</span>
                        </label>
                        <input type="text" required autocomplete="off" />
                    </div>

                    <div class="field-wrap">
                        <label>
                        Contraseña<span class="req">*</span>
                        </label>
                        <input type="password" required autocomplete="off" />
                    </div>

                    <!-- <div class="field-wrap">
                        <label>
                        Confirmar Contraseña<span class="req">*</span>
                        </label>
                        <input type="password" required autocomplete="off" />
                    </div> -->

                    <button type="submit" class="button button-block" />Registrarse</button>
                    </form>
                </div>

                </div><!-- tab-content -->
                <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
                <script src="../model/login.js"></script>
            </div> <!-- /form -->
            </body>

            </html>
    `);
});

app.listen(3000, () => {
    console.log('Servidor iniciado');
});
