module.exports = (function(){
    'use strict'
    
    //let logger = require('./Logger');
    var config = require('../Util/Enum');
    var logLevel = config.LogLevel;
    var httpStatus = config.httpStatusCodes;
    var httpDefaultMessage = config.httpDefaultMessage;
    let template = '[{date} - {name}]: Description: {description} Trace: {tracerout}';

    /**
     * Funcion encargada de controlar los mensajes de error del sistema
     * Realiza el proceso del syslog
     * @param {*} error Clase Error
     */
    var logError = function(error){
        //Obtener el error interno (Si lo tiene)
        let message = error.getMessage?error.getMessage(template):undefined || (error.message + ' stack: ' + error.stack);        
        //Obtener el nivel segun el tipo de error
        let level = error.logLevel /*|| config.sysLog.error;*/
        //Registrar el error segun su nivel
        //logger.log(level, message);
        console.log(message);
    }
    
    /**
     * Errores generados en promesas no capturadas
     */
    process.on('unhandledRejection', function (reason, p) {
        //Si alguna promesa genera un error no capturado, se lanza el error para el posterior registro
        throw reason;
    });

    /**
     * Errores no capturados en el sistema.
     */
    process.on('uncaughtException', function (error) {
        //Registar el error
        logError(error);
        /*Pendiente por implementar, si algun error para la aplicacion, se debe reiniciar
        if (!errorManagement.handler.isTrustedError(error))
            process.exit(1);*/
    });

    /**
     * Middleware encargado de controlar los errores que se generan en una peticion http(s)
     * @param {*} error Error generado
     * @param {*} req Request
     * @param {*} res Response
     * @param {*} next Callback de continuacion de ejecucion
     */
    var http = function(error, req, res, next){
        if(error.setAdditionalMessage) error.setAdditionalMessage("Endpoint: [" + req.url + '] ');
        //Registrar el error
        logError(error);
        //Recuperar el status segun el error
        let status = error.status || httpStatus.InternalServerError;
        //Recuperar el mensaje segun el error
        let message = error.getClientMessage?error.getClientMessage(template):undefined || httpDefaultMessage[httpStatus.InternalServerError];        
        //Responder la peticion http(s) con el error indicado
        res.status(status).jsonp(message);
    }

    /**Api publica */
    return {
        logError: logError,
        http: http
    }
})();
