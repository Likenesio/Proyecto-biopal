const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const insert = async (req, res) => {
  try {
    const salt = 12;
    const pass = req.body.contrasenia;
    const hashedPassword = await bcrypt.hash(pass, salt);

    const usuario = new Usuario({
      rut_usuario: req.body.rut_usuario,
      nombre_usuario: req.body.nombre_usuario,
      contrasenia: hashedPassword,
      fono: req.body.fono,
      correo: req.body.correo,
      rol: req.body.rol,
    });

    const createUsuario = await usuario.save();
    res.status(200).send({ createUsuario });
  } catch (err) {
    res.status(500).send({ message: 'Error al crear usuario' + err });
  }
};

const eliminar = async (req, res) => {
  try {
    const usuarioId = req.params._id;
    const usuario = await Usuario.findByIdAndDelete(usuarioId);
    res.status(200).send({ message: 'Se eliminó el usuario exitosamente' });
  } catch (err) {
    res.status(500).send({ message: 'Error al eliminar usuario' });
  }
};

const actualizar = async (req, res) => {
  try {
    const salt = 12;
    const pass = req.body.contrasenia;
    const hashedPassword = await bcrypt.hash(pass, salt);

    const usuarioId = req.params._id;
    const usuario = await Usuario.findByIdAndUpdate(
      usuarioId,
      {
        rut_usuario: req.body.rut_usuario,
        nombre_usuario: req.body.nombre_usuario,
        contrasenia: hashedPassword,
        fono: req.body.fono,
        correo: req.body.correo,
        rol: req.body.rol,
      },
      { new: true }
    );

    res.status(200).send({ message: 'Se ha actualizado el usuario exitosamente' });
  } catch (err) {
    res.status(500).send({ message: 'Error al actualizar usuario' });
  }
};

const listar = async (req, res) => {
  try {
    const usuarios = await Usuario.find({});
    res.status(200).send({ usuarios });
  } catch (err) {
    res.status(500).send({ message: 'Error al listar los usuarios' });
  }
};

const buscar = async (req, res) => {
  try {
    const usuarioId = req.params._id;
    const usuario = await Usuario.findById(usuarioId);
    res.status(200).send({ usuario });
  } catch (err) {
    res.status(500).send({ message: 'Error al buscar usuario' });
  }
};

const login = async (req, res) => {
  try {
    const { correo, contrasenia } = req.body;

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }

    const passMatch = await bcrypt.compare(contrasenia, usuario.contrasenia);
    if (!passMatch) {
      return res.status(401).send({ message: 'Contraseña inválida' });
    }

    const token = jwt.sign({ userId: usuario._id, rol: usuario.rol }, 'penelope', {
      expiresIn: '7d',
    });

    res.json({ token });
  } catch (error) {
    res.status(500).send({ message: 'Error al iniciar sesión' });
  }
};

module.exports = { insert, eliminar, actualizar, listar, buscar, login };
