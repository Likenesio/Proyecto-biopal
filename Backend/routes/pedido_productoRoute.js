'use strict'

var express = require('express');
var pedido_productoController = require('../controllers/pedido_productoController');
var api = express.Router();

api.post('/pedido_producto', pedido_productoController.insert);
api.get('/pedido_producto', pedido_productoController.listar);
api.get('/pedido_producto/:_id', pedido_productoController.buscarPPId);
api.put('/pedido_producto/:_id', pedido_productoController.actualizar);
api.delete('/pedido_producto/:_id', pedido_productoController.eliminar);

module.exports = api;