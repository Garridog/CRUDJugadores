const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const jugador = require ("../models/jugador");
const utils = require('../utils/utils');

const mongoDB = "mongodb+srv://garridobd:udl123@cluster0.3pvd3.mongodb.net/BDequipo"

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const db = mongoose.connection
db.on("error", console.error.bind(console, "error de conexion con mongoDB"));

router.get("/listajugadores", (req, res) =>{
    jugador
    .find((err, respuesta) => {
        if (err) throw err;
        console.log("respuesta de la base: ", respuesta);
        if(respuesta === undefined || respuesta.length === 0){
            res.send(respuesta);
        } else {
            res.send(respuesta);
        }
    });
});

router.post("/registrarjugador", (req, res) => {
    const jugadornuevo = new jugador(req.body);
    jugadornuevo.save((err) => {
        if (err) throw err;
        console.log("Registro Guardado");
    });
    res.send("Registro Exitoso");
});

router.put("/modificajugador", (req, res) => {

    jugador.findOneAndUpdate(
        { usuario: req.body.usuario },
        { password: req.body.password },
        (err, respuesta) => {
        if (err) throw err;
        console.log("Jugador Actualizado");
    });
    res.send("Registro exitoso");

});

router.post("/validajugador", (req,res) => {

    jugador.find(req.body, (err, respuesta) => {
        if (err) throw err;
        console.log("respuesta de la base: ", respuesta);
        if(respuesta === undefined || respuesta.length === 0){
            return res.status(4000).json({
                error: true,
                message: "Usuario Invalido"
            });
        } else {
            // res.send("Jugador Valido")
            const token = utils.generarToken(req.body);
            return res.json({user: res.body.usuario, token})
        }
    }).limit(1);
});


module.exports = router;