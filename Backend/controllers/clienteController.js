var Cliente = require("../models/cliente");

const insert = (req, res) => {
  let cliente = new Cliente();
  cliente.rut = req.body.rut;
  cliente.nombre_cliente = req.body.nombre_cliente;
  cliente.contacto = req.body.contacto;
  cliente.giroemis = req.body.giroemis;
  cliente.email = req.body.email;
  cliente.direccion = req.body.direccion;
  cliente.comuna = req.body.comuna;
  cliente
    .save()
    .then((clienteNuevo) => {
      res.status(200).send({ clienteNuevo });
    })
    .catch((err) => {
      res.status(500).send({ mensaje: "error al insertar cliente:" + err });
    });
};

const eliminar = (req, res) => {
  let idcliente = req.params._id;
  Cliente.findByIdAndDelete(idcliente)
    .then((cliente) => {
      res.status(200).send({ mensaje: "Cliente eliminado exitosamente" });
    })
    .catch((err) => {
      return res
        .status(500)
        .send({ mensaje: "Error al eliminar cliente de la base de datos" });
    });
};

const actualizar = (req, res) => {
  let idcliente = req.params._id;
  rut = req.body.rut;
  nombre_cliente = req.body.nombre_cliente;
  contacto = req.body.contacto;
  giroemis = req.body.giroemis;
  email = req.body.email;
  direccion = req.body.direccion;
  comuna = req.body.comuna;

  Cliente.findByIdAndUpdate(
    idcliente,
    {
      rut: rut,
      nombre_cliente: nombre_cliente,
      contacto: contacto,
      giroemis: giroemis,
      email: email,
      direccion: direccion,
      comuna: comuna,
    },
    { new: true }
  )
    .then((client) => {
      res.status(200).send({
        mensaje: "Cliente actualizado exitosamente",
        cliente: client,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        mensaje: "Error al actualizar el cliente de la base de datos",
      });
    });
};

const listar = (req, res) => {
  Cliente.find({})
    .exec()
    .then((client) => {
      res.status(200).send({ client });
    })
    .catch((err) => {
      return res
        .status(500)
        .send({ mensaje: "Error al listar los clientes de la base de datos" });
    });
};
const buscarPorID = (req, res) => {
  let idCliente = req.params._id;
  Cliente.findById(idCliente)
    .then((client) => {
      res.status(200).send({ client });
    })
    .catch((err) => {
      return res
        .status(500)
        .send({ mensaje: "Error al buscar el cliente en la base de datos" });
    });
};
module.exports = {
  insert,
  eliminar,
  actualizar,
  listar,
  buscarPorID,
};
