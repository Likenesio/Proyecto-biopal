'use strict'
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const pedidoSchema = schema( 
{
            numero_pedido : {
                type: Number,
                required: true,
                unique:true,
                default: 0
            },
            modo_pago: {
                type:String,
                required:true,
            },

            estado:{
                 type: String,
                 required:true
            },
            fecha: {
              type: Date,
              required:true
            },
            total:{
                type:Number,
                requered:true
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



