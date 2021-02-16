const promise = require('bluebird')
const joi = require('joi')

const joiValidator = require('../../utils/joiValidator')

class UsersValidator {
    async validateGetAllUsersForm(body) {
        try {
            const schema = joi.object().keys({
                query_string: joi.string(),
                page_no: joi.number().integer().required(),
                limit: joi.number().integer().required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    async validateUpdateUserForm(body) {
        try {
            const schema = joi.object().keys({
                user_id: joi.number().integer().required(),
                flag: joi.boolean().required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            console.log(error)
            return promise.reject(error)
        }
    }
}

module.exports = new UsersValidator()