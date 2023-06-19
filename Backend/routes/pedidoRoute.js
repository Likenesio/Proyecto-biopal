'use strict'

var express = require('express');
var pedidoController = require('../controllers/pedidoController');
var api = express.Router();

api.post('/pedido', pedidoController.insert);
api.get('/pedido', pedidoController.listar);
api.get('/pedido/:id', pedidoController.buscar);
api.put('/pedido/:id', pedidoController.actualizar);
api.delete('/pedido/:id', pedidoController.eliminar);

module.exports = api;