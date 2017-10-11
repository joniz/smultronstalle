const express = require('express');
const bodyParser = require('body-parser');
const userRepository = require('./Data-access-Layer/users-repository');
const postRepository = require('./Data-access-Layer/post-repository');
const typeCheck = require('type-check').typeCheck;
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const isCoordinates = require('is-coordinates');
var app = express();
app.use(bodyParser.json({}));

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;


var oauth2Client = new OAuth2(
    "149305994626-cc7n85pmi8kst07g9u8scbn9ls2v3mfm.apps.googleusercontent.com",
    "zBNMzM0x1Pny3rloN53ufnxv",
    "http://localhost:3000/login/google"
);

// generate a url that asks permissions for Google+ and Google Calendar scopes


var url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',

    // If you only need one scope you can pass it as a string
    scope: 'https://www.googleapis.com/auth/plus.me',

    // Optional property that passes state parameters to redirect URI
    // state: { foo: 'bar' }
});
console.log(url);
exports.getAccessToken = function (code, callback) {

    oauth2Client.getToken(code, function (err, tokens) {
        // Now tokens contains an access_token and an optional refresh_token. Save them.
        if (!err) {


            var token = tokens.id_token;

            var decodedToken = jwt.decode(token, {complete: true});
            var subPart = decodedToken.payload.sub;

            //exports.logIn(subPart, callback);
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