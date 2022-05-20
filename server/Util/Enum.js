module.exports = (function(){

    
    /**
     * Codigos de estado Http
     * http://microformats.org/wiki/rest/urls#Response_Codes
     * https://tools.ietf.org/html/rfc2616#section-10.4.4
     */
    var httpStatusCodes = {
        Ok : 200,
        InternalServerError : 500,
        BadRequest : 400,
        Unauthorized : 401,
        Forbidden: 403,
        NotFound: 404,
        UnsupportedMediaType: 415,
        Conflict: 409,
        PreconditionFailed: 412
    }

    /**
     * Niveles del log trasnaccional
     * 
     * A cada level se le da una prioridad entera específica. 
     * Cuanto mayor sea la prioridad, más importante será el mensaje y menor será la prioridad de enteros correspondiente. 
     * Por ejemplo, como se especifica exactamente en RFC5424, los niveles syslog se priorizan de 0 a 5 (de mayor a menor).
     * 
     *  { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
     */
    var LogLevel = { 
        0: { key:'error', sendMail: false, sendSlack: true},
        1: { key:'warn', sendMail: false, sendSlack: true},
        2: { key:'info', sendMail: false, sendSlack: false},
        3: { key:'verbose', sendMail: false, sendSlack: false},
        4: { key:'debug', sendMail: false, sendSlack: false},
        5: { key:'silly', sendMail: false, sendSlack: false}
    }

    /**
     * Mensajes de error segun los codigos de error http
     */
    var httpDefaultMessage = {
        500: 'Internal Server Error'
    } 

    var Environment = {
        debugMode: true
    }

    var slack = {
        webhook: ''
    }

    /**Api pública */
    return {
        httpStatusCodes: httpStatusCodes,
        LogLevel: LogLevel,
        httpDefaultMessage: httpDefaultMessage,
        Environment: Environment,
        slack: slack
    }

})();