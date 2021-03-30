const promise = require('bluebird')
const joi = require('joi')

const joiValidator = require('../../utils/joiValidator')

class TaxiValidator {
    async validateAddTaxiForm(body) {
        try {
            const schema = joi.object().keys({
                phone_no: joi.string().required(),
                first_name: joi.string().required(),
                last_name: joi.string().required(),
                driver_permit_number: joi.string().required(),
                plate_no: joi.string().required(),
                brand_name: joi.string().required(),
                brand_model: joi.string().required(),
                colour: joi.string().required(),
                insurance_provider: joi.string().required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    async validateGetAllTaxisForm(body) {
        try {
            const schema = joi.object().keys({
                query_string: joi.string(),
                page_no: joi.number().integer().required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    async validateGetAllDriversForm(body) {
        try {
            const schema = joi.object().keys({
                query_string: joi.string(),
                page_no: joi.number().integer().required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    async validateEditTaxiForm(body) {
        try {
            const schema = joi.object().keys({
                taxi_id: joi.number().integer().required(),
                flag: joi.boolean(),
                stolen_flag: joi.boolean()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    async validateEditDriverForm(body) {
        try {
            const schema = joi.object().keys({
                driver_id: joi.number().integer().required(),
                flag: joi.boolean()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    async validateGetAllReviewsForm(body) {
        try {
            const schema = joi.object().keys({
                query_string: joi.string(),
                page_no: joi.number().integer().required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    async validateAddReviewForm(body) {
        try {
            const schema = joi.object().keys({
                driver_id: joi.number().integer().required(),
                ip: joi.string().required(),
                rating: joi.number().required(),
                comment: joi.string()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
}

module.exports = new TaxiValidator()