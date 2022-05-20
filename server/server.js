// Ecmascript 6
'use strict'
var app = require('../src/app')
// require('./appServer')(app)
var config = require("./Config/Config")

// HTTP
app.listen(config.api.port, () => {
    console.log("Servidor corriendo en http://localhost:" + config.api.port + "/api/v1/ y Sitio web en http://localhost:" + config.api.port)
})
