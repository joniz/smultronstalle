var db = require('./db.js');

exports.getUsers = function (callback) {
    const query = "SELECT * FROM users"
    db.getMany(query, {}, callback)


}
exports.addUser = function (account, callback) {
    db.addUser('users', ['username', 'password'],account, callback);
}