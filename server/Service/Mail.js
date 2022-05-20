

module.exports = (function(){

    'user strict'

    // Validador de Errores
    const ValidationError = require('../Handler/ValidationError');
    // mail 
    var nodemailer = require('nodemailer');
    // templates
    //const themes = require('../Templates/invitationMail');

    /**
     * Funcion encargada de enviar un correo
     * @param {*} mailData 
     */
    var sendMail = function (mailData) { 
        return new Promise(function (resolve, reject) {
            
            let mailTo = mailData.to;
            let subject = mailData.subject;
            let body = mailData.body;

            var transport = nodemailer.createTransport({
                host      : 'smtp.hostinger.co',
                port      :  465,
                //tls :{rejectUnauthorized: false},
                secure :true,
                auth: {
                    user: 'users@bancannabis.tech',
                    pass: '//Bancannabis77*+'
                }
            });

            // verificar si el server se encuentra activo
            transport.verify(function(error, success) {
                if (error) {
                    // devolver el error
                    reject(new ValidationError(new Error(error)));
                } else {
                    
                    // si hay disponibilidad
                    const mailOptions = {
                        //from: 'comunicaciones@parquedelemprendimiento.com',
                        from: 'users@bancannabis.tech',
                        to: mailTo,
                        subject: subject,
                        html: body
                    };

                    // Intentamos enviar el correo
                    transport.sendMail(mailOptions, function (err, info) {

                        if(err)
                          reject(new ValidationError(new Error(err)));
                        else
                          resolve("Email has been send!")
                    });
                }
            });
        });
    }

    // Metodos publicos
    return {
        sendMail: sendMail
    }

})();

