const promise = require('bluebird')

const db = require('../../utils/db')
const config = require('../../utils/config')

class UsersHelper {
    async selectUsers(body) {
        try {
            const selectParams = "id, first_name, last_name, email, created_date, modified_date, login_by",
                where = ` 1=1 `,
                pagination = ` ORDER BY created_date DESC LIMIT ${Number(config.limit)} OFFSET ${Number(config.limit) * (Number(body.page_no) - 1)}`,
                users = await db.select('users', selectParams, where + pagination),
                usersCount = await db.select('users', `COUNT(*) AS count`, where)
            return { users, usersCount: usersCount.length > 0 ? usersCount[0].count : 0 }
        } catch (error) {
            return promise.reject(error)
        }
    }
    async updateUser(user_id, flag) {
        try {
            const where = ` id=${user_id} `,
                data = {
                    is_active: flag,
                    modified_date: dateHelper.getCurrentTimeStamp()
                },
                result = await db.update('users', where, data)
            if (result.affectedRows === 0) {
                throw 'USER_WITH_ID_NOT_FOUND'
            } else {
                return true
            }
        } catch (error) {
            console.log(error)
            return promise.reject(error)
        }
    }
}

module.exports = new UsersHelper()