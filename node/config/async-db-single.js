const mysql = require('mysql');

const config = require('./default.js')
//const database = config.database


// const pool = mysql.createPool({
//   host: database.HOST,
//   user: database.USER,
//   password: database.PASSWORD,
//   database: database.DATABASE
// })

let query = function( sql, database ) {

    return new Promise(( resolve, reject ) => {

      var connection = mysql.createConnection({
        host:database.host,
        user:database.user,
        password:database.password,
        database:database.name
      });

      connection.connect(function(err) {
        if (err) {
          reject(err);
        }
        console.log('connected as id ' + connection.threadId);
      });

      connection.query(sql, function (error, results, fields) {
        if (error) {
          reject( error )
        }else{
          resolve(results)
        }
        
      });

      connection.end();

    })
    .catch((error) => {
        console.log(error,'Promise error');
    });
}

module.exports = { query }
