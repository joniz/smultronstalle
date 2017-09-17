const express = require('express')
const bodyParser = require('body-parser')
//const typeCheck = require('type-check').typeCheck
var app = express()

app.use(bodyParser.json({}))

exports.getUsers = function() {

}



module.exports = {
    helloWorld: function () {
        return "Hello World";
    }
}