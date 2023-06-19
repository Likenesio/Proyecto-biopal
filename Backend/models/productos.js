'use strict'
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const productSchema = schema( 
{
            codigo_barra : {
                type: String,
                unique: true,
                required: true
            },
            nombre_producto: {
                type: String,
                require: true
            },
            precio_unitario:{
                type: Number,
                require: true
            },
            unidad:{
                type: String,
                require:true
            },
            stock:{
                type: Number,
                require:true
            }
 
}
    );
module.exports = mongoose.model('productos', productSchema);














