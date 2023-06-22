const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const autenticarJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1]; 
    jwt.verify(token, "penelope", (err, usuario) => {
      if (err) {
        return res.status(403).json({ message: 'Token inválido' });
      }
      req.usuario = usuario;
      next();
    });
  } else {
    res.status(401).json({ message: 'Token no proporcionado' });
  }
};

const autorizarJwt = expressJwt({ secret: "penelope", algorithms: ["HS256"] }); 

module.exports = { autenticarJwt, autorizarJwt };


