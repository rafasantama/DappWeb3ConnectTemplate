module.exports = (function(){
    'use strict'
    
    // Variables de entorno
    const dotenv = require('dotenv');
    dotenv.config();

    /**
     * Parametros basicos de publicacion del api
     */
    var api = {
        version: 1,
        name: '',
        port: process.env.PORT || 3000
    }

    /**
     * Configuracion general de json web token
     */
    var jwt = {
        config : {
            secretPassword: 'D0n-r1f4',
            expDays: 1,
            algorithm: 'HS512' /**HS256, HS384, HS512 and RS256 (ver problemas HS256) */
        }
    }

    /**Configuracion general para rateLimit */
    var apiLimiter = {
        config: {
            windowMs: 10*60*1000, // 10 minutos
            delayAfter: 0, //comienza a ralentizar las respuestas después de la primera solicitud
            //delayMs: 3 * 1000, //Ralentizar las respuestas posteriores en 3 segundos por solicitud
            max: 1500, //Comienza a bloquear después de 500 solicitudes
            message: "Demasiadas peticiones realizadas, intente de nuevo en 10 minutos"
        }
    }

    /**
     * Archivos ssl
     */
    var sslOptions = {
        key: '/Config/Ssl/certificate.key',
        cert: '/Config/Ssl/certificate.crt',
        ca: ['/Config/Ssl/certificate.ca.crt']        
    };

    /**Api publica */
    return {
        api: api,      
        jwt: jwt,
        apiLimiter: apiLimiter,
        sslOptions: sslOptions,
    }
})();
