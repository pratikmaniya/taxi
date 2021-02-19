const bcrypt = require('bcryptjs')
const promise = require('bluebird')

const db = require('../../utils/db')

class AdminAuthHelper {
    async changePassword(new_password, user_id) {
        try {
            const salt = bcrypt.genSaltSync(10),
                password = bcrypt.hashSync(new_password, salt),
                data = {
                    password: password,
                    modified_date: 'now()'
                },
                where = `id='${user_id}'`
            await db.update('admin', where, data)
            return true
        } catch (error) {
            return promise.reject(error)
        }
    }
    async getAdminById(id) {
        try {
            const admin = await db.select('admin', '*', `id=${id}`)
            return admin[0]
        } catch (error) {
            console.log(error)
            return promise.reject(error)
        }
    }
}

module.exports = new AdminAuthHelper()