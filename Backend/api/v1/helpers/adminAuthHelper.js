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
                    modified_date: dateHelper.getCurrentTimeStamp()
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
    async insertToken(user_id, auth_token) {
        try {
            const data = {
                user_id: user_id,
                auth_token: auth_token,
                created_date: dateHelper.getCurrentTimeStamp(),
                modified_date: dateHelper.getCurrentTimeStamp()
            }
            await db.insert('admin_auth_relation', data)
            return true
        } catch (error) {
            console.log(error)
            return promise.reject(error)
        }
    }
    async selectCounts() {
        try {
            const users_count = await db.select('users', `COUNT(*) AS count`),
                categories_count = await db.select('categories', `COUNT(*) AS count`),
                sub_categories_count = await db.select('sub_categories', `COUNT(*) AS count`),
                sellers_count = await db.select('admin', `COUNT(*) AS count`, ` user_type=2`)
            return { users_count: users_count[0].count, categories_count: categories_count[0].count, sub_categories_count: sub_categories_count[0].count, sellers_count: sellers_count[0].count }
        } catch (error) {
            console.log(error)
            return promise.reject(error)
        }
    }
}

module.exports = new AdminAuthHelper()