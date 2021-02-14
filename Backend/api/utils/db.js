const { Client } = require('pg')
const config = require('./config')
const promise = require('bluebird')

let connection

class DB {
  getConnection() {
    return new promise((resolve, reject) => {
      connection = new Client({
        host: config.db.host,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database
      })

      connection.connect((err) => {
        if (err) {
          console.error('error connecting: ' + err)
          reject('Error while connectiong database !')
        }
        // console.log(connection)
        console.log(`connected to ${config.db.database} as id ${connection.threadId}`)
        resolve('Database Connected !')
      })
    })
  }

  select(table, selectParams, condition) {
    return new promise((resolve, reject) => {
      let query = `SELECT ${selectParams} FROM ${table} WHERE 1=1 ${condition ? `AND ${condition}` : ''}`
      console.log('\n\n', query, '\n\n')
      connection.query(query, (error, results, fields) => {
        if (error) {
          console.log(error)
          reject('DB_ERROR')
        } else {
          resolve(results)
        }
      })
    })
  }

  insert(table, data) {
    return new promise((resolve, reject) => {
      let query = `INSERT INTO ${table} SET ? `
      connection.query(query, data, (error, results) => {
        if (error) {
          console.log(error)
          reject('DB_ERROR')
        } else {
          resolve(results)
        }
      })
    })
  }

  update(table, condition, data) {
    return new promise((resolve, reject) => {
      let query = `UPDATE ${table} SET ? WHERE ${condition}`
      connection.query(query, data, (error, results) => {
        if (error) {
          console.log(error)
          reject('DB_ERROR')
        } else {
          resolve(results)
        }
      })
    })
  }

  upsert(table, data) {
    return new promise((resolve, reject) => {
      let query = `INSERT INTO ${table} ( ${Object.keys(data).join(',')} ) VALUES ( ${Object.values(data).map(d => `'${d}'`).join(',')} ) ON DUPLICATE KEY UPDATE ${Object.entries(data).map(d => `${d[0]}='${d[1]}'`).join(',')} `
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
