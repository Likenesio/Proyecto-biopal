'use strict'

var express = require('express');
var clienteController = require('../controllers/clienteController');
var api = express.Router();

api.post('/cliente', clienteController.insert);
api.get('/cliente', clienteController.listar);
api.get('/cliente/:_id', clienteController.buscarPorID);//te falto el guion bajo en _id, lo tenias como .../id
api.put('/cliente/:_id', clienteController.actualizar);
api.delete('/cliente/:_id', clienteController.eliminar);

module.exports = api;