const Pedido = require('../models/pedido');

const insert = (req, res) => {
  let pedido = new Pedido();
  pedido.numero_pedido = req.body.numero_pedido;
  pedido.cliente = req.body.cliente;
  pedido.usuario = req.body.usuario;
  
  pedido
    .save()
    .then((p) => {
      res.status(200).send({ p });
    })
    .catch((err) => {
      return res.status(500).send({ mensaje: "Error al insertar datos" });
    });
};

const eliminar = (req, res) => {
  let pedidoId = req.params._id;
  Pedido.findByIdAndDelete(pedidoId)
    .then((p) => {
      res.status(200).send({ message: "El pedido ha sido eliminado correctamente" });
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error al eliminar el pedido" });
    });
};

const actualizar = (req, res) => {
  let pedidoId = req.params._id;
  let numero_pedido = req.body.numero_pedido;
  let cliente = req.body.cliente;
  let usuario = req.body.usuario;
  
  Pedido.findByIdAndUpdate(
    pedidoId,
    {
      numero_pedido: numero_pedido,
      cliente: cliente,
      usuario: usuario,
    },
    { new: true }
  )
    .then((p) => {
      res.status(200).send({ p });
    })
    .catch((err) => {
      return res.status(500).send({ mensaje: "Error al actualizar el pedido" });
    });
};

const listar = (req, res) => {
  Pedido.find({})
    .populate("usuario")
    .populate("cliente")
    .exec()
    .then((p) => {
      res.status(200).send({ p });
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error al listar los pedidos" });
    });
};

const buscar = (req, res) => {
  let pedidoId = req.params._id;
  Pedido.findById(pedidoId)
    .populate("cliente")
    .populate("usuario")
    .exec()
    .then((p) => {
      res.status(200).send({ p });
    })
    .catch((err) => {
      return res.status(500).send({ message: "Error al buscar el pedido" });
    });
};

module.exports = {
  insert,
  eliminar,
  actualizar,
  listar,
  buscar
};
