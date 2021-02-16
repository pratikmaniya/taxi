const promise = require('bluebird')

const db = require('../../utils/db')

class UserAuthHelper {
    async getOrAddUser(body) {
        try {
            const condition = ` email='${body.email}' `,
                data = {
                    first_name: body.first_name,
                    last_name: body.last_name,
                    email: body.email
                }
            let user = await db.select('users', ' first_name ', condition)
            if (user && user.length > 0) return user[0]
            user = await db.insert('users', data)
            console.log("result", user)
            return { first_name: user.first_name }
        } catch (error) {
            return promise.reject(error)
        }
    }
}

module.exports = new UserAuthHelper()