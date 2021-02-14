const usersHelper = require('../helpers/usersHelper')
const usersValidator = require('../validators/usersValidator')
const responseHelper = require('../../utils/responseHelper')

class Users {
    async getAllUsers(req, res) {
        try {
            await usersValidator.validateGetAllUsersForm(req.body)
            const users = await usersHelper.selectUsers(req.body)
            responseHelper.success(res, 'GET_ALL_USER_SUCCESS', req.headers.language, { total_users: users.usersCount, users: users.users })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    async updateActiveStatusOfUser(req, res) {
        try {
            await usersValidator.validateUpdateActiveStatusOfUserForm(req.body)
            await usersHelper.updateUserFlag(req.body.user_id, req.body.flag)
            const msg = req.body.flag ? 'USER_UNBLOCK_SUCCESS' : 'USER_BLOCK_SUCCESS'
            responseHelper.success(res, msg, req.headers.language)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
}

module.exports = new Users()