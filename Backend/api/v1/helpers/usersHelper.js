const promise = require('bluebird')

const db = require('../../utils/db')

class UsersHelper {
    async selectUsers(body) {
        try {
            let selectParams = "id, name, email, mobile_no, profile_image, address, created_date, modified_date, is_active",
                where = ` 1=1 `,
                pagination = ` ORDER BY created_date DESC LIMIT ${Number(body.limit)} OFFSET ${Number(body.limit) * (Number(body.page_no) - 1)}`
            if (body.query_string && body.query_string.trim().length > 0) {
                where += ` AND LOWER(name) LIKE LOWER('%${body.query_string.replace(/'/g, "''")}%') `
            }
            const users = await db.select('users', selectParams, where + pagination),
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