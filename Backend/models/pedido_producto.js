'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const pedprodSchema = schema( 
{
            producto:[{
                type: schema.ObjectId,
                ref: "producto"
            }],
            pedido:[{
                type: schema.ObjectId,
                ref: "pedido"
            }],
            cantidad_producto:{
                type: Number,
                require: true
                
            },
            subtotal:{
                type: Number,
                require: true

            }

 
}
    );
module.exports = mongoose.model('pedprod', pedprodSchema);


