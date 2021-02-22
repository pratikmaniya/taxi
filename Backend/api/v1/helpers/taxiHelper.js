const promise = require('bluebird')

const config = require('../../utils/config')
const db = require('../../utils/db')
const taxi = require('../controllers/taxi')

class TaxiHelper {
    async insertTaxi(body) {
        try {
            const data = {
                phone_no: body.phone_no,
                email: body.email,
                first_name: body.first_name,
                last_name: body.last_name,
                plate_no: body.plate_no,
                brand_name: body.brand_name,
                brand_model: body.brand_model,
                colour: body.colour,
                license_image_front: body.license_image_front,
                license_image_back: body.license_image_back,
                vehicle_image: body.vehicle_image,
                proof_of_eligibility_image: body.proof_of_eligibility_image
            }
            await db.insert('taxis', data)
            return true
        } catch (error) {
            return promise.reject(error)
        }
    }
    async selectTaxi(plate_no, user_type, throw_error_for_exists) {
        try {
            let selectParams = ` taxis.*, CONCAT('${config.s3uploadURL}/', taxis.license_image_front) AS license_image_front,
                                CONCAT('${config.s3uploadURL}/', taxis.vehicle_image) AS vehicle_image, AVG(reviews.rating) AS rating `,
                joins = ` LEFT JOIN reviews ON reviews.taxi_id=taxis.id `,
                where = ` REPLACE(LOWER(plate_no), ' ', '')=REPLACE(LOWER('${plate_no}'), ' ', '') `,
                pagination = ` GROUP BY taxis.id `
            if (user_type !== 2) {
                where += ` AND is_approved=true `
            }
            const taxis = await db.select('taxis' + joins, selectParams, where + pagination)
            if (throw_error_for_exists) {
                if (taxis && taxis.length > 0) {
                    throw 'TAXI_WITH_PLATE_NO_ALREADY_REGISTERED'
                } else {
                    return true
                }

            } else {
                if (taxis.length === 0) {
                    throw 'TAXI_WITH_ID_NOT_FOUND'
                } else {
                    return taxis[0]
                }
            }
        } catch (error) {
            return promise.reject(error)
        }
    }
    async selectTaxis(body) {
        try {
            let selectParams = ` *, CONCAT('${config.s3uploadURL}/', license_image_front) AS license_image_front,
                                CONCAT('${config.s3uploadURL}/', license_image_back) AS license_image_back,
                                CONCAT('${config.s3uploadURL}/', vehicle_image) AS vehicle_image,
                                CONCAT('${config.s3uploadURL}/', proof_of_eligibility_image) AS proof_of_eligibility_image `,
                where = ` 1=1 `,
                pagination = ` ORDER BY created_date DESC LIMIT ${Number(config.limit)} OFFSET ${Number(config.limit) * (Number(body.page_no) - 1)}`
            if (body.query_string && body.query_string.trim().length > 0) {
                where += ` AND (LOWER(first_name) LIKE LOWER('%${body.query_string.replace(/'/g, "''")}%')
                            OR LOWER(last_name) LIKE LOWER('%${body.query_string.replace(/'/g, "''")}%')
                            OR LOWER(plate_no) LIKE LOWER('%${body.query_string.replace(/'/g, "''")}%')) `
            }
            const taxis = await db.select('taxis', selectParams, where + pagination),
                taxisCount = await db.select('taxis', `COUNT(*) AS count`, where)
            return { taxis, taxisCount: taxisCount.length > 0 ? taxisCount[0].count : 0 }
        } catch (error) {
            return promise.reject(error)
        }
    }
    async updateTaxi(taxi_id, flag) {
        try {
            const where = ` id=${taxi_id} `,
                data = {
                    is_approved: flag,
                    modified_date: 'now()'
                },
                result = await db.update('taxis', where, data)
            if (result.affectedRows === 0) {
                throw 'TAXI_WITH_ID_NOT_FOUND'
            } else {
                return true
            }
        } catch (error) {
            return promise.reject(error)
        }
    }
    async selectReviews(taxi_id, page_no) {
        try {
            const selectParams = ` * `,
                where = ` taxi_id=${taxi_id} `,
                pagination = ` ORDER BY created_date DESC LIMIT ${Number(config.limit)} OFFSET ${Number(config.limit) * (Number(page_no) - 1)} `,
                reviews = await db.select('reviews', selectParams, where + pagination),
                reviewsCount = await db.select('reviews', `COUNT(DISTINCT id) AS count`, where)
            return { reviews, reviewsCount: reviewsCount.length > 0 ? reviewsCount[0].count : 0 }
        } catch (error) {
            return promise.reject(error)
        }
    }
    async insertReview(body, user_id) {
        try {
            const data = {
                user_id: user_id,
                taxi_id: body.taxi_id,
                rating: body.rating,
                comment: body.comment
            }
            await db.insert('reviews', data)
            return true
        } catch (error) {
            return promise.reject(error)
        }
    }
    async isAbleToReview(user_id, taxi_id) {
        try {
            const selectParams = ` COUNT(id) AS today_total_ratings, COUNT(id) FILTER(where taxi_id=${taxi_id}) AS today_taxi_rating `,
                where = ` user_id=${user_id} AND DATE(created_date)=CURRENT_DATE `,
                reviews = await db.select('reviews', selectParams, where)
            if (Number(reviews[0].today_total_ratings) > config.daily_review_limit) {
                return { code: 2, message: 'DAILY_REVIEW_LIMIT_REACHED' }
            } else if (Number(reviews[0].today_taxi_rating) > 0) {
                return { code: 2, message: 'ALREADY_SUBMITTED_REVIEW_FOR_TODAY' }
            } else {
                return { code: 1, message: 'ABLE_TO_REVIEW' }
            }
        } catch (error) {
            return promise.reject(error)
        }
    }
}

module.exports = new TaxiHelper()