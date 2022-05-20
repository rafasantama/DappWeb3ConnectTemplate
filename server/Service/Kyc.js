module.exports = (function(){
    'use strict'

    const mailTheme = require('../Templates/invitationMail');
    // Validador de Errores 
    const ValidationError = require('../Handler/ValidationError');
    // Servicio de correo
    var mailService = require('../Service/Mail');
    var userService = require('../Service/User');

    // Modelos
    var kycModel = require('../Model/Kyc');
    
    /**
     * Funcion encargada de agregar un nuevo registro kyc
     * @param {*} data Datos del registro kyc
    */
    var add = function (data) {
        return new Promise((resolve, reject) =>{
            kycModel.insertMany([data])
                .then(result => {

                    if(data.email){
                        let mailText = `A partir de este momento tus documentos están siendo examinados para verificarte como un usuario de la plataforma.<br/>
                                        <br/>
                                        Este proceso puede tardar entre 1 a 5 días hábiles según  la cantidad de peticiones que tengamos por delante, por tanto si este proceso tarda un poco te pedimos guardes un poco de paciencia.<br/>
                                        <br/>
                                        Recuerda que es muy importante que tus datos sean precisos y reales, al igual que las fotos de tus documentos para poder verificar rápidamente tu identidad.
                                        <br/><br/>Si tienes dudas resuélvelas en la sección de preguntas y respuestas <a href="https://donrifa.com/#faqs">FAQS</a> o contáctenos en en <a href="https://donrifa.com/#contact">formulario de contacto</a>.
                                        <br/>
                                        Hasta pronto!
                                        `;

                        let body = mailTheme.generic;
                        body = body.replace(/{htmlText}/g, mailText);
                        body = body.replace(/{tittle}/g, "Tus datos de registro KYC han sido recibidos");
                        body = body.replace(/{displayAccessButton}/g, "block");

                        // enviar correo con la info
                        mailService.sendMail({
                            to: data.email,
                            body: body,
                            subject: "Registro KYC enviado - Equitti"
                        });
                        mailService.sendMail({
                            to: "donrifa.co@gmail.com",
                            body: "nuevo kyc " + data.email,
                            subject: "nuevo kyc"
                        });
                        console.log("Mail enviado por Kyc");
                    }
                    
                    resolve(result);
                })
                .catch(err => {
                    reject(new ValidationError(new Error(err)));
                });
        })
    }

    var update = function (id, data) {
        console.log('Update KYC ' + data);
        return new Promise((resolve, reject) =>{
            kycModel.updateOne({_id: id}, {$set: data})
                .then(async result => {
                    console.log("KYC Updated");
                    let kycData = await get(id)
                    let mailText = "Hi " + kycData.name + " " + kycData.lastName + "!<br/><br/>Your account and identity have been verified correctly<br/>Now you can make use of all our services."
                    let body = mailTheme.generic;
                    body = body.replace(/{htmlText}/g, mailText);
                    body = body.replace(/{tittle}/g, "Verification Result");
                    body = body.replace(/{displayAccessButton}/g, "block");
                    body = body.replace(/{buttonText}/g, "Go Equitti");
                    // enviar correo con invitacion
                    mailService.sendMail({
                        to: kycData.email,
                        body: body,
                        subject: "Equitti Verification"
                    });

                    resolve(result)
                })
                .catch(err => {
                    console.log(err);
                    reject(new Error(new ValidationError("Error interno")));
                });
        })
    }

    var addDocument1 = function (data) {
        console.log('Upload Document 1');
        return new Promise((resolve, reject) =>{
            kycModel.updateOne({_id: data.kycId}, {$set: data})
                .then(result => {
                    console.log("added Document:");
                    resolve(result)
                })
                .catch(err => {
                    console.log(err);
                    reject(new Error(new ValidationError("Error interno")));
                });
        })
    }

    var addDocument2 = function (data) {
        console.log('Upload Document 2');
        return new Promise((resolve, reject) =>{
            kycModel.updateOne({_id: data.kycId}, {$set: data})
                .then(result => {
                    console.log("added Document:");
                    resolve(result)
                })
                .catch(err => {
                    console.log(err);
                    reject(new Error(new ValidationError("Error interno")));
                });
        })
    }

    var get = function (kycId) {
        return new Promise((resolve, reject) =>{
            //buscar un kyc por un  id
            kycModel.findOne( {"_id": kycId}, (err, kyc) => {
                // Error en la petición
                if(err) reject(new ValidationError(new Error('Error en la petición ' + err.message)));
                // No existen kyc
                if(!kyc) reject(new ValidationError(new Error('El KYC no es válido')));
                console.log("Se obtuvo KYC con ID: " + kycId);
                // Retornamos la respuesta
                console.log(kyc)
                resolve(kyc);
            });
        })
    }

    var getWithOutVerify = function (kycId) {
        return new Promise((resolve, reject) =>{
            //buscar un kyc por un  id
            kycModel.find({}, (err, kycList) => {
                // Error en la petición
                if(err) reject(new ValidationError(new Error('Error en la petición ' + err.message)));
                // No existen kyc
                if(!kycList) reject(new ValidationError(new Error('El KYC no es válido')));
                // Retornamos la respuesta
                console.log(kycList)
                resolve(kycList);
            });
        })
    }

    var getByEmail = function (email) {
        return new Promise((resolve, reject) =>{
            //buscar un kyc por un  id
            kycModel.findOne( {"email": email}, (err, kyc) => {
                // Error en la petición
                if(err) reject('Error en la petición ' + err.message);
                // No existen kyc
                if(!kyc || kyc == null) {
                    reject('El KYC no existe para ' + email);
                    return
                }
                console.log("Se obtuvo KYC con email: " + email);
                if(kyc) {
                    if(!kyc.accountActive) {
                        kyc['accountActive'] = 0
                    }
                }
                // Retornamos la respuesta
                resolve(kyc);
            });
        })
    }

    var getByWallet = function (wallet) {
        return new Promise((resolve, reject) =>{
            //buscar un kyc por un  id
            kycModel.findOne( {"wallet": wallet}, (err, kyc) => {
                // Error en la petición
                if(err) reject('Error en la petición ' + err.message);
                // No existen kyc
                if(!kyc || kyc == null) {
                    reject('El KYC no existe para ' + wallet);
                    return
                }
                console.log("Se obtuvo KYC con wallet: " + wallet);
                if(kyc) {
                    if(!kyc.accountActive) {
                        kyc['accountActive'] = 0
                    }
                }

                userService.getProfileImg(kyc._id.toString())
                .then(imgProfileName =>{
                    kyc = kyc.toJSON();
                    kyc['imgprofile'] = imgProfileName
                    // Retornamos la respuesta
                    resolve(kyc);
                })
                .catch(()=>{
                    kyc = kyc.toJSON();
                    // Retornamos la respuesta
                    resolve(kyc);
                })
            });
        })
    }

    var getByPublicKey = function (publicKey) {
        return new Promise((resolve, reject) =>{
            //buscar un kyc por un  id
            kycModel.findOne( {"wallet": publicKey}, (err, kyc) => {
                // Error en la petición
                if(err) reject('Error en la petición ' + err.message);
                // No existen kyc
                if(!kyc) {
                    console.log('El KYC no existe for ' + publicKey)
                    reject();
                }
                console.log("Se obtuvo KYC con wallet: " + publicKey);
                
                userService.getProfileImg(kyc._id.toString())
                .then(imgProfileName =>{
                    kyc.imgprofile = imgProfileName
                    // Retornamos la respuesta
                    resolve(kyc);
                })
                .catch(()=>{
                    // Retornamos la respuesta
                    resolve(kyc);
                })
            });
        })
    }
    

    // Private methods //

    
    
    /** Api Pública */
    return {
        add: add,
        addDocument1: addDocument1,
        addDocument2:addDocument2,
        get: get,
        getByPublicKey: getByPublicKey,
        getByEmail: getByEmail,
        update: update,
        getWithOutVerify: getWithOutVerify,
        getByWallet: getByWallet
    }

})();