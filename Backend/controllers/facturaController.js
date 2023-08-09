var Factura = require('../models/factura');
const productos = require('../models/productos');
var Producto = require("../models/productos");
const usuario = require('../models/usuario');

let contador = 0;

const insert = (req, res) => {
    try {
      Factura.find({})
        .count()
        .then((count) => {
          if (count) {
            contador = count;
            let productos = req.body.productos;
            let totalVenta = 0;
  
            for (const producto of productos) {
              const productoEnDB = Producto.findById(producto.productoId).exec();
              if (productoEnDB) {
                totalVenta += Number(producto.precio) * Number(producto.cantidad);
              }
            }
  
            //const neto = totalVenta - totalVenta * 0.19; 
            const neto = totalVenta;
            const iva = totalVenta * 0.19;
            const total = totalVenta + iva;
  
            const factura = new Factura({
              productos: req.body.productos,
              numero_factura: contador + 1,
              fecha_emision: req.body.fecha_emision,
              pedido: req.body.pedido,
              total: total.toFixed(0),
              cliente: req.body.cliente,
              usuario: req.body.usuario,
              neto: neto.toFixed(0), // Redondeado
              iva: iva.toFixed(0), // Redondeado
              estado: req.body.estado,
            });
  
            //console.log("factura del backend: ", factura);

            const createFactura = factura.save();
            res.status(200).json({ createFactura });
          } else {
            let productos = req.body.productos;
            let totalVenta = 0;
  
            for (const producto of productos) {
              const productoEnDB = Producto.findById(producto.productoId).exec();
              if (productoEnDB) {
                totalVenta += Number(producto.precio) * Number(producto.cantidad);
              }
            }
  
            const neto = totalVenta;
            const iva = totalVenta * 0.19;
            const total = totalVenta + iva;
  
            const factura = new Factura({
              productos: req.body.productos,
              numero_factura: 1,
              fecha_emision: req.body.fecha_emision,
              total: total.toFixed(0),
              pedido: req.body.pedido,
              cliente: req.body.cliente,
              usuario: req.body.usuario,
              neto: neto.toFixed(0), // Redondeado
              iva: iva.toFixed(0), // Redondeado
              estado: req.body.estado,
            });
            const createFactura = factura.save();
            res.status(200).json({ createFactura });
          }
        })
        .catch((error) => {
          console.log(error, "error interno");
        });
    } catch (err) {
      res.status(500).json({ message: "Error al crear la factura: " + err });
    }
  };


const eliminar = (req, res) =>{
    let facturaId = req.params._id;
    boleta.findByIdAndDelete(facturaId)
    .then((factura)=>{
        res.status(200).send({mensaje: "Factura eliminada exitosamente"});
    })
    .catch((err)=>{
        return res
        .status(500)
        .send({mensaje: "Error al eliminar la factura"});
    });
};


const actualizar = (req, res) =>{
    let facturaId = req.params._id;
    numero_factura = req.body.numero_factura;
    productos = req.body.productos;
    neto = req.body.neto;
    iva = req.body.iva;
    fecha_emision = req.body.fecha_emision;
    pedido = req.body.pedido;
    usuario=req.body.usuario;
    total = req.body.total;
    cliente = req.body.cliente;
    estado = req.body.estado;
    
    Factura.findByIdAndUpdate(
    facturaId,
    {
      numero_factura: numero_factura,
      productos:productos,
      neto: neto,
      iva: iva,
      fecha_emision: fecha_emision,
      pedido: pedido,
      total: total,
      cliente: cliente,
      usuario: usuario,
      estado: estado,
    },
    {new: true}
    )
    .then((factura)=>{
        res
        .status(200)
        .send({
            mensaje: "Factura actualizada exitosamente",
            factura:factura,
        });
    })
    .catch((err)=>{
        return res
        .status(500)
        .send({
            mensaje: "Error al actualizar la factura"
        });

    });
                     
};


const listar = (req, res)=>{
    Factura.find({})
    //.populate("cliente")
    //.populate("usuario")
    .populate({ path: "pedido", populate: { path: "cliente" }, populate: { path: "usuario" } })
    .exec()
    .then((factura)=>{
        res.status(200).send({factura});
    })
    .catch((err)=>{
        return res
        .status({mensaje: "Error al listar facturas"});
    });
};


const buscar = (req, res) => {
    let facturaId = req.params._id;
    Factura.findById(facturaId)
    //.populate("cliente")
    //.populate("usuario")
    .populate({ path: "pedido", populate: { path: "usuario" } })
    .populate({ path: "pedido", populate: { path: "cliente" } })
    .exec()
    .then((factura)=>{
        res.status(200).send({factura});
    })
    .catch((err)=>{
        return res
        .status(500)
        .send({mensaje: "Error al buscar factura"});
    });
};

const buscarPorNumeroFactura = (req, res) => {
    let facturaNumero = req.params.numero_factura;
    Factura.find({ numero_factura: facturaNumero })
      //.populate("cliente")
      .populate({ path: "pedido", populate: { path: "cliente" } })
      .populate({ path: "pedido", populate: { path: "usuario" } })
      .exec()
      .then((factura) => {
        res.status(200).send({ factura });
      })
      .catch((err) => {
        return res
          .status(500)
          .send({ message: "Error al buscar este número de factura" });
      });
  };
module.exports = {
    insert, 
    eliminar, 
    actualizar, 
    listar, 
    buscar,
    buscarPorNumeroFactura,
};