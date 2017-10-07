const express = require('express');
const bodyParser = require('body-parser');
const userRepository = require('./Data-access-Layer/users-repository');
const postRepository = require('./Data-access-Layer/post-repository');
const typeCheck = require('type-check').typeCheck;
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
var app = express();
app.use(bodyParser.json({}));

exports.verifyToken = function (token, callback) {
    jwt.verify(token, secret, function(error, decoded) {
        if(error){
            callback(null, error);
        }else{
            callback(decoded, []);
        }
    });
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



