function ValidationError(error) {
    'use strict'

    var config = require('../Util/Enum');
    var logLevel = config.LogLevel;
    var httpStatus = config.httpStatusCodes;

    var name = 'ValidationError'
    var message = error.message
    var stacktrace = error.stack

    //Valores por defectos del handler
    var status = httpStatus.BadRequest
    var logLevel = logLevel.info

    /**
     * Funcion encargada de recuperar el error original lanzado
     */
    var getError = function(){
        return {name: name, message: message, stacktrace: stacktrace, status: status, logLevel: logLevel};
    }

    /**
     * Permite agregar un mensaje adicional (Concatena al inicio del mensaje de error un mensaje adicional)
     * @param {*} msg Mensaje
     */
    var setAdditionalMessage = function(msg){
        message = msg + message;
    }

    /**
     * Funcion encargada de retornar el mensaje generado en una plantilla enviada
     * @param {*} template Plantilla, variables {name}, {description}, {tracerout}
     */
    var getMessage = function(template){
        //Devolver segun el template
        return template
            .replace(/{date}/g, (new Date()).toISOString())
            .replace(/{name}/g, name)
            .replace(/{description}/g, message)
            .replace(/{tracerout}/g, stacktrace);;
    }

    /**
     * Funcion encargada de retornar el mensaje enviado al cliente generado en una plantilla enviada
     * @param {*} template Plantilla, variables {name}, {description}, {tracerout}
     */
    var getClientMessage = function(template){
        //Obtener los datos del error segun el modo de ejecucion
        let tracerout = config.Environment.debugMode?this.stacktrace: '';

        //Devolver segun el template
        let result = template
            .replace(/{date}/g, (new Date()).toISOString())
            .replace(/{name}/g, name)
            .replace(/{description}/g, message)
            .replace(/{tracerout}/g, tracerout);

        return result;
    }

    /**Api publica */
    return {
        getError: getError,
        getMessage: getMessage,
        getClientMessage: getClientMessage,
        status: status,
        logLevel: logLevel,
        setAdditionalMessage: setAdditionalMessage
    }
};

ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;

module.exports = ValidationError;