const db = require('../../utils/db')
const bcrypt = require('bcryptjs');
const promise = require('bluebird')
const joi = require('joi')
const joiValidator = require('../../utils/joiValidator')

class AdminAuthValidator {
    async validateSigninForm(body) {
        try {
            const schema = joi.object().keys({
                email: joi.string().email().required(),
                password: joi.string().min(6).required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    async validateSendForgotPasswordMailForm(body) {
        try {
            const schema = joi.object().keys({
                email: joi.string().email().required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    async validateResetPasswordForm(body) {
        try {
            const schema = joi.object().keys({
                new_password: joi.string().min(8).required(),
                confirm_new_password: joi.string().min(8).required(),
            })
            await joiValidator.validateJoiSchema(body, schema);
            if (body.new_password != body.confirm_new_password) { throw ('PASSWORD_CONFIRM_PASSWORD_DIFFERENT') }
        } catch (error) {
            return promise.reject(error)
        }
    }
    async validateChnagePasswordForm(body) {
        try {
            const schema = joi.object().keys({
                old_password: joi.string().min(6).required(),
                new_password: joi.string().min(6).required(),
                confirm_new_password: joi.string().min(6).required(),
            })
            await joiValidator.validateJoiSchema(body, schema);
            if (body.new_password != body.confirm_new_password) { throw ('PASSWORD_CONFIRM_PASSWORD_DIFFERENT') }
        } catch (error) {
            return promise.reject(error)
        }
    }
    async isUserWithEmailExist(email, throw_error_for_exists) {
        try {
            const selectParams = '*',
                where = `email='${email.replace(/'/g, "''")}'`,
                user = await db.select('admin', selectParams, where)
            if (throw_error_for_exists) {
                if (user.length > 0) {
                    throw 'USER_WITH_EMAIL_ALREADY_EXISTS'
                } else {
                    return true
                }
            } else {
                if (user.length > 0) {
                    return user[0]
                } else {
                    throw 'USER_WITH_EMAIL_NOT_FOUND'
                }
            }
        } catch (error) {
            return promise.reject(error)
        }
    }
    async validatePassword(db_password, body_password) {
        try {
            const isValid = bcrypt.compareSync(body_password, db_password)
            if (!isValid) { throw 'INCORRECT_PASSWORD' }
            return true
        } catch (error) {
            return promise.reject(error)
        }
    }
}

module.exports = new AdminAuthValidator()