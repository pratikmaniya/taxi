const db = require('../../utils/db')
const bcrypt = require('bcryptjs');
const promise = require('bluebird')
const joi = require('joi')
const joiValidator = require('../../utils/joiValidator')

class UserAuthValidator {
    async validateSignupForm(body) {
        try {
            const schema = joi.object().keys({
                name: joi.string(),
                email: joi.string().email(),
                mobile_no: joi.number().integer().required(),
                social_id: joi.string()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    async validateIsUserRegisteredWithSocialIdForm(body) {
        try {
            const schema = joi.object().keys({
                social_id: joi.string().required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    async validateSigninForm(body) {
        try {
            const schema = joi.object().keys({
                social_id: joi.string(),
                mobile_no: joi.number().integer(),
                email: joi.string().email()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    async validateResendOTPForm(body) {
        try {
            const schema = joi.object().keys({
                mobile_no: joi.number().integer(),
                email: joi.string().email()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    async validateVerifyOTPForm(body) {
        try {
            const schema = joi.object().keys({
                user_id: joi.number().integer().required(),
                otp: joi.number().integer().required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    async validateEditProfileForm(body) {
        try {
            const schema = joi.object().keys({
                name: joi.string().required(),
                email: joi.string().required(),
                old_profile_image: joi.string().allow("")
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    async isUserWithMobileExist(mobile_no, throw_error_for_exists) {
        try {
            const selectParams = '*',
                where = `mobile_no='${mobile_no}'`,
                user = await db.select('users', selectParams, where)
            if (throw_error_for_exists) {
                if (user.length > 0) {
                    throw 'USER_WITH_MOBILE_ALREADY_EXISTS'
                } else {
                    return true
                }
            } else {
                if (user.length > 0) {
                    if (user[0].is_active) {
                        return user[0]
                    } else {
                        throw 'USER_BLOCKED'
                    }
                } else {
                    throw 'USER_WITH_MOBILE_NOT_FOUND'
                }
            }
        } catch (error) {
            return promise.reject(error)
        }
    }
    async isUserWithEmailExist(email, throw_error_for_exists) {
        try {
            const selectParams = '*',
                where = `email='${email.replace(/'/g, "''")}'`,
                user = await db.select('users', selectParams, where)
            if (throw_error_for_exists) {
                if (user.length > 0) {
                    throw 'USER_WITH_EMAIL_ALREADY_EXISTS'
                } else {
                    return true
                }
            } else {
                if (user.length > 0) {
                    if (user[0].is_active) {
                        return user[0]
                    } else {
                        throw 'USER_BLOCKED'
                    }
                } else {
                    throw 'USER_WITH_EMAIL_NOT_FOUND'
                }
            }
        } catch (error) {
            return promise.reject(error)
        }
    }
    async isUserWithSocialIdExist(social_id, throw_error_for_exists) {
        try {
            const selectParams = '*',
                where = `social_id='${social_id}'`,
                user = await db.select('users', selectParams, where)
            if (throw_error_for_exists) {
                if (user.length > 0) {
                    throw 'USER_WITH_SOCIAL_ID_ALREADY_EXISTS'
                } else {
                    return true
                }
            } else {
                if (user.length > 0) {
                    if (user[0].is_active) {
                        return user[0]
                    } else {
                        throw 'USER_BLOCKED'
                    }
                } else {
                    throw 'USER_WITH_SOCIAL_ID_NOT_FOUND'
                }
            }
        } catch (error) {
            return promise.reject(error)
        }
    }
    async isUserWithIdExist(id) {
        try {
            const selectParams = '*',
                where = `id='${id}'`,
                user = await db.select('users', selectParams, where)
            if (user.length > 0) {
                return user[0]
            } else {
                throw 'USER_WITH_ID_NOT_FOUND'
            }
        } catch (error) {
            return promise.reject(error)
        }
    }
    async isTokenExists(token) {
        try {
            const selectParams = '*',
                where = `auth_token='${token}'`,
                db_token = await db.select("user_auth_relation", selectParams, where)
            if (db_token && db_token.length > 0) {
                return db_token
            } else {
                throw 'INVALID_TOKEN'
            }
        } catch (error) {
            return promise.reject(error)
        }
    }
}

module.exports = new UserAuthValidator()