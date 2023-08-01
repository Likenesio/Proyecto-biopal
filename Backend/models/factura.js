'use strict'
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const factSchema = schema({
    productos: [
        {
          //conserva los precios a futuro
          productoId: {
            type: schema.Types.ObjectId,
            ref: "productos",
            required: true,
          },
          cantidad: {
            type: Number,
            required: true,
          },
          precio: {
            type: Number,
            required: true,
          },
          codigo_barras: {
            type: String,
            required: true,
          },
          nombre_producto: {
            type: String,
            required: true,
          }
        },
      ],

            numero_factura : {
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
            total:{
                type: Number,
                require: true
            },
            pedido:{
                type: schema.ObjectId,
                ref: "pedido"
            },
            cliente: {
                type: schema.ObjectId,
                ref: "cliente"
              },
             usuario: {
                type: schema.ObjectId,
                ref: "usuario"
              },                        
            estado:{
                type:String,
                require: true,
            }
});
module.exports = mongoose.model('factura', factSchema);


