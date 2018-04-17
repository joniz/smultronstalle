const express = require('express');
const bodyParser = require('body-parser');
const userRepository = require('./Data-access-Layer/users-repository');
const postRepository = require('./Data-access-Layer/post-repository');
const commentRepository = require('./Data-access-Layer/comment-repository');
const typeCheck = require('type-check').typeCheck;
const jwt = require('jsonwebtoken');
const isCoordinates = require('is-coordinates');
var app = express();
app.use(bodyParser.json({}));
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
const bucketAddr = "https://s3-eu-west-1.amazonaws.com/nodejssmultronstalle/"


var oauth2Client = new OAuth2(
    "",
    ""
);

var fs = require('fs'),
    S3FS = require('s3fs'),
    s3fsImpl = new S3FS('nodejssmultronstalle', {
        accessKeyId: "",
        secretAccessKey: ""
    });

exports.uploadPicture = function (picture, postId, callback) {

    var stream = fs.createReadStream(picture.path);

    return s3fsImpl.writeFile(picture.originalname, stream).then(function () {
        fs.unlink(picture.path, function (errors) {
            if (errors) {
                callback (null, errors);
            }else{
                exports.addImageToPost(postId, bucketAddr + picture.originalname, function (results, errors) {
                    if(errors.length == 0){
                        callback(bucketAddr + picture.originalname, []);

                    }else{
                        callback(null, errors)
                    }
                });

            }
        });

    });

};

var url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',

    // If you only need one scope you can pass it as a string
    scope: 'https://www.googleapis.com/auth/plus.me',

    // Optional property that passes state parameters to redirect URI
    // state: { foo: 'bar' }
});

exports.getAccessToken = function (code, callback) {

    oauth2Client.getToken(code, function (err, tokens) {
        // Now tokens contains an access_token and an optional refresh_token. Save them.
        if (!err) {
            var token = tokens.id_token;
            var decodedToken = jwt.decode(token, {complete: true});
            var subPart = decodedToken.payload.sub;
            callback(subPart, []);
        }else{
            callback(null, err);
        }
    });
}



exports.verifyJWT = function (token, callback) {
    jwt.verify(token, secret, function(error, decoded) {
        if(error){
            callback(null, error);
        }else{
            callback(decoded, []);
        }
    });
}
exports.checkCoordinates = function (coordArray, callback) {

    if(isCoordinates(coordArray)){
        callback(true, [])
    }else{
        callback(false, ['This is not a valid form for coordinates']);
    }
}
/*exports.getConnection = function() {
    db.getConnection;
}
exports.createTable = function () {
    db.createTable;
}
*/
exports.getUsers = function (callback) {
    userRepository.getUsers(callback)
}
exports.addUser = function(account, callback){
    userRepository.addUser(account, callback);
}
exports.getUser = function (accountId, callback) {

    userRepository.getUser(accountId, callback);

}
exports.getUserComments = function (userId, callback) {

    userRepository.getUserComments( userId, callback)
}
exports.getPosts = function (callback) {
    postRepository.getPosts(callback);
}
exports.logIn = function (account, callback) {
    userRepository.logIn(account, callback);
}
exports.getPostsComments = function (postId, callback) {
    postRepository.getPostsComments(postId, callback);
}
exports.addPost = function (userId, post, callback) {


    postRepository.addPost(userId, post, callback);
}
exports.addImageToPost = function (postId, imageLink, callback) {
    postRepository.addImageToPost(postId, imageLink, callback);
}
exports.deleteUser = function (userId, callback) {
    userRepository.deleteUser(userId, callback);
}
exports.deletePost = function (postId, callback) {
    postRepository.deletePost(postId, callback);
}
exports.checkIfUserExists = function (account, callback) {
    userRepository.checkIfUserExists(account, callback)
}
exports.getComments = function (callback) {
    commentRepository.getComments(callback);
}
exports.getComment = function (commentId, callback) {
    commentRepository.getComment(commentId, callback);
}
exports.deleteComment = function (commentId, callback) {
    commentRepository.deleteComment(commentId, callback);
}
