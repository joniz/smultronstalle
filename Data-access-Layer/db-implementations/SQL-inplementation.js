var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'smultronbase.cxc8pzxwptru.eu-west-1.rds.amazonaws.com',
    user     : 'UserNode',
    password : 'Smultron1234',
    database : 'SmultronNodeJS',
    port: 3306
})

connection.connect(function(error){
    if(error){
        console.log("COULD NOT CONNECT")
        console.log(error)
    }else{
        console.log("CONNECTED")
    }
})

exports.addUser = function (table, fields, value, callback){

    const query = "INSERT INTO " + table + "(" + fields.join() + ")" +
        "VALUES (?,?)";


    connection.query(query,[value.username, value.password] ,function(error, results, fields){
        if(error){
            callback(results, error);

        }else{
            console.log("DATA INSERTED")
            callback(results, []);
        }
    })

}

exports.getUsers = function (query, callback){

    //const query = `SELECT id, name FROM humans`

    connection.query(query, function(error, results){
        if(error){
            callback(null, ['något gick fel']);
        }else{
            callback(results, []);
        }
    })

}
exports.getUser = function (accountId, callback) {

    var query = "SELECT * FROM users WHERE id = ?"

    connection.query(query,[accountId],function (error, results) {
        if(error || results.length == 0){
            callback(null, ['There is no user with this ID']);
        }else{
            callback(results, []);
        }
    })
}
exports.getPosts = function (callback) {
    var query = "SELECT * FROM posts"

    connection.query(query, function (error, results) {
        if(error){
            callback(null, ['There was no places to get']);
        }else{
            callback(results, []);
        }
    })
}




exports.getUserComments = function (userId ,callback) {

    var query = "SELECT * FROM comments WHERE id = ?"

    connection.query(query, [userId] , function (error, results) {
        if(error || results.length == 0){
            callback(null, ['There are no comments for this user']);
        }else{
            callback(results, []);
        }

    })

}

exports.logIn = function (account, callback) {
    var query = "SELECT id FROM users WHERE username = ? AND password = ?"

    connection.query(query, [account.username, account.password], function (error, results) {
        if(error){
            callback(null, ['Something went wrong']);
        }else if(results.length == 0){
            callback(null, ['Wrong input']);

        }else{
            callback(results, []);
        }
    })
}
exports.getPostsComments = function (postId, callback) {
    var query = "SELECT commentText, time, id FROM comments WHERE placeId = ?"

    connection.query(query, [postId], function (error, results) {
        if(error){
            callback(null, ['Something went wrong']);
        }else if(results.length == 0){
            callback(null, ['This post does not have comments']);
        }else{
            callback(results, []);
        }
    })
}
exports.addPost = function (userId, post, callback) {

    //const query = "INSERT INTO " + table + "(" + fields.join() + ")" +
        //"VALUES (?,?)";

    var query = "INSERT INTO posts (description, imagelink, coordinates, userId) VALUES (?,?,?,?)";
    connection.query(query, [post.description, post.imagelink, post.coordinates.join(), userId], function (error, results) {
        if(error){
            callback(null, error);
        }else{
            callback(results, []);
        }
    })

}









