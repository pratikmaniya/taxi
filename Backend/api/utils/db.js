const promise = require('bluebird')
const { Client } = require('pg')

const config = require('./config')

let connection

class DB {
  async getConnection() {
    return new promise((resolve, reject) => {
      connection = new Client({
        host: config.db.host,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database,
        query_timeout: 600000

      });
      connection.connect((err) => {
        if (err) {
          console.error('error connecting: ' + err.stack)
          reject('Error while connectiong database !')
        }
        console.log(`connected to ${config.db.database} as id ${connection.processID}`)
        resolve('Database Connected !')
      })
    })
  }

  select(table, selectParams, condition) {
    return new promise((resolve, reject) => {
      let query = `SELECT ${selectParams} FROM ${table}`
      if (condition) {
        query += ` WHERE ${condition}`
      }
      console.log('\n\n', query, '\n\n')
      connection.query(query, (error, results) => {
        if (error) {
          console.log(error)
          reject('DB_ERROR')
        } else {
          resolve(results.rows)
        }
      })
    })
  }

  insert(table, data) {
    return new promise((resolve, reject) => {
      let query = `INSERT INTO ${table}(${Object.keys(data).join(',')}) VALUES(${Object.keys(data).map((d, index) => ('$' + (index + 1)))}) RETURNING *`,
        values = Object.values(data).map(value => {
          if (typeof value === 'string') {
            return value.replace(/'/g, "\'")
          } else {
            return value
          }
        })
      // console.log('\n\n',query); 
      connection.query(query, values, (error, results) => {
        if (error) {
          console.log(error)
          reject('DB_ERROR')
        } else {
          resolve(results.rows[0])
        }
      })
    })
  }

  insertBulk(table, data) {
    return new promise((resolve, reject) => {
      let values = data.map(element => `(${Object.values(element).map(e => `'${String(e).replace(/'/g, "\'")}'`)})`)
      let query = `INSERT INTO ${table}(${Object.keys(data[0]).join(',')}) VALUES ${values.join(",")}`
      connection.query(query, (error, results) => {
        if (error) {
          console.log(error)
          reject('DB_ERROR')
        } else {
          resolve(results.rows[0])
        }
      })
    })
  }

  update(table, condition, data) {
    return new promise((resolve, reject) => {
      let query = `UPDATE ${table} SET ${Object.entries(data).map(entry => (entry[0] + '=' + "'" + String(entry[1]).replace(/'/g, "''") + "'"))} WHERE ${condition}`
      connection.query(query, (error, results) => {
        if (error) {
          console.log(error)
          reject('DB_ERROR')
        } else {
          resolve(results)
        }
      })
    })
  }

  upsert(table, data, conflict_key) {
    return new promise((resolve, reject) => {
      let query = `INSERT INTO ${table}(${Object.keys(data).join(',')}) VALUES( 
                  ${Object.values(data).map(d => ("'" + String(d).replace(/'/g, "\'") + "'"))}) ON CONFLICT 
                  (${conflict_key}) DO UPDATE SET 
                  ${Object.entries(data).map(entry => (entry[0] + '=' + "'" + String(entry[1]).replace(/'/g, "\'") + "'"))}`
      connection.query(query, (error, results) => {
        if (error) {
          console.log(error)
          reject('DB_ERROR')
        } else {
          resolve(results.rows[0])
        }
      })
    })
  }

  delete(table, condition) {
    return new promise((resolve, reject) => {
      let query = `DELETE FROM ${table} WHERE ${condition}`
      connection.query(query, (error, results) => {
        if (error) {
          console.log(error)
          reject('DB_ERROR')
        } else {
          resolve(results)
        }
      })
    })
  }
}

module.exports = new DB()
