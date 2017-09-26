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

    const query2 = "INSERT INTO " + table + "(" + fields.join() + ")" +
        "VALUES (?,?)";


    connection.query(query2,[value.username, value.password] ,function(error, results, fields){
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

//createTable();
















/*var mysql = require('mysql');

var con = mysql.createConnection({
    host     : 'smultronhosting.cxc8pzxwptru.eu-west-1.rds.amazonaws.com',
    user     : 'NodeUser',
    password : 'Smultron1234',
    database : 'SmultronDB',

    port: 3306
});
*/
/*exports.getConnection = con.connect(function (err, req) {
    if(!!err){
        console.log("Det funkar inte")

    }else{
        console.log("Det ser ut att funka")
    }
})
*/
/*con.connect(function (error) {
    console.log(error)
});
*/
/*exports.createTable = con.query("CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))",function (error) {

    if(!!error) {
        console.log("Din table skapades inte", error);
    }

})
*/