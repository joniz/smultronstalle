const express = require('express')
const bodyParser = require('body-parser')
const businessLayer = require('./BusinessLayer.js')
const typeCheck = require('type-check').typeCheck

var app = express();

app.use(bodyParser.json({}));


app.get('/', function(request, response){

    businessLayer.getUsers(function(users, errors){
        response.json(users);
    })

});



app.post('/users/add', function(request, response){

    const accountToCreate = request.body
    const expectedStructure = '{username: String, password: String}';

    if(!typeCheck(expectedStructure,accountToCreate)) {
        response.json(response.status(400).json(['Invalid input']));
        return;
    }
    businessLayer.addUser(accountToCreate, function (createdAccount, errors) {
        if(errors.length == 0){
            response.json(createdAccount);
        }else{
            res.status(400).json(errors);
        }
    })










});


app.listen(3000);