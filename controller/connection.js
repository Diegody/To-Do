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

connection.end();