const path = require('path')
const express = require('express')
    // const hbs = require('hbs')

const app = express()

// define path for express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../views')

// setup handlebars view engine and path
app.set('view engine', 'hbs')
app.set('views', viewPath)

// setup static path to serve
app.use(express.static(publicDirPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'TP',
        description: ''
    })
})

app.get('/charts.hbs', (req, res) => {
    res.render('charts', {
        title: 'TP',
        description: ''
    })
})

app.get('/index.hbs', (req, res) => {
    res.render('index', {
        title: 'TP',
        description: ''
    })
})

app.get('/tables.hbs', (req, res) => {
    res.render('tables', {
        title: 'TP',
        description: ''
    })
})

module.exports = app