'use strict'

var express = require('express');
var pedidoController = require('../controllers/pedidoController');
var api = express.Router();

api.post('/pedido', pedidoController.insert);
api.get('/pedido', pedidoController.listar);
api.get('/pedido/:_id', pedidoController.buscar);
api.put('/pedido/:_id', pedidoController.actualizar);
api.delete('/pedido/:_id', pedidoController.eliminar);

module.exports = api;