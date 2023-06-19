'use strict'

var express = require('express');
var boletaController = require('../controllers/boletaController');
var api = express.Router();

api.post('/boleta',boletaController.insert);
api.get('/boleta', boletaController.listar);
api.get('/boleta/:_id',boletaController.buscar);
api.put('/boleta/:_id',boletaController.actualizar);
api.delete('/boleta/:_id',boletaController.eliminar);

module.exports = api;