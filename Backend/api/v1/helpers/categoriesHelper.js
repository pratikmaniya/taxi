const promise = require('bluebird')

const db = require('../../utils/db')

class CategoriesHelper {
    async selectCategories(body) {
        try {
            let selectParams = ` * `,
                where = ` 1=1 `,
                pagination = ``
            if (body.query_string && body.query_string.trim().length > 0) {
                where += ` AND (LOWER(category) LIKE LOWER('%${body.query_string.replace(/'/g, "''")}%')) `
            }
            if (body.page_no && body.limit) {
                pagination += ` LIMIT ${Number(body.limit)} OFFSET ${Number(body.limit) * (Number(body.page_no) - 1)}`
            }
            const categories = await db.select('categories', selectParams, where + pagination),
                categoriesCount = await db.select('categories', `COUNT(DISTINCT id) AS count`, where)
            return { categories, categoriesCount: categoriesCount.length > 0 ? categoriesCount[0].count : 0 }
        } catch (error) {
            return promise.reject(error)
        }
    }
    async selectCategory(category_id) {
        try {
            const selectParams = ` * `,
                where = ` id=${category_id} `,
                categories = await db.select('categories', selectParams, where)
            if (categories.length === 0) {
                throw 'CATEGORY_WITH_ID_NOT_FOUND'
            } else {
                return categories[0]
            }
        } catch (error) {
            return promise.reject(error)
        }
    }
    async insertCategory(body) {
        try {
            const data = {
                category: body.category,
                category_image: body.category_image,
                is_active: 1,
                created_date: dateHelper.getCurrentTimeStamp(),
                modified_date: dateHelper.getCurrentTimeStamp()
            },
                category = await db.insert('categories', data)
            return category
        } catch (error) {
            return promise.reject(error)
        }
    }
    async updateCategory(body) {
        try {
            const condition = ` id=${body.category_id}`,
                data = {
                    category: body.category,
                    category_image: body.category_image ? body.category_image : undefined,
                    modified_date: dateHelper.getCurrentTimeStamp()
                }
            await db.update('categories', condition, data)
            return true
        } catch (error) {
            return promise.reject(error)
        }
    }
    async updateCategoryFlag(category_id, flag) {
        try {
            const where = ` id=${category_id} `,
                data = {
                    is_active: flag,
                    modified_date: dateHelper.getCurrentTimeStamp()
                },
                result = await db.update('categories', where, data)
            if (result.affectedRows === 0) {
                throw 'CATEGORY_WITH_ID_NOT_FOUND'
            } else {
                return true
            }
        } catch (error) {
            console.log(error)
            return promise.reject(error)
        }
    }
}

module.exports = new CategoriesHelper()