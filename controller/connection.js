let mysql = require("mysql");

let connection = mysql.createConnection({
    host: "localhost",
    database: "task",
    user: "root",
    password: "",
});

connection.connect(function(error){
    if(error) {
        throw error;
    } else {
        console.log("Conexión con la base de datos establecida correctamente");
    }
});

// Busqueda de usuario en la DB
function findUser(username, password, callback) {
    const query = `SELECT * FROM Usuario WHERE usuario = ? AND contraseña = ?`;
    connection.query(query, [username, password], (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
}

module.exports = { connection, findUser };

// connection.end();