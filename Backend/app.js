'use strict'
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');

app.use(cors());
app.options('*', cors())

var producto_route = require('./routes/productoRoute');
var boleta_route = require('./routes/boletaRoute');
var factura_route = require('./routes/facturaRoute');
var cliente_route = require('./routes/clienteRoute');
var usuario_route = require('./routes/usuarioRoute');
var pedido_route = require('./routes/pedidoRoute');
var pedido_producto_route = require('./routes/pedido_productoRoute');

const mongoose = require('mongoose');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api', producto_route);
app.use('/api', boleta_route);
app.use('/api', factura_route);
app.use('/api', cliente_route);
app.use('/api', usuario_route);
app.use('/api', pedido_route);
app.use('/api', pedido_producto_route);

const options = {
    useNewUrlParser: true,
    autoIndex: true, //this is the code I added that solved it all
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
}
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_name = process.env.DB_NAME;
const port = process.env.PORT;

/*const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_name = process.env.DB_NAME;
const port = process.env.PORT;
*/
mongoose.connect(`mongodb://${db_host}:${db_port}/${db_name}`, options)
.then(() => console.log('> Successfully connected to DB')).catch(err => console.log(err))

app.listen(port, () => {

    console.log('> Servicio corriendo en puerto ' + port)
})



module.exports = app;
