'use strict'
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const clientSchema = schema( 
{
            rut : {
                type: String,
                required: true
            },
            nombre_cliente: {
                type: String,
                require: true
            },
            contacto:{
                type: String,
                require:true
            },
            giroemis:{
                type: String,
                require:true
            },
            email:{
                type: String,
                require:true
            },
            direccion:{
                type: String,
                require: true
            },
            comuna:{
                type: String,
                require:true
            }
 
}
    );
module.exports = mongoose.model('cliente', clientSchema);


