var Factura = require('../models/factura');


const insert = (req, res) => {

       let factura = new Factura();
       factura.numero = req.body.numero;
       factura.neto = req.body.neto;
       factura.iva = req.body.iva;
       factura.fecha_emision = req.body.fecha_emision;
       factura.modo_pago = req.body.modo_pago;
       factura.total = req.body.total;
       factura.cliente = req.body.cliente;
       factura.usuario = req.body.usuario;
       factura
       .save()
       .then((facturaNueva)=>{
        res.status(200).send({facturaNueva});
       })
       .catch((err)=>{
        res.status(500).send({mensaje: "Error al inserta factura" + err});
       });

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
        .send({mensaje: "Error al eliminar factura"});
    });
};


const actualizar = (req, res) =>{
    let facturaId = req.params._id;
    numero = req.body.numero;
    neto = req.body.neto;
    iva = req.body.iva;
    fecha_emision = req.body.fecha_emision;
    modo_pago = req.body.modo_pago;
    total = req.body.total;
    cliente = req.body.cliente;
    usuario = req.body.usuario;
    Factura.findByIdAndUpdate(
    facturaId,
    {
      numero: numero,
      neto: neto,
      iva: iva,
      fecha_emision: fecha_emision,
      modo_pago: modo_pago,
      total: total,
      cliente: cliente,
      usuario: usuario,
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
    .populate("cliente")
    .populate("usuario")
    .exec()
    .then((factura)=>{
        res.status(200).send({factura});
    })
    .catch((err)=>{
        return res
        .status({mensaje: "Error al listar facturas"})
    });
};


const buscar = (req, res) => {
    let facturaId = req.params._id;
    Factura.findById(facturaId)
    .populate("cliente")
    .populate("usuario")
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
module.exports = {
    insert, 
    eliminar, 
    actualizar, 
    listar, 
    buscar
};