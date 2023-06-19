'use strict'

var express = require('express');
var facturaController = require('../controllers/pedidoController');
var api = express.Router();

api.post('/factura', facturaController.insert);
api.get('/factura', facturaController.listar);
api.get('/factura/:id', facturaController.buscar);
api.put('/factura/:id', facturaController.actualizar);
api.delete('/factura/:id', facturaController.eliminar);

module.exports = api;