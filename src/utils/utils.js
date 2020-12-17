var jwt = require('jsonwebtoken');
const jugador = require('../models/jugador');

function generarToken(userData) {
    if(!userData) return null

    var usuario = {
        userId: jugador.usuario
    }

    return jwt.sign(usuario, "JWT_SECRET = ABCDEF$123", {
        expiresIn: 60 * 5
    });
}
module.exports = {generarToken}