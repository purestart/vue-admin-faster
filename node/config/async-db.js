const mysql = require('mysql');

const config = require('./default.js')
const database = config.database


const pool = mysql.createPool({
  host: database.HOST,
  user: database.USER,
  password: database.PASSWORD,
  database: database.DATABASE
})

let query = function( sql, values ) {

    return new Promise(( resolve, reject ) => {

      pool.getConnection(function(err, connection) {
        if (err) {
          reject( err )
        } else {
          connection.query(sql, values, ( err, rows) => {
  
            if ( err ) {
              reject( err )
            } else {
            
              resolve( rows )
            }
            connection.release()
          })
        }
      })

    })
    .catch((error) => {
        console.log(error,'Promise error');
    });
}

module.exports = { query }
