const express = require('express')
const bodyParser = require('body-parser')
const businessLayer = require('./BusinessLayer.js')
const typeCheck = require('type-check').typeCheck
const jwt = require('jsonwebtoken')

global.secret = "litehemligtbara";
var app = express();

var multer = require('multer');
var multerS3 = require('multer-s3')
var AWS = require('aws-sdk');
var fs = require('fs');
S3FS = require('s3fs');

var credentials = new AWS.Credentials(
    "AKIAJ6QKD3DZ4V7R5JIA",
    "M3RLj0SFZQevLxKnQnicDtLvws6dY8Brv5djBZ54"
)

var s3 = new AWS.S3({
    credentials: credentials,
    region: "eu-west-1"


})
global.upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'linusbucket',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

app.use(bodyParser.json({}));

app.post('/upload', upload.single('avatar'), function (req, res, next) {


    console.log(req.file.location)
    res.send('Successfully uploaded')

})
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



    /*if(!typeCheck(expectedStructure,accountToCreate)) {
        response.json(response.status(400).json(['Invalid input']));
        return;
    }
    */
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


    businessLayer.getPosts(function (places, errors) {
        if(errors.length == 0){
            response.json(places);
        }else{
            response.status(400).json(errors);
        }
    })



})
app.post('/login', function (request, response) {
    const accountToLogin = request.body;
    const expectedStructure = '{username: String, password: String}';

    /*if(!typeCheck(expectedStructure,accountToLogin)) {
        response.json(response.status(400).json(['Invalid input']));
        return;
    }
    */
    if(request.body.code == null) {
        businessLayer.logIn(accountToLogin, function (userToLogin, errors) {
            if (errors.length == 0) {
                var id = userToLogin[0].id;
                var payload = {userId: id};
                jwt.sign(payload, secret, function (errors, token) {
                    if (errors) {
                        response.status(401).json(errors)
                    }
                    else {
                        response.status(200).json("Bearer " + token);
                    }
                })
            }else{
                response.json(errors);
            }

        })
    }else{
        var authCode = request.body.code;
        businessLayer.getAccessToken(authCode, function (tokenSub, errors) {
            if(errors.length == 0) {
                businessLayer.logIn([tokenSub], function (userToLogin, errors) {
                    if(errors.length == 0){
                        var id = userToLogin[0].id;
                        var payload = {userId : id}
                        jwt.sign(payload, secret, function (errors, token) {
                            if(errors){
                                response.status(401).json(errors);
                            }else{
                                response.status(200).json("Bearer " + token);
                            }
                        })
                    }
                })

            }else{
                response.json(errors);


            }

        });
    }
})
app.get('/posts/:id/comments', function (request, response) {
    var postId = request.params.id;


    businessLayer.getPostsComments(postId, function (results, errors) {
        if(errors.length == 0){
            response.json(results);
        }else{
            response.json(errors);
        }
    })
});
app.post('/posts', function (request, response) {
    var userId = request.body.userId
    var token = request.get("Authorization");
    var post = request.body;

    businessLayer.checkCoordinates(post.coordinates, function (iscoordates, errors) {
        if(iscoordates == false){
            response.json(response.status(400).json(['Invalid coordinates']));

        }
    })

    businessLayer.verifyJWT(token, function (decoded, errors) {
        if(errors.length == 0){
            if(decoded.userId == userId){
                businessLayer.addPost(userId, post, function (results, errors) {
                    if(errors.length == 0){
                        response.json(['A post was added']);
                    }else{
                        response.json(errors);
                    }
                })
            }
        }else{
            response.json(errors.message);
            return;
        }
    })
    response.status(401).json(['You are not authorized']);

});
app.get('/login/google', function (request, response) {
    var authCode = request.query.code;


    response.json(authCode);
    /*businessLayer.getAccessToken(codeAuth, function (subPartOftoken, errors) {
        if(errors.length == 0) {
            var id = subPartOftoken;
            var payload = {userId: id};
            jwt.sign(payload, secret, function (error, token) {
                if(error){
                    response.json("Something went wrong");
                }else{
                    response.json("Bearer " + token);
                }
            })

        }else{

            response.json(errors);


        }
    });
    */
})






app.listen(3000);