var Boleta = require("../models/boleta");
var Producto = require("../models/productos");

let contador = 0;

const insert = (req, res) => {
  try {
    Boleta.find({})
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

          const boleta = new Boleta({
            productos: req.body.productos,
            numero_boleta: contador + 1,
            fecha_emision: req.body.fecha_emision,
            pedido: req.body.pedido,
            total: total,
            cliente: req.body.cliente,
            neto: neto.toFixed(0), // Redondeado
            iva: iva.toFixed(0), // Redondeado
            estado: req.body.estado,
          });

          //console.log("boleta del backend: ", boleta);

          
          const createBoleta = boleta.save();
          res.status(200).json({ createBoleta });
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

          const boleta = new Boleta({
            productos: req.body.productos,
            numero_boleta: 1,
            fecha_emision: req.body.fecha_emision,
            total: total,
            pedido: req.body.pedido,
            cliente: req.body.cliente,
            neto: neto.toFixed(0), // Redondeado
            iva: iva.toFixed(0), // Redondeado
            estado: req.body.estado,
          });
          const createBoleta = boleta.save();
          res.status(200).json({ createBoleta });
        }
      })
      .catch((error) => {
        console.log(error, "error interno");
      });
  } catch (err) {
    res.status(500).json({ message: "Error al crear la boleta: " + err });
  }
};

const eliminar = (req, res) => {
  let boletaId = req.params._id;
  Boleta.findByIdAndDelete(boletaId)
    .then((boleta) => {
      res.status(200).send({ message: "Boleta eliminada exitosamente" });
    })
    .catch((err) => {
      return res.status(500).send({ mensaje: "Error al eliminar la boleta" });
    });
};

const actualizar = (req, res) => {
  let boletaId = req.params._id;
  numero_boleta = req.body.numero_boleta;
  productos = req.body.productos;
  neto = req.body.neto;
  iva = req.body.iva;
  total = req.body.total;
  fecha_emision = req.body.fecha_emision;
  estado = req.body.estado;
  pedido = req.body.pedido;
  cliente = req.body.cliente;
  Boleta.findByIdAndUpdate(
    boletaId,
    {
      numero_boleta: numero_boleta,
      productos: productos,
      neto: neto,
      iva: iva,
      total: total,
      fecha_emision: fecha_emision,
      estado: estado,
      pedido: pedido,
      cliente: cliente,
    },
    { new: true }
  )
    .then((boleta) => {
      res.status(200).send({
        mensaje: "Boleta actualizada exitosamente",
        boleta: boleta,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error al actualizar la boleta",
      });
    });
};

const listar = (req, res) => {
  Boleta.find({})
    //.populate("cliente")
    .populate({ path: "pedido", populate: { path: "cliente" } })
    .exec()
    .then((boleta) => {
      res.status(200).send({ boleta });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error al listar las boletas" });
    });
};

const buscar = (req, res) => {
  let boletaId = req.params._id;
  Boleta.findById(boletaId)
    //.populate("cliente")
    .populate({ path: "pedido", populate: { path: "cliente" } })
    .exec()
    .then((boleta) => {
      res.status(200).send({ boleta });
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error al buscar boleta" });
    });
};
const buscarPorNumero = (req, res) => {
  let boletaNumero = req.params.numero_boleta;
  Boleta.find({ numero_boleta: boletaNumero })
    //.populate("cliente")
    .populate({ path: "pedido", populate: { path: "cliente" } })
    .exec()
    .then((boleta) => {
      res.status(200).send({ boleta });
    })
    .catch((err) => {
      return res
        .status(500)
        .send({ message: "Error al buscar este número de boleta" });
    });
};
module.exports = {
  insert,
  eliminar,
  actualizar,
  listar,
  buscar,
  buscarPorNumero,
};
