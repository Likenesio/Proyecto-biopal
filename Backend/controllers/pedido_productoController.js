var Pedido_producto = require("../models/pedido_producto");

const insert = (req, res) => {
  let pedido_producto = new Pedido_producto();
  pedido_producto.pedido = req.body.pedido;
  pedido_producto.producto = req.body.producto;
  pedido_producto.cantidad_producto = req.body.cantidad_producto;
  pedido_producto.subtotal = req.body.subtotal;
  pedido_producto
    .save()
    .then((pp) => {
      res.status(200).send({ pp });
    })
    .catch((err) => {
      return res.status(500).send({ mensaje: "Error al insertar datos" });
    });
};

const eliminar = (req, res) => {
  let pedido_productoId = req.params._id;
  Pedido_producto.findByIdAndDelete(pedido_productoId)
    .then((pp) => {
      res
        .status(200)
        .send({ message: "El pedido producto ha sido eliminado cone exito" });
    })
    .catch((err) => {
      return res
        .status(500)
        .send({ message: `Error al borrar el pedido producto ${err}` });
    });
};

const actualizar = (req, res) => {
  let pedido_productoId = req.params._id;
  pedido = req.body.pedido;
  producto = req.body.producto;
  cantidad_producto = req.body.cantidad_producto;
  subtotal = req.body.subtotal;
  Pedido_producto.findByIdAndUpdate(
    pedido_productoId,
    {
      pedido: pedido,
      producto: producto,
      cantidad_producto: cantidad_producto,
      subtotal: subtotal,
    },
    { new: true }
  )
    .then((pp) => {
      res.status(200).send({ pp });
    })
    .catch((err) => {
      return res
        .status(500)
        .send({ mensaje: "Error al actualizar el pedido de la base de datos" });
    });
};

const listar = (req, res) => {
  Pedido_producto.find({})
    .populate("producto")
    .populate({ path: "pedido", populate: { path: "usuario" } })
    .populate({ path: "pedido", populate: { path: "cliente" } })
    .exec()
    .then((productoP) => {
      res.status(200).send({ productoP });
    })
    .catch((err) => {
      return res.status(500).send({
        mensaje:
          "Error al listar los productos los pedidos en la base de datos",
      });
    });
};

const buscarIdPedido = async (req, res) => {
  let pedidoID = req.params.pedido;
   await Pedido_producto.find({pedido: pedidoID})
    .populate("pedido")
    .populate('producto')
    .exec()
    .then((pedido_producto) => {
      
        res.status(200).send({ pedido_producto });
     
    })
    .catch((err) => {
      return res.status(500).send({
        mensaje: "No existe ese pedido",
      });
    });
};

const buscarPPId = (req, res) => {
  let pedido_productoId = req.params._id;
  Pedido_producto.findById(pedido_productoId)
    .populate("pedido")
    .populate("producto")
    .exec()
    .then((pedido_producto) => {
      res.status(200).send({ pedido_producto });
    })
    .catch((err) => {
      return res.status(500).send({
        mensaje: "Error al listar los productos del pedido de la base de datos",
      });
    });
};
module.exports = {
  insert,
  eliminar,
  actualizar,
  listar,
  buscarPPId,
  buscarIdPedido,
};
