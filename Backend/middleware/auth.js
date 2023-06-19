const jwt = requere('jsonwebtoken');
const expressJwt = requere('express-jwt');


const autenticarJwt = (req, res, next)=>{
   const authCabeza = req.headers.authorization;
   if(authCabeza) {
    const token = authCabeza.split('')[1];
    jwt.verify(token, "penelope" , (err, usuario)=>{

    if(err){
        return res.status(403).json({message: 'token invalido'});
    }
    req.usuario = usuario;
    next();
   }) ;
   
}else{
    res.status(401).json({message: 'token no proporcionado'});
}

};

const autorizarJwt = expressJwt.expressjwt({secret: "penelope", algorithms:["HS256"]});

module.exports = {autenticarJwt, autorizarJwt};



