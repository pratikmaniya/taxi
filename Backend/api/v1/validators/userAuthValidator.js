const promise = require('bluebird')
const joi = require('joi')

const joiValidator = require('../../utils/joiValidator')

class UserAuthValidator {
    async validateSigninForm(body) {
        try {
            const schema = joi.object().keys({
                first_name: joi.string(),
                last_name: joi.string(),
                email: joi.string().email().required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
}

module.exports = new UserAuthValidator()