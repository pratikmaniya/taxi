const db = require('../../utils/db')
const promise = require('bluebird')
const joi = require('joi')
const joiValidator = require('../../utils/joiValidator')

class CategoriesValidator {
    async validateGetAllCategoriesForm(body) {
        try {
            const schema = joi.object().keys({
                query_string: joi.string(),
                page_no: joi.number().integer(),
                limit: joi.number().integer()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    async validateGetSingleCategoryForm(body) {
        try {
            const schema = joi.object().keys({
                category_id: joi.number().integer().required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    async validateAddCategoryForm(body) {
        try {
            const schema = joi.object().keys({
                category: joi.string().required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    async validateEditCategoryForm(body) {
        try {
            const schema = joi.object().keys({
                category_id: joi.number().integer().required(),
                category: joi.string().required(),
                old_category_image: joi.string().allow("")
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    async validateUpdateActiveStatusOfCategoryForm(body) {
        try {
            const schema = joi.object().keys({
                category_id: joi.number().integer().required(),
                flag: joi.boolean().required()
            })
            await joiValidator.validateJoiSchema(body, schema);
        } catch (error) {
            return promise.reject(error)
        }
    }
    async isCategoryWithIdExist(id) {
        try {
            const selectParams = '*',
                where = `id='${id}'`,
                categories = await db.select('categories', selectParams, where)
            if (categories.length > 0) {
                return categories[0]
            } else {
                throw 'CATEGORY_WITH_ID_NOT_FOUND'
            }
        } catch (error) {
            return promise.reject(error)
        }
    }
}

module.exports = new CategoriesValidator()