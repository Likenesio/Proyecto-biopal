'use strict'

var express = require('express');
var facturaController = require('../controllers/facturaController');
var api = express.Router();

api.post('/factura', facturaController.insert);
api.get('/factura', facturaController.listar);
api.get('/factura/:_id', facturaController.buscar);
api.put('/factura/:_id', facturaController.actualizar);
api.delete('/factura/:_id', facturaController.eliminar);
api.get('/factura/buscar/:numero_factura', facturaController.buscarPorNumeroFactura);
api.put('/factura/actualizar/:_id', facturaController.actualizarEstado)
api.get('/facturas/filtrar-por-fecha/:fecha_emision', facturaController.filtrarPorFecha);

module.exports = api;