/**
 * Este servidor se integra al aplicativo web por su estructuracion inicial, permite 
 * que los sitios publicados sean dinamicos y muy rapidos, permitiendo acceder a toda la 
 * logica del negocio dentro del mismo proyecto
 * 
 * Creación: Julián García
 * Fecha: 27/01/2022
 * Para: Bits Ingenieria
 * 
 * @param {app Express()} app Referencia del objeto app del express
 * @returns app
 */

// Toda la configuracion del servidor
module.exports = function(app) {
    'use strict'
    var bodyParser = require('body-parser')
    var handlerError = require('./Handler/ErrorHandler')
    var rateLimit = require('express-rate-limit') //Middleware fuerza bruta
    // Importamos las rutas
    var KycRouter = require('./Route/Kyc')
    var ImageRouter = require('./Route/Image')
    var UserRouter = require('./Route/User')

    var meta = require('./Config/Config')
    require('dotenv').config()
    var mongoCloud = "mongodb+srv://" + process.env.DON_RIFA_USER_MONGO + ":"+ process.env.DON_RIFA_PWD_MONGO + "@cluster0.vp7pv.mongodb.net/test?retryWrites=true&w=majority"
    var mongoose = require('mongoose')
    var multer  = require('multer')
    const GridFsStorage = require('multer-gridfs-storage')
    const crypto = require("crypto")
    const path = require("path")
    const Grid = require('gridfs-stream')

    // Biblioteca de imagenes
    const MgPromise = mongoose.connect(mongoCloud, { useNewUrlParser: true, useUnifiedTopology: true })
    mongoose.connection.on('connected', ()=>{
        console.log("Conectado a mongo")
    })
    // Si la conexion arroja errores
    mongoose.connection.on('error', (err)=> {
        console.log('handle mongo errored connections: ' + err)
    })
    // Cuendo la conexion es desconectada
    mongoose.connection.on('disconnected', ()=>{  
        console.log('Mongoose default connection disconnected')
    })
    
    const conn = mongoose.connection
    let gfs
    conn.once('open',() => {
        gfs = Grid(conn, mongoose.mongo)
        gfs.collection('images')
    })

    const storage = new GridFsStorage({
        db: MgPromise,
        file: (req, file) => {
            return new Promise((resolve, reject) => {
                crypto.randomBytes(16, (err, buf) => {
                    if (err) {
                        return reject(err)
                    }
                    const filename = buf.toString("hex") + path.extname(file.originalname)
                    const fileInfo = {
                        filename: filename,
                        bucketName: "docs"
                    }
                    resolve(fileInfo)
                })
            })
        }
    })
    const upload = multer({storage}).single('image1')
    app.use(upload)

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, hey!")
        
        next()
    }) 
    //Configuramos bodyParser para que convierta el body de nuestras peticiones a JSON
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())
    //env
    //app.use(dotenv)
    // Cargamos las rutas
    app.use('/api/v1', KycRouter)
    app.use('/api/v1', ImageRouter)
    app.use('/api/v1', UserRouter)

    //cargar middlewares
    //Asignar el Error handling middleware
    app.use(handlerError.http)

    //Asignar middleware encargado de limitar fuerza bruta
    var apiLimiter = new rateLimit(meta.apiLimiter.config)
    app.use('/api/v1', apiLimiter)
}