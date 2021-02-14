const categoriesHelper = require('../helpers/categoriesHelper')
const categoriesValidator = require('../validators/categoriesValidator')
const responseHelper = require('../../utils/responseHelper')
const S3helper = require('../../utils/S3helper')

class Categories {
    async getAllCategories(req, res) {
        try {
            await categoriesValidator.validateGetAllCategoriesForm(req.body)
            const categories = await categoriesHelper.selectCategories(req.body)
            responseHelper.success(res, 'GET_ALL_CATEGORIES_SUCCESS', req.headers.language, { total_categories: categories.categoriesCount, categories: categories.categories })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    async getSingleCategory(req, res) {
        try {
            await categoriesValidator.validateGetSingleCategoryForm(req.body)
            const category = await categoriesHelper.selectCategory(req.body.category_id)
            responseHelper.success(res, 'GET_SINGLE_CATEGORY_SUCCESS', req.headers.language, category)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    async addCategory(req, res) {
        try {
            await categoriesValidator.validateAddCategoryForm(req.body)
            req.body.category_image = await S3helper.uploadImageOnS3('categories/', req.file)
            await categoriesHelper.insertCategory(req.body)
            responseHelper.success(res, 'ADD_CATEGORY_SUCCESS', req.headers.language)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    async editCategory(req, res) {
        try {
            await categoriesValidator.validateEditCategoryForm(req.body)
            const category = await categoriesValidator.isCategoryWithIdExist(req.body.category_id)
            if (req.file) {
                req.body.category_image = await S3helper.uploadImageOnS3('categories/', req.file)
                S3helper.deleteImageFromS3(category.category_image)
            } else if (req.body.old_category_image) {
                req.body.category_image = req.body.old_category_image
            } else {
                S3helper.deleteImageFromS3(category.category_image)
            }
            await categoriesHelper.updateCategory(req.body)
            responseHelper.success(res, 'EDIT_CATEGORY_SUCCESS', req.headers.language)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    async updateActiveStatusOfCategory(req, res) {
        try {
            await categoriesValidator.validateUpdateActiveStatusOfCategoryForm(req.body)
            await categoriesHelper.updateCategoryFlag(req.body.category_id, req.body.flag)
            const msg = req.body.flag ? 'CATEGORY_UNBLOCK_SUCCESS' : 'CATEGORY_BLOCK_SUCCESS'
            responseHelper.success(res, msg, req.headers.language)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
}

module.exports = new Categories()