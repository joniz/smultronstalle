const express = require('express')
const bodyParser = require('body-parser')
const userRepository = require('./Data-access-Layer/users-repository');
const typeCheck = require('type-check').typeCheck
const mysql = require('mysql');
var app = express()
app.use(bodyParser.json({}))

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
exports.getPlaces = function (callback) {
    userRepository.getPlaces(callback);
}




