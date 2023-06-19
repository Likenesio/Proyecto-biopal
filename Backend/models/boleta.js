'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const boletaSchema = schema( 
{
            numero_boleta : {
                type: String,
                required: true
            },
            fecha_emision:{
                type: Date,
                require:true
            },
            modo_pago:{
                type: String,
                require:true
            },
            usuario:[{
                type: schema.ObjectId,
                ref: "usuario"
            }],
            total:{
                type: Number,
                require: true
            },
            neto:{
                type: String,
                require:true
            }
 
}
    );
module.exports = mongoose.model('boleta', boletaSchema);


