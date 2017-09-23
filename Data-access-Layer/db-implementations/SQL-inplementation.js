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

function createTable(callback){

    const query = `CREATE TABLE IF NOT EXISTS users (
 id INT(11) NOT NULL AUTO_INCREMENT,
 username VARCHAR(45) NOT NULL,
 password VARCHAR(45) NOT NULL,
 PRIMARY KEY (username)
)`

    connection.query(query, function(error, results, fields){
        if(error){
            console.log("ERROR CREATE TABLE")
            console.log(error)
        }else{
            console.log("TABLE EXISTS")
            callback()
        }
    })

}

exports.addUser = function (table, field, value, callback){

    const query = `INSERT INTO users`

    connection.query(query, function(error, results, fields){
        if(error){
            console.log("DATA INSERTED ERROR")
            console.log(error)
        }else{
            console.log("DATA INSERTED")
            callback()
        }
    })

}

function readData(){

    const query = `SELECT id, name FROM humans`

    connection.query(query, function(error, results, fields){
        if(error){
            console.log("READ DATA ERROR")
            console.log(error)
        }else{
            console.log("DATA READ")
            console.log(results)
        }
    })

}

createTable(function(){
    insertData(function(){
        readData()
    })
})
















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