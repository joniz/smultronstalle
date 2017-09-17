const express = require('express')
const bodyParser = require('body-parser')
const businessLayer = require('./BusinessLayer.js')
const typeCheck = require('type-check').typeCheck

var app = express();

app.use(bodyParser.json({}));

app.get('/', function(request, response){

    response.send('Startsidan för API')
});



app.post('/users', function(request, response){

    const accountToCreate = request.body
    const expectedStructure = '{username: String}';

    if(typeCheck(expectedStructure,accountToCreate)){
        response.json(["Grattis, du har gjort en POST-request"])

    }else{
        response.status(400).json(["Dålig input, försök igen"])
        return;
    }


    //businessLayer.getUsers(request, response);



});

app.listen(3000);