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
        //console.log("COULD NOT CONNECT")
        //console.log(error)
    }else{
        //console.log("CONNECTED")
    }
})

exports.addUser = function (account, callback){



    const query = "INSERT INTO users (username, password, sub) VALUES (?,?,?)";

    connection.query(query,[account.username, account.password, account.sub],function(error, results){

        if(error){
            callback(null, error);

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
            callback(null, ['Something went wrong']);
        }else{
            callback(results, []);
        }
    })

}
exports.getUser = function (accountId, callback) {

    var query = "SELECT * FROM users WHERE id = ?"

    connection.query(query,[accountId],function (error, results) {
        if(error){
            callback(null, error);
        }else if(results.length == 0){
            callback(null, ['There is no user with this id']);
        }
        else{
            callback(results, []);
        }
    })
};
exports.getPosts = function (callback) {
    var query = "SELECT * FROM posts";

    connection.query(query, function (error, results) {
        if(error){
            callback(null, ['There was no places to get']);
        }else{
            callback(results, []);
        }
    })
};




exports.getUserComments = function (userId ,callback) {

    var query = "SELECT * FROM comments WHERE userId = ?"

    connection.query(query, [userId] , function (error, results) {
        if(error || results.length == 0){
            callback(null, ['There are no comments for this user']);
        }else{
            callback(results, []);
        }

    })

}

exports.logIn = function (account, callback) {
    var query = "SELECT id FROM users WHERE (username = ? AND password = ?) OR sub = ?"

    connection.query(query, [account.username, account.password, account.sub], function (error, results) {
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
exports.addImageToPost = function (postId, imageLink, callback) {
    var query = "UPDATE posts SET imagelink = ? WHERE id = ?";

    connection.query(query, [imageLink, postId], function (error, results) {
        if(error){
            callback(null, error);
        }else{
            callback(results, []);
        }
    })
}
exports.deleteUser = function (userId, callback) {
    var query = "DELETE FROM users WHERE id = ?";
    connection.query(query, [userId], function (error, results) {
        if(error){
            callback(null,  error);
        }else{
            callback(results, []);
        }
    })
}
exports.deletePost = function (postId, callback) {
    var query = "DELETE FROM posts WHERE id = ?";

    connection.query(query, [postId], function (error, results) {
        if(error){
            callback(null, error);
        }else{
            callback(results, []);
        }
    })

}
exports.checkIfUserExist = function (account, callback) {
    var query = "SELECT id FROM users WHERE (username = ? AND password = ?) OR sub = ?";

    connection.query(query, [account.username, account.password, account.sub], function (error, results) {
        if(error){
            callback(null, error);
        }else if(results.length != 0){
            callback(true, []);
        }else{
            callback(false, []);
        }
    })
}
exports.getComments = function (callback) {
    var query = "SELECT * FROM comments";

    connection.query(query, function (error, results) {
        if(error){
            callback(null, error);
        }else{
            callback(results, []);
        }
    })
}
exports.getComment = function (commentId, callback) {
    var query = "SELECT * FROM comments WHERE id = ?";

    connection.query(query, [commentId] ,function (error, results) {
        if(error){
            callback(null, error);
        }else{
            callback(results, []);
        }
    })
}
exports.deleteComment = function (commentId, callback) {
    var query = "DELETE FROM comments WHERE id = ?";

    connection.query(query, [commentId], function (error, results) {
        if(error){
            callback(null, error);
        }else{
            callback(results, []);
        }
    })

}