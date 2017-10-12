var db = require('./db.js');

exports.getUsers = function (callback) {
    const query = "SELECT username FROM users"
    db.getUsers(query,callback)
}



exports.addUser = function (account, callback) {
    db.addUser('users',['username', 'password'],account, callback);
}
exports.getUser = function (accountId, callback) {
    db.getUser(accountId, callback);
}

exports.getUserComments = function (userId, callback) {
    db.getUserComments(userId, callback)
}

exports.logIn = function (account, callback) {
    db.logIn(account, callback);
}
exports.deleteUser = function (userId, callback) {
    db.deleteUser(userId, callback);
}
