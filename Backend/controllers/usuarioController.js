const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');


const insert = async (req, res) =>{
   
       let usuario = new Usuario();
       const salt = 12;
       const pass = req.body.contrasenia;
       usuario.rut_usuario = req.body.rut_usuario;
       usuario.nombre_usuario = req.body.nombre_usuario;
       usuario.contrasenia = await bcrypt.hash(pass, salt);
       usuario.fono = req.body.fono;
       usuario.correo = req.body.correo;
       usuario.rol = req.body.rol;
       usuario
       .save()
       .then((createUsuario)=>{
        res.status(200).send({createUsuario});
       })
       .catch((err)=>{
        res.status(500).send({message: "Error al crear usuario" + err});
       });

};

const eliminar = (req, res) =>{
    let usuarioId = req.params._id;
    Usuario.findByIdAndDelete(usuarioId)
    .then((usuario)=>{
        res.status(200).send({message: "Se elimino usuario exitosamente"})

    })
    .catch((err)=>{
        return res
        .status(500)
        .send({message: "Error al eliminar usuario"});
    });
};

const actualizar = async (req, res) =>{
    
    const salt = 12;
    const pass = req.body.contrasenia;
    let usuarioId = req.params._id;
    rut_usuario = req.body.rut_usuario;
    nombre_usuario = req.body.nombre_usuario;
    contrasenia = await bcrypt.hash(salt, pass);
    fono = req.body.fono;
    correo = req.body.correo;
    rol = req.body.rol;
    Usuario.findByIdAndUpdate(
        usuarioId,
        {
            rut_usuario: rut_usuario,
            nombre_usuario: nombre_usuario,
            contrasenia: contrasenia,
            fono: fono,
            correo: correo,
            rol: rol

        },
        {new: true}
    )
    .then((usuario)=>{
        res
        .status(200)
        .send({
            message:"Se ha actualizado usuario exitosamente"
        });
    })
    .catch((err)=>{
        return res
        .status(500)
        .send({
            message: "Error al actualizar usuario"
        })
    });
};

const listar = (req, res) =>{
    Usuario.find({})
    .then((usuario)=>{
        res.status(200).send({usuario})
    })
    .catch((err)=>{
        res
        .status(500)
        .send({message: "Error al listar los usuarios"})
    });
};

const buscar = (req, res) => {
    let usuarioId = req.params._id;
    Usuario.findById(usuarioId)
    .then((usuario)=>{
        res.status(200).send({usuario});
    })
    .catch((err)=>{
        return res
        .status(500)
        .send({message: "Error al buscar usuario"});
    });
};

const login = async (req, res) => {
    const { correo, contrasenia} = req.body;
    // Buscar al usuario en la base de datos por correo electrónico y contraseña
    try {
        
        const usuario = await Usuario.findOne({ correo })
        if (!usuario) {
            // Si no se encuentra el usuario, enviar una respuesta de error
            res.status(404).send({ message: 'Usuario no encontrado' });
        } 
        const passMatch = await bcrypt.compare(contrasenia, usuario.contrasenia)
        if(!passMatch){
            res.status(401).send ({message: 'Contraseña invalida'});
        }
        //creación de token( id, secreto y expiración)
        const token = jwt.sign({userId: usuario._id, rol: usuario.rol}, 'penelope', {expiresIn: '7d'});
          
        //enviar token
        res.json({token})

     } catch (error) {

         res.status(500).send({ message: 'Error al iniciar sesión' });
        
     }
      
  };

  module.exports = { insert,
     eliminar, 
     actualizar, 
     listar, 
     buscar, 
     login };