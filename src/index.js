// Importar modulos
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const utils = require("../src/utils/utils")
// Inicializaciones
const app = express();

// Configuraciones
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
// Middleware
app.use((req, res, next) => {
    var token = req.headers['authorization']
    if(!token){
        console.log("no trae token"); 
        return next();
    } else {
        console.log("si trae token");
        next();
    }
});
// Variables
// Routes
app.use(require('./routes/equiporuta'));
// Iniciar el server
app.listen(port, () => {
    console.log("Servidor iniciado en el puerto: " + port);
});