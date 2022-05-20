module.exports = (function(){
    'use strict'

    const mailTheme = require('../Templates/invitationMail');
    // Validador de Errores 
    const ValidationError = require('../Handler/ValidationError');
    // Servicio de correo
    var mailService = require('./Mail');

    // Modelos
    var userModel = require('../Model/User');
    
    var addProfileImg = function (data) {
        console.log('Upload profile IMG');
        return new Promise((resolve, reject) =>{

            existsUser(data.kycid)
            .then(() => {
                userModel.updateOne({kycid: data.kycid}, {$set: data})
                .then(result => {
                    console.log("Updated img Profile");
                    resolve(result)
                })
                .catch(err => {
                    console.log(err);
                    reject(new Error(new ValidationError("Error interno")));
                })
            })
            .catch(() => {
                userModel.insertMany([data])
                .then(result => {
                    console.log("Added img Profile");
                    resolve(result)
                })
                .catch(err => {
                    console.log(err);
                    reject(new Error(new ValidationError("Error interno")));
                })
            })
        })
    }

    var existsUser = function(kycid) {
        return new Promise((resolve, reject) =>{
            //buscar un user por un  id
            userModel.findOne( {"kycid": kycid}, (err, user) => {
                // Error en la petición
                if(err) reject(0);
                // No existen user
                if(!user) reject(0);
                resolve(1);
            });
        })
    }

    var getProfileImg = function (kycId) {
        return new Promise((resolve, reject) =>{
            //buscar un user por un  id
            userModel.findOne( {"kycid": kycId}, (err, user) => {
                // Error en la petición
                if(err) reject(new ValidationError(new Error('Error en la petición ' + err.message)));
                // No existen user
                if(!user) reject(new ValidationError(new Error('Usuario no existe')));
                console.log("Se obtuvo img user profile con KYC: " + kycId);
                // Retornamos la respuesta
                if(user)
                    resolve(user.profileimg);
                else
                    resolve('')
            });
        })
    }
    
    // Private methods //

    
    
    /** Api Pública */
    return {
        addProfileImg: addProfileImg,
        getProfileImg: getProfileImg,
    }

})();