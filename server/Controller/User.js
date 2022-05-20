module.exports = (function(){
    'use strict'
    
    // Cargamos modelos
    // var Kyc = require('../Model/Kyc');
    // Validador de Errores
    const ValidationError = require('../Handler/ValidationError');

    // Enumeradores
    var enums = require('../Util/Enum');
    var httpStatus = enums.httpStatusCodes;

    // Services
    var userService = require('../Service/User');
    /**
     * Metodo encargado de guardar la imagen de perfil
     * @param {*} req 
     * @param {*} res 
     */
    var addProfileImg = function (req, res, next) {
        try{

            var userData = {
                kycid: req.params.id
            };
            // Obtener el archivo
            var file = req.file;

            // verificar que la imagen se subio correctamente
            if(!file) next(new ValidationError(new Error("can't upload image")));

            // Asignamos la relacion del archivo con el nombre
            userData.profileimg = file.filename;
            userService
                .addProfileImg(userData)
                .then(result => {
                    res.status(httpStatus.Ok).send({ "result": result })
                })
                .catch(err => {
                    next(err);
                });
        }
        catch(err){
            next(new ValidationError(new Error(err)));
        };
    }

    // Obtener la imagen de perfil
    var getProfileImg = function(req, res, next){
        try {
            userService
                .getProfileImg(req.params.id)
                .then(user => {
                    res.status(httpStatus.Ok).send({user});
                })
                .catch(err => {
                    next(err);
                });            
        } catch (err) {
            next(new ValidationError(new Error(err)));
        }
    }
            
    //Api publica
    return{
        getProfileImg: getProfileImg,
        addProfileImg: addProfileImg,
    }
})();