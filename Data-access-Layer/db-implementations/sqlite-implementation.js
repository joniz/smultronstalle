const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('sqlite.db')

// Create the database tables if they haven't been created yet.

db.run('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT )')

exports.getMany = function(query,values, callback ){
    db.all(query,values, function (error,rows) {
            if(error){
                console.log(error)
                callback(null, ['databaserror'])
            }else{
                callback(rows, [])
            }

        }
    )}
}

