const adminAuthHelper = require('../helpers/adminAuthHelper')
const responseHelper = require('../../utils/responseHelper')
const adminAuthValidator = require('../validators/adminAuthValidator')
const codeHelper = require('../../utils/codeHelper')
const mailHelper = require('../../utils/mailHelper')

class AdminAuth {
    async signin(req, res) {
        try {
            await adminAuthValidator.validateSigninForm(req.body)
            const user = await adminAuthValidator.isUserWithEmailExist(req.body.email, false),
                token = await codeHelper.getJwtToken(user.id, 2)
            await adminAuthValidator.validatePassword(user.password, req.body.password)
            delete user.password
            responseHelper.success(res, 'SIGNIN_SUCCESS', req.headers.language, { ...user, auth_token: token })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    async changePassword(req, res) {
        try {
            await adminAuthValidator.validateChnagePasswordForm(req.body)
            const user = await adminAuthHelper.getAdminById(req.user_id)
            await adminAuthValidator.validatePassword(user.password, req.body.old_password)
            await adminAuthHelper.changePassword(req.body.new_password, req.user_id)
            responseHelper.success(res, 'CHANGE_PASSWORD_SUCCESS', req.headers.language)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language, {})
        }
    }
    async sendForgotPasswordMail(req, res) {
        try {
            await adminAuthValidator.validateSendForgotPasswordMailForm(req.body)
            const user = await adminAuthValidator.isUserWithEmailExist(req.body.email, false),
                link = await codeHelper.getLink(2, user.id)
            mailHelper.sendForgotPasswordMail(req.body.email, link)
            responseHelper.success(res, 'FORGOT_PASSWORD_MAIL_SENT', req.headers.language)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language, {})
        }
    }
    async resetPassword(req, res) {
        try {
            await adminAuthValidator.validateResetPasswordForm(req.body)
            const user = await adminAuthValidator.isUserWithEmailExist(req.email, false)
            await adminAuthHelper.changePassword(req.body.new_password, user.id)
            responseHelper.success(res, 'CHANGE_PASSWORD_SUCCESS', req.headers.language)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
}

module.exports = new AdminAuth()