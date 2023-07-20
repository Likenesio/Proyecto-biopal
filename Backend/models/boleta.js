"use strict";
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const boletaSchema = schema({
  productos: [
    {
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
        unique: true,
      },
      nombre_producto: {
        type: String,
        required: true,
      }
    },
  ],
  numero_boleta: {
    type: String,
    required: true,
  },
  fecha_emision: {
    type: Date,
    require: true,
  },
  modo_pago: {
    type: String,
    require: true,
  },
  cliente: {
    type: schema.ObjectId,
    ref: "cliente",
  },

  total: {
    type: Number,
    require: true,
  },
  neto: {
    type: Number,
    require: true,
  },
  iva: {
    type: Number,
    require: true,
  },
  estado: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("boleta", boletaSchema);
