'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Cargamos el controlador
var userController = require('../Controller/User');
// Llamamos al router
var api = express.Router();
var enume = require('../Util/Enum');
var httpStatus = enume.httpStatusCodes;

// Middleware token jwt
const jtwMiddl = express.Router(); 
jtwMiddl.use((req, res, next) => {

    let token = req.headers['x-access-token'];
    if(!token)
        token = req.headers['x-acces-token'];
        
    let passord = req.headers['hey!'];
    if (passord !== 'donrifa3*')
        return res.status(httpStatus.Unauthorized).send({'message': "Cant Access..."});

    /*let payload = null;
    if(!token) {
        return res.status(httpStatus.Unauthorized).send({'message': "Sin cabecera de autorización"});
    }
    try{
        payload = jwt.decode(token, jwtConfig.secretPassword, false, jwtConfig.algorithm);
    }catch(e){
        return res.status(httpStatus.Unauthorized).send({'error': "Token Invalido"});
    }

    //Verificar si el token expiro
    if(payload.exp <= moment().unix()) {
        return res.status(httpStatus.Unauthorized).send({'error': "Token expirado"});
    }
    req.currentUser = payload.sub;*/
    next();
});

// agregar imagenes
api.post('/user/:id/profileimg', userController.addProfileImg);
// Exportamos la configuración
module.exports = api;