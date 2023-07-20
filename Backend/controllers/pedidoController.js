const Pedido = require('../models/pedido');
var contador = 0;

const insert = (req, res) => {
  let pedido = new Pedido();
  Pedido.find({}).count().then((count)=>{
    if(count){
      contador = count;
      pedido.numero_pedido = contador +1;
      pedido.estado= req.body.estado;
      pedido.fecha=req.body.fecha;
      pedido.cliente = req.body.cliente;
      pedido.usuario = req.body.usuario;
      pedido.total = req.body.total
      pedido
        .save()
        .then((p) => {
          res.status(200).send({ p });
        })
        .catch((err) => {
          return res.status(500).send({ mensaje: "Error al insertar datos" });
        });
    }else{
        pedido.numero_pedido = 1;
        pedido.estado= req.body.estado;
        pedido.fecha=req.body.fecha;
        pedido.cliente = req.body.cliente;
        pedido.usuario = req.body.usuario;
        pedido.total = req.body.total
        pedido
          .save()
          .then((p) => {
            res.status(200).send({ p });
          })
          .catch((err) => {
            return res.status(500).send({ mensaje: "Error al insertar datos" });
          });
    }
    
  }).catch((error)=>{
    console.log(error, "error interno");
    
  }) 
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
  let fecha = req.body.fecha;
  let estado = req.body.estado;
  let cliente = req.body.cliente;
  let usuario = req.body.usuario;
  let total = req.body.total;
  
  Pedido.findByIdAndUpdate(
    pedidoId,
    {
      numero_pedido: numero_pedido,
      fecha: fecha,
      estado: estado,
      cliente: cliente,
      usuario: usuario,
      total:total
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
    .populate("cliente")
    .populate("usuario")
    .exec()
    .then((pedido) => {
      /* rescatar los pedidos
      let pedidos = pedido;
      filtrar los pedidos por fecha(según corresponda)
      let pedidosFiltrados = pedido.filter((ped) => Date(ped.fecha).match())
*/
      res.status(200).send({ pedido });
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
