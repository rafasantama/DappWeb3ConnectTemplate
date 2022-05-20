'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Cargamos el controlador
var kycController = require('../Controller/Kyc');
// Llamamos al router
var api = express.Router();
var jwt = require('jwt-simple');
let configFile = require('../Config/Config');
var jwtConfig = configFile.jwt.config;
var moment = require('moment');
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


// Creamos una ruta para los métodos que tenemos en nuestros controladores
api.post('/kyc', jtwMiddl, kycController.add);
// Todos los usuarios sin verificar
api.get('/kyc', jtwMiddl, kycController.getWithOutVerify);

// obtener kyc segun el id
api.get('/kyc/:id', jtwMiddl, kycController.get);
// verificar usuario
api.post('/kyc/:id', jtwMiddl, kycController.update)

// obtener kyc segun el email
api.get('/kyc/:id/email', jtwMiddl, kycController.getByEmail);
// obtener kyc segun la wallet
api.get('/kyc/:id/wallet', jtwMiddl, kycController.getByWallet);

// agregar imagenes
api.post('/kyc/:id/document', kycController.addDocument1);
api.post('/kyc/:id/document2', kycController.addDocument2);
// Exportamos la configuración
module.exports = api;