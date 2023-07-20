'use strict'

var express = require('express');
var boletaController = require('../controllers/boletaController');
var api = express.Router();

api.post('/boleta',boletaController.insert);
api.get('/boleta', boletaController.listar);
api.get('/boleta/:_id',boletaController.buscar);
api.put('/boleta/:_id',boletaController.actualizar);
api.delete('/boleta/:_id',boletaController.eliminar);
api.get('/boleta/buscar/:numero_boleta',boletaController.buscarPorNumero);

module.exports = api;