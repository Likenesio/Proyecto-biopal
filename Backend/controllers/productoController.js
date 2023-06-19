var Producto = require('../models/productos');


const insert = (req, res)=>{
        
            let producto = new Producto();
            producto.codigo_barra = req.body.codigo_barra;
            producto.nombre_producto = req.body.nombre_producto;
            producto.precio_unitario = req.body.precio_unitario;
            producto.unidad= req.body.unidad;
            producto.stock =req.body.stock;
            producto
            .save()
            .then((crearProducto)=>{
                res.status(200).send({crearProducto});
            })
            .catch((err)=>{
                res.status(500).send({message: "Error al crear producto" + err});
            });
};

const eliminar = (req, res) => {
    let productoId = req.params._id;
    Producto.findByIdAndDelete(productoId)
    .then((producto) =>{
        res.status(200).send({message:"Producto eliminado exitosamente"})
    })
    .catch((err)=>{
        return res
        .status(500)
        .send({message: "Error al eliminar producto"})
    });
     
};

const actualizar = (req, res) =>{
    let productoId = req.params._id;
    codigo_barra = req.body.codigo_barra;
    nombre_producto = req.body.nombre_producto;
    precio_unitario = req.body.precio_unitario;
    unidad = req.body.unidad;
    stock =req.body.stock;
    Producto.findByIdAndUpdate(
        productoId,
        {
            codigo_barra: codigo_barra,
            nombre_producto: nombre_producto,
            precio_unitario: precio_unitario,
            unidad: unidad,
            stock:stock
        },
        {new: true}
    )
    .then((product)=>{
        res
        .status(200)
        .send({
            message: "Producto actualizado exitosamente",
            product: product
        });
    })
    .catch((err)=>{
        return res
        .status(500)
        .send({
            message: "Error al actualizar producto"
        })
    });
};

const listar = (req, res) => {   
        Producto.find({})
        .then((product)=>{
            res.status(200).send({product});
        })
        .catch((err)=>{
            res
            .status(500)
            .send({message:"Error al listar productos"})
        });
};

const buscarPorID= (req, res) => {
    let productoId = req.params._id;
    Producto.findById(productoId)
    .then((product)=>{
        res.status(200).send({product})
    })
    .catch((err)=>{
        return res
        .status(500)
        .send({
            message: "Error al buscar producto"
        });
    });
};

const obtenerPorCodigoBarras = (req, res) => {
    let codigoBarra = req.params.codigo_barra;
    Producto.findOne({ codigo_barra: codigoBarra })
      .then((product) => {
        if (product) {
          res.status(200).send({ product });
        } else {
          res.status(404).send({ message: "Producto no encontrado" });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error al buscar producto" });
      });
  };
  

module.exports = {
    insert,
    eliminar,
    actualizar, 
    listar, 
    buscarPorID,
    obtenerPorCodigoBarras
};
