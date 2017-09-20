const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('sqlite.db')

// Create the database tables if they haven't been created yet.

db.run('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT )')
const query = 'INSERT INTO users VALUES (?,Jonathan, Smultron)';

exports.getMany = function(query,values, callback ){
    db.all(query,values, function (error,rows) {
            if(error){
                console.log(error)
                callback(null, ['databaserror'])
            }else{
                callback(rows, [])
            }


    })
}
exports.addUser = function (table, fields, values, callback) {
    const query = `
		INSERT INTO
			${table}
			(${fields.join(', ')})
		VALUES
			(:${fields.join(', :')})
	`

    const prefixedValues = getKeysPrefixedWithColon(values)
    db.run(query, prefixedValues, function (error) {
        if(error){
            if(error.code == "SQLITE_CONSTRAINT"){
                callback(null, ['Fel'])
            }else{
                console.log(error)
                callback(null, ['Fel igen, fast på annat'])
            }
        }else {
            values.id = this.lastID
            callback(values, [])
        }

    })


}
function getKeysPrefixedWithColon(object){
    const newObject = {}
    if(object != null){
        const keys = Object.keys(object)
        for(var i=0; i<keys.length; i++){
            const key = keys[i]
            newObject[':'+key] = object[key]
        }
    }
    return newObject
}

