'use strict'

var express = require('express');
var usuarioController = require('../controllers/usuarioController');
var api = express.Router();

api.post('/usuario',usuarioController.insert);
api.get('/usuario', usuarioController.listar);
api.get('/usuario/:_id',usuarioController.buscar);
api.put('/usuario/:_id',usuarioController.actualizar);
api.delete('/usuario/:_id',usuarioController.eliminar);
api.post('/usuario/login', usuarioController.login);

module.exports = api;