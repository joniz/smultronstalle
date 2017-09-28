const express = require('express')
const bodyParser = require('body-parser')
const businessLayer = require('./BusinessLayer.js')
const typeCheck = require('type-check').typeCheck

var app = express();

app.use(bodyParser.json({}));


app.get('/users', function(request, response){



    businessLayer.getUsers(function(users, errors){
        if(errors.length == 0){
            response.json(users);

        }else{
            response.json(errors)
        }

    })

});

app.get('/users/:id', function (request, response) {
    var userId = request.params.id;
    const expectedStructure = '{id: String}';

/*
    if(!typeCheck(expectedStructure, id)){
        response.json(response.status(400).json(['Bad input']))
        return;
    }
*/
    businessLayer.getUser(userId, function (user,errors ) {
      if(errors.length == 0){
          response.json(user);
      }else{
          response.json(400).json(['This account doesnt exist']);
      }

    })

})

app.get('/users/:id/comments', function (request, response) {
    var userId = request.params.id;

    businessLayer.getUserComments(userId, function (comments, errors) {
        if(errors.length == 0){
            response.json(comments);
        }else{
            response.json(400).json(['There are no comments for this user'])
        }
    })
})
app.post('/users/add', function(request, response){

    const accountToCreate = request.body
    const expectedStructure = '{username: String, password: String}';

    if(!typeCheck(expectedStructure,accountToCreate)) {
        response.json(response.status(400).json(['Invalid input']));
        return;
    }
    businessLayer.addUser(accountToCreate, function (createdAccount, errors) {
        if(errors.length == 0){
            response.json("Ditt konto har skapats");
        }else{
            response.status(400).json(errors);
        }
    })

});

app.put('/users/:id'), function (request, response) {
    const userId = request.params.id;
    response.json('Fick en put-request');

}
app.get('/posts', function (request, response) {


    businessLayer.getPlaces(function (places, errors) {
        if(errors.length == 0){
            response.json(places);
        }else{
            response.status(400).json(errors);
        }
    })



})


app.listen(3000);