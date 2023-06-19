var Boleta = require('../models/boleta');


const insert = (req, res) => {
       let boleta = new Boleta();
       boleta.numero_boleta = req.body.numero_boleta;
       boleta.fecha_emision = req.body.fecha_emision;
       boleta.modo_pago = req.body.modo_pago;
       boleta.total = req.body.total;
       boleta.usuario = req.body.usuario;
       boleta.neto = req.body.neto;
       boleta
       .save()
       .then((createBoleta)=>{
       res.status(200).send({createBoleta});
      })
       .catch((err)=>{
        res.status(500).send({message: "Error al crear la boleta:" + err});
       });

};

const eliminar = (req, res) => {
    let boletaId = req.params._id;
    Boleta.findByIdAndDelete(boletaId)
    .then((boleta)=>{
        res.status(200).send({ message: "Boleta eliminada exitosamente"});
    })
    .catch((err) => {
      return res
      .status(500)
      .send({mensaje: "Error al eliminar la boleta"});
    });
};


const actualizar = (req, res) => {
    let boletaId = req.params._id;
    numero_boleta = req.body.numero_boleta;
    neto = req.body.neto;
    fecha_emision = req.body.fecha_emision;
    modo_pago = req.body.modo_pago;
    total = req.body.total;
    usuario = req.body.usuario;
    Boleta.findByIdAndUpdate(
        boletaId,
        {
            numero_boleta: numero_boleta,
            neto: neto,
            fecha_emision: fecha_emision,
            modo_pago: modo_pago,
            total: total,
            usuario: usuario
           
        },
        {new: true}

    )
    .then((boleta)=>{
        res
        .status(200)
        .send({
            mensaje: "Boleta actualizada exitosamente",
            boleta:boleta
        });
    })
    .catch((err)=>{
       return res
       .status(500)
       .send({
        message: "Error al actualizar la boleta"
       })
    });
                     
};

const listar = (req, res) =>{
    Boleta.find({})
    .populate("usuario")
    .exec()
    .then((boleta) => {
        res.status(200).send({boleta});
    })
    .catch((err)=>{
        res
        .status(500)
        .send({message:"Error al listar las boletas"})
    });
};

const buscar = (req, res) =>{
    let boletaId = req.params._id;
    Boleta.findById(boletaId)
    .populate("usuario")
    .exec()
    .then((boleta)=>{
    res.status(200).send({boleta});
    })
    .catch((err)=>{
        return res
        .status(500)
        .send({message: "Error al buscar boleta"});
    });
    
};
module.exports = {
    insert, 
    eliminar, 
    actualizar, 
    listar, 
    buscar
};