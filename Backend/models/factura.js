'use strict'
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const factSchema = schema( 
{
            numero : {
                type: String,
                required: true
            },
            neto: {
                type: Number,
                require: true
            },
            iva:{
                type: Number,
                require: true
            },
            fecha_emision:{
                type: Date,
                require:true
            },
            modo_pago:{
                type: String,
                require:true
            },
            total:{
                type: Number,
                require: true
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
module.exports = mongoose.model('factura', factSchema);


