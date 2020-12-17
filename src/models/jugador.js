const mongoose = require("mongoose");

const jugadorSchema = new mongoose.Schema({
    nombre: String,
    posicion: String,
    num_goles: Number,
    usuario: String,
    password: String
});

const jugador = mongoose.model('jugador', jugadorSchema);

module.exports = jugador;