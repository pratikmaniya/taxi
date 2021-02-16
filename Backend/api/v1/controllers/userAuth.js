const userAuthHelper = require('../helpers/userAuthHelper')
const userAuthValidator = require('../validators/userAuthValidator')
const responseHelper = require('../../utils/responseHelper')
const codeHelper = require('../../utils/codeHelper')

class UserAuth {
    async signin(req, res) {
        try {
            await userAuthValidator.validateSigninForm(req.body)
            const user = await userAuthHelper.getOrAddUser(req.body),
                token = await codeHelper.getJwtToken(user.id, 1)
            responseHelper.success(res, 'SIGNIN_SUCCESS', req.headers.language, { user, auth_token: token })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
}

module.exports = new UserAuth()