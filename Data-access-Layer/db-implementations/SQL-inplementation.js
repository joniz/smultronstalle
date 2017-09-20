var mysql = require('mysql');

var con = mysql.createConnection({
    host     : 'smultronhosting.cxc8pzxwptru.eu-west-1.rds.amazonaws.com',
    user     : 'NodeUser',
    password : 'Smultron1234',
    database : 'SmultronDB',

    port: 3306
});

/*exports.getConnection = con.connect(function (err, req) {
    if(!!err){
        console.log("Det funkar inte")

    }else{
        console.log("Det ser ut att funka")
    }
})
*/
con.connect(function (error) {
    console.log(error)
});

exports.createTable = con.query("CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))",function (error) {

    if(!!error) {
        console.log("Din table skapades inte", error);
    }

})
