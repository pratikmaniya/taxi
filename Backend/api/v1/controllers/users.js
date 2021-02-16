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
    async updateUser(req, res) {
        try {
            await usersValidator.validateUpdateUserForm(req.body)
            await usersHelper.updateUser(req.body.user_id, req.body.flag)
            responseHelper.success(res, 'EDIT_USER_SUCCESS', req.headers.language)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
}

module.exports = new Users()