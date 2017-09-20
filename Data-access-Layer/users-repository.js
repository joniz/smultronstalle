var db = require('db.js');

exports.testDB = function (callback) {
    const query = "SELECT * FROM username"
    db.getMany(query, {}, callback)


}