const express = require('express')
const bodyParser = require('body-parser')
//const typeCheck = require('type-check').typeCheck
var app = express()

app.use(bodyParser.json({}))

app.get('/index', function(request, response){

    response.send('Hello there')
})



app.get('/index/:id', function(request, response){

    response.send("Body: " + request.params.id)
})

app.listen(3000)