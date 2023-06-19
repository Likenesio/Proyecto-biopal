'use strict'

var express = require('express');
var productoController = require('../controllers/productoController');
var api = express.Router();

api.post('/productos', productoController.insert);
api.get('/productos', productoController.listar);
api.get('/productos/:_id', productoController.buscarPorID);
api.put('/productos/:_id', productoController.actualizar);
api.delete('/productos/:_id', productoController.eliminar);
api.get('/productos/buscar', productoController.obtenerPorCodigoBarras);

module.exports = api;