'use strict'
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userSchema = schema( 
{
            rut_usuario : {
                type: String,
                required: true
            },
            nombre_usuario: {
                type: String,
                require: true
            },
            contrasenia:{
                type: String,
                require: true
            },
            fono:{
                type: String,
                require:true
            },
            correo:{
                type: String,
                require:true
            },
            rol:{
                type: String,
                require: true
            }
 
}
    );
module.exports = mongoose.model('usuario', userSchema);




