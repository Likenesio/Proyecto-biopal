'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const pedidoSchema = schema( 
{
            
            numero_pedido : {
                type: Number,
                required: true
            },
            cliente:[{
                type: schema.ObjectId,
                ref: "cliente"
            }],
            usuario:[{
                type: schema.ObjectId,
                ref: "usuario"
            }]
}
    );
module.exports = mongoose.model('pedido', pedidoSchema);



