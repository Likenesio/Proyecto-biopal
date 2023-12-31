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
}


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
            message: "Error al buscar producto por ID"
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
        res.status(500).send({ message: "Error al buscar producto por codigo de barras" });
      });
  };

  const restarCantidadProducto = async (req, res) => {
    try {
      const productoId = req.params._id;
  
      // Verificar si el producto existe
      const producto = await Producto.findById(productoId);
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
  
      // Verificar si hay suficiente cantidad para restar (aquí restaremos 1 unidad)
      if (producto.stock < 1) {
        return res.status(400).json({ error: 'No hay suficiente cantidad para restar' });
      }
      const cantidad_producto = req.body.cantidad_producto;

      // Restar una unidad de la cantidad en stock y guardar el producto actualizado en la base de datos
      producto.stock -= cantidad_producto;
      await producto.save();
  
      res.json({ message: 'Cantidad restada exitosamente' });
    } catch (error) {
      console.error('Error al restar cantidades de productos', error);
      res.status(500).json({ error: 'Error al restar cantidades de productos' });
    }
  };

  const verificarStock = async (req, res) => {
    try {
      let productos = await Producto.find({}).exec();
       
    if (!productos || productos.length === 0) {
        return res.status(404).json({ error: 'No se encontraron productos' });
      }
  
      let lowStockProducts = productos.filter(producto => producto.stock < 10);
  
      res.json({ lowStock: lowStockProducts });

    } catch (error) {
      console.error('Error al verificar el stock:', error);

      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  const buscarPorNombreProducto = async (req, res) => {
    try {
      const nombreProducto = req.params.nombre_producto;
      console.log(nombreProducto)
  
      const product = await Producto.find({ nombre_producto: { $regex: nombreProducto, $options: 'i' } });
  
      if (product && product.length > 0) {
        res.status(200).send({ product: product });
      } else {
        res.status(404).send({ message: "Productos no encontrados" });
      }
    } catch (err) {
      res.status(500).send({ message: "Error al buscar productos por nombre" });
    }
  };

module.exports = {
    insert,
    eliminar,
    actualizar, 
    listar, 
    buscarPorID,
    obtenerPorCodigoBarras,
    restarCantidadProducto,
    verificarStock,
    buscarPorNombreProducto,

};
