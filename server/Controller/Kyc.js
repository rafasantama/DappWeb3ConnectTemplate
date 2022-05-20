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
    var kycService = require('../Service/Kyc');

    /**
     * Metodo encargado de guardar la información del registo KYC
     * @param {*} req 
     * @param {*} res 
     */
    var add = function (req, res, next) {
        try{
            kycService
                .add(req.body)
                .then(result => {
                    console.log("added ID:" + result[0].id);
                    res.status(httpStatus.Ok).send({ id: result[0].id })
                })
                .catch(err => {
                    next(err);
                });
        }
        catch(err){
            next(new ValidationError(new Error(err)));
        };
    }

    var update = function (req, res, next) {
        try{
            kycService
                .update(req.params.id, req.body) // kycId obligatorio
                .then(result => {
                    res.status(httpStatus.Ok).send({ id: req.params.id })
                })
                .catch(err => {
                    next(err);
                });
        }
        catch(err){
            next(new ValidationError(new Error(err)));
        };
    }

    /**
     * Metodo encargado de guardar el primer documento para la información del registo KYC
     * @param {*} req 
     * @param {*} res 
     */
    var addDocument1 = function (req, res, next) {
        try{

            var kycData = {
                kycId: req.params.id
            };
            // Obtener el archivo
            var file = req.file;

            // verificar que la imagen se subio correctamente
            if(!file) next(new ValidationError(new Error("can't upload image")));

            // Asignamos la relacion del archivo con el nombre
            kycData.sourceDocument1 = file.filename;
            kycService
                .addDocument1(kycData)
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

    /**
     * Metodo encargado de guardar la segunda imagen del documento para la información del registo KYC
     * @param {*} req 
     * @param {*} res 
     */
    var addDocument2 = function (req, res, next) {
        try{

            var kycData = {
                kycId: req.params.id
            };
            // Obtener el archivo
            var file = req.file;
            // verificar que la imagen se subio correctamente
            if(!file) next(new ValidationError(new Error("can't upload image")));
            
            // Asignamos la relacion del archivo con el nombre
            kycData.sourceDocument2 = file.filename;
            kycService
                .addDocument2(kycData)
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

    // Obtener un KYC segun el ID
    var get = function(req, res, next){
        try {
            kycService
                .get(req.params.id)
                .then(kyc => {
                    res.status(httpStatus.Ok).send({kyc});
                })
                .catch(err => {
                    next(err);
                });            
        } catch (err) {
            next(new ValidationError(new Error(err)));
        }
    }

    var getWithOutVerify = function(req, res, next){
        try {
            kycService
                .getWithOutVerify(req.params.id)
                .then(kycList => {
                    res.status(httpStatus.Ok).send(kycList);
                })
                .catch(err => {
                    next(err);
                });            
        } catch (err) {
            next(new ValidationError(new Error(err)));
        }
    }

    var getByEmail = function(req, res, next){
        try {
            kycService
                .getByEmail(req.params.id)
                .then(kyc => {
                    kyc = kyc.toJSON();
                    kyc['id'] = kyc._id.toString()
                    res.status(httpStatus.Ok).send({kyc});
                })
                .catch(err => {
                    next(new ValidationError(new Error(err)));
                });   
            
        } catch (err) {
            next(new Error(err));
        }
    }

    var getByWallet = function(req, res, next){
        try {
            kycService
                .getByWallet(req.params.id)
                .then(kyc => {
                    kyc['id'] = kyc._id.toString()
                    res.status(httpStatus.Ok).send({kyc});
                })
                .catch(err => {
                    next(new ValidationError(new Error(err)));
                });   
            
        } catch (err) {
            next(new Error(err));
        }
    }
    
    var getByPublicKey = function(req, res, next){
        try {
            kycService
                .getByPublicKey(req.params.id)
                .then(kyc => {
                    kyc = kyc.toJSON();
                    kyc['id'] = kyc._id.toString()
                    res.status(httpStatus.Ok).send({kyc});
                })
                .catch(err => {
                    next(new ValidationError(new Error(err)));
                });   
            
        } catch (err) {
            next(new ValidationError(new Error(err)));
        }
    }

    //Api publica
    return{
        add: add,
        addDocument2: addDocument2,
        addDocument1: addDocument1,
        get: get,
        getByEmail: getByEmail,
        getByWallet: getByWallet,
        getByPublicKey: getByPublicKey,
        update: update,
        getWithOutVerify: getWithOutVerify,
    }
})();