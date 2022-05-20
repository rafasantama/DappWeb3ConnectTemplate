'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
var jwt = require('jwt-simple');
// Cargamos el controlador
var imageController = require('../Controller/Image');
// Llamamos al router
var api = express.Router();
var enume = require('../Util/Enum');
var httpStatus = enume.httpStatusCodes;
let configFile = require('../Config/Config');
var jwtConfig = configFile.jwt.config;
var moment = require('moment');

// Middleware token jwt
const jtwMiddleware = express.Router(); 
jtwMiddleware.use((req, res, next) => {

    let token = req.headers['x-access-token'];
    if(!token)
        token = req.headers['x-acces-token'];
        
    let payload = null;
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
    req.currentUser = payload.sub;
    next();


 });

//var md_auth = require('../middleware/authenticated');
// Creamos una ruta para los métodos que tenemos en nuestros controladores
api.get("/image/:id", imageController.getFileByName);
api.post("/image", imageController.add);
// Exportamos la configuración
module.exports = api;