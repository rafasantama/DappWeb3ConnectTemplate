module.exports = (function(){
    'use strict'
    
    // Enumeradores
    var enums = require('../Util/Enum');
    var mongoose = require('mongoose');
    var httpStatus = enums.httpStatusCodes;

    // Services
    //var mailService = require('../Service/Mail');

    var getFileByName = function(req, res, next){
        try {
            let fileName = req.params.id;
            if(fileName == "")
                return res.status(404).json({
                    err: 'Sin nombre de archivo'
                });

            var conn = mongoose.connection;
            let gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
                bucketName: "docs"
            });
            gridFsBucket.find({
                filename: fileName
            })
            .toArray((err, files) => {
                if (!files || files.length === 0) {
                    return res.status(404).json({
                        err: 'No file exists'
                    });
                }
                console.log("get Document:" + files[0].filename);
                gridFsBucket.openDownloadStreamByName(files[0].filename).pipe(res);
            });   

        } catch (err) {
            next(err);
        }
    }

    var add = function(req, res, next){
        //var componentId = req.params.id;
        try {
            
            var file = req.file;
            if(file){
                let resp = {
                    "imgName": file.filename
                }
                res.status(200).jsonp(resp);
            }
            else{
                res.status(500).jsonp({"name": "Error interno", "msg": "No se subio la imagen"});
            }

        } catch (error) {
            res.status(500).send({"error": "Error al subir el la iamgen. " + error});
        }
    }

    //Api publica
    return{    
        getFileByName: getFileByName,
        add: add
    }
})();