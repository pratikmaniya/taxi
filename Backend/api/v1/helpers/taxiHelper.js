const promise = require('bluebird')

const config = require('../../utils/config')
const db = require('../../utils/db')
const taxi = require('../controllers/taxi')

class TaxiHelper {
    async insertTaxi(body) {
        try {
            const data = {
                plate_no: body.plate_no,
                brand_name: body.brand_name,
                brand_model: body.brand_model,
                colour: body.colour,
                insurance_provider: body.insurance_provider,
                vehicle_image: body.vehicle_image
            },
                taxi = await db.insert('taxis', data)
            return taxi.id
        } catch (error) {
            return promise.reject(error)
        }
    }
    async insertDriver(body) {
        try {
            const data = {
                taxi_id: body.taxi_id,
                phone_no: body.phone_no,
                first_name: body.first_name,
                last_name: body.last_name,
                driver_permit_number: body.driver_permit_number,
                license_image_front: body.license_image_front,
                license_image_back: body.license_image_back
            }
            await db.insert('drivers', data)
            return true
        } catch (error) {
            return promise.reject(error)
        }
    }
    async selectTaxi(plate_no, user_type, throw_error_for_not_exists) {
        try {
            let selectParams = ` taxis.*, 
                                COALESCE(JSON_AGG(json_build_object(
                                    'id', drivers.id,
                                    'first_name', drivers.first_name,
                                    'last_name', drivers.last_name,
                                    'license_image_front', CONCAT('${config.s3uploadURL}/', drivers.license_image_front)
                                )) FILTER (WHERE drivers.id IS NOT NULL),'[]') AS drivers,
                                CONCAT('${config.s3uploadURL}/', taxis.vehicle_image) AS vehicle_image `,
                joins = ` LEFT JOIN drivers ON drivers.taxi_id=taxis.id AND drivers.is_approved=true `,
                where = ` REPLACE(LOWER(plate_no), ' ', '')=REPLACE(LOWER('${plate_no}'), ' ', '') `,
                pagination = ` GROUP BY taxis.id `
            if (user_type === 1) {
                where += ` AND taxis.is_approved=true `
            }
            const taxis = await db.select('taxis' + joins, selectParams, where + pagination)
            if (taxis.length === 0) {
                if (throw_error_for_not_exists) {
                    throw 'TAXI_WITH_ID_NOT_FOUND'
                } else {
                    return false
                }
            } else {
                return taxis[0]
            }
        } catch (error) {
            return promise.reject(error)
        }
    }
    async selectTaxiForAdmin(taxi_id) {
        try {
            const selectParams = ` taxis.*, 
                                COALESCE(JSON_AGG(json_build_object(
                                    'id', drivers.id,
                                    'phone_no', drivers.phone_no,
                                    'first_name', drivers.first_name,
                                    'last_name', drivers.last_name,
                                    'driver_permit_number', drivers.driver_permit_number,
                                    'is_approved', drivers.is_approved,
                                    'created_date', drivers.created_date,
                                    'modified_date', drivers.modified_date,
                                    'license_image_front', CONCAT('${config.s3uploadURL}/', drivers.license_image_front),
                                    'license_image_back', CONCAT('${config.s3uploadURL}/', drivers.license_image_back)
                                )) FILTER (WHERE drivers.id IS NOT NULL),'[]') AS drivers,
                                CONCAT('${config.s3uploadURL}/', taxis.vehicle_image) AS vehicle_image `,
                joins = ` LEFT JOIN drivers ON drivers.taxi_id=taxis.id `,
                where = ` taxis.id=${taxi_id} `,
                pagination = ` GROUP BY taxis.id `,
                taxis = await db.select('taxis' + joins, selectParams, where + pagination)
            if (taxis.length === 0) {
                throw 'TAXI_WITH_ID_NOT_FOUND'
            } else {
                return taxis[0]
            }
        } catch (error) {
            return promise.reject(error)
        }
    }
    async selectTaxis(body) {
        try {
            let selectParams = ` *, CONCAT('${config.s3uploadURL}/', vehicle_image) AS vehicle_image `,
                where = ` 1=1 `,
                pagination = ` ORDER BY created_date DESC LIMIT ${Number(config.limit)} OFFSET ${Number(config.limit) * (Number(body.page_no) - 1)}`
            if (body.query_string && body.query_string.trim().length > 0) {
                where += ` AND LOWER(plate_no) LIKE LOWER('%${body.query_string.replace(/'/g, "''")}%') `
            }
            const taxis = await db.select('taxis', selectParams, where + pagination),
                taxisCount = await db.select('taxis', `COUNT(*) AS count`, where)
            return { taxis, taxisCount: taxisCount.length > 0 ? taxisCount[0].count : 0 }
        } catch (error) {
            return promise.reject(error)
        }
    }
    async selectDrivers(body) {
        try {
            let selectParams = ` drivers.*, taxis.plate_no,CONCAT('${config.s3uploadURL}/', drivers.license_image_front) AS license_image_front `,
                joins = ` LEFT JOIN taxis ON taxis.id=drivers.taxi_id `,
                where = ` 1=1 `,
                pagination = ` ORDER BY drivers.created_date DESC LIMIT ${Number(config.limit)} OFFSET ${Number(config.limit) * (Number(body.page_no) - 1)}`
            if (body.query_string && body.query_string.trim().length > 0) {
                where += ` AND ((REPLACE(LOWER(taxis.plate_no), ' ', '') LIKE REPLACE(LOWER('%${body.query_string.replace(/'/g, "''")}%'), ' ', ''))
                                OR (LOWER(drivers.driver_permit_number) LIKE LOWER('%${body.query_string.replace(/'/g, "''")}%'))
                                OR (LOWER(drivers.first_name) LIKE LOWER('%${body.query_string.replace(/'/g, "''")}%'))
                                OR (LOWER(drivers.last_name) LIKE LOWER('%${body.query_string.replace(/'/g, "''")}%'))) `
            }
            const drivers = await db.select('drivers' + joins, selectParams, where + pagination),
                driversCount = await db.select('drivers' + joins, `COUNT(*) AS count`, where)
            return { drivers, driversCount: driversCount.length > 0 ? driversCount[0].count : 0 }
        } catch (error) {
            return promise.reject(error)
        }
    }
    async updateTaxi(body) {
        try {
            let where = ` id=${body.taxi_id} `,
                data = {
                    modified_date: 'now()'
                }
            if ('flag' in body) {
                data.is_approved = body.flag
            }
            if ('stolen_flag' in body) {
                data.is_stolen = body.stolen_flag
            }
            const result = await db.update('taxis', where, data)
            if (result.affectedRows === 0) {
                throw 'TAXI_WITH_ID_NOT_FOUND'
            } else {
                return true
            }
        } catch (error) {
            return promise.reject(error)
        }
    }
    async updateDriver(body) {
        try {
            let where = ` id=${body.driver_id} `,
                data = {
                    modified_date: 'now()'
                }
            if ('flag' in body) {
                data.is_approved = body.flag
            }
            const result = await db.update('drivers', where, data)
            if (result.affectedRows === 0) {
                throw 'DRIVER_WITH_ID_NOT_FOUND'
            } else {
                return true
            }
        } catch (error) {
            return promise.reject(error)
        }
    }
    async selectDriver(driver_id) {
        try {
            let selectParams = ` drivers.*, AVG(reviews.rating) AS rating,
                                CONCAT('${config.s3uploadURL}/', drivers.license_image_front) AS license_image_front,
                                CONCAT('${config.s3uploadURL}/', drivers.license_image_back) AS license_image_back `,
                joins = ` LEFT JOIN reviews ON reviews.driver_id=drivers.id AND reviews.is_deleted=false `,
                where = ` drivers.id=${driver_id} `,
                pagination = ` GROUP BY drivers.id `
            const drivers = await db.select('drivers' + joins, selectParams, where + pagination)
            if (drivers.length === 0) {
                throw 'DRIVER_WITH_ID_NOT_FOUND'
            } else {
                return drivers[0]
            }
        } catch (error) {
            return promise.reject(error)
        }
    }
    async selectReviews(driver_id, page_no) {
        try {
            const selectParams = ` * `,
                where = ` driver_id=${driver_id} AND is_deleted=false `,
                pagination = ` ORDER BY created_date DESC LIMIT ${Number(config.limit)} OFFSET ${Number(config.limit) * (Number(page_no) - 1)} `,
                reviews = await db.select('reviews', selectParams, where + pagination),
                reviewsCount = await db.select('reviews', `COUNT(DISTINCT id) AS count`, where)
            return { reviews, reviewsCount: reviewsCount.length > 0 ? reviewsCount[0].count : 0 }
        } catch (error) {
            return promise.reject(error)
        }
    }
    async selectReviewsForAdmin(body) {
        try {
            let selectParams = ` reviews.id, reviews.rating, reviews.comment, reviews.created_date, reviews.ip,
                                users.first_name AS user_first_name, users.last_name AS user_last_name, 
                                drivers.first_name AS driver_first_name, drivers.last_name AS driver_last_name, taxis.plate_no `,
                joins = ` LEFT JOIN users ON reviews.user_id=users.id
                        LEFT JOIN drivers ON reviews.driver_id=drivers.id
                        LEFT JOIN taxis ON drivers.taxi_id=taxis.id `,
                where = ` reviews.is_deleted=false `,
                pagination = ` ORDER BY drivers.created_date DESC LIMIT ${Number(config.limit)} OFFSET ${Number(config.limit) * (Number(body.page_no) - 1)}`
            if (body.query_string && body.query_string.trim().length > 0) {
                where += ` AND ((REPLACE(LOWER(taxis.plate_no), ' ', '') LIKE REPLACE(LOWER('%${body.query_string.replace(/'/g, "''")}%'), ' ', ''))
                                OR (LOWER(reviews.ip) LIKE LOWER('%${body.query_string.replace(/'/g, "''")}%'))
                                OR (LOWER(drivers.first_name) LIKE LOWER('%${body.query_string.replace(/'/g, "''")}%'))
                                OR (LOWER(drivers.last_name) LIKE LOWER('%${body.query_string.replace(/'/g, "''")}%'))
                                OR (LOWER(users.first_name) LIKE LOWER('%${body.query_string.replace(/'/g, "''")}%'))
                                OR (LOWER(users.last_name) LIKE LOWER('%${body.query_string.replace(/'/g, "''")}%'))) `
            }
            const reviews = await db.select('reviews' + joins, selectParams, where + pagination),
                reviewsCount = await db.select('reviews' + joins, `COUNT(DISTINCT reviews.id) AS count`, where)
            return { reviews, reviewsCount: reviewsCount.length > 0 ? reviewsCount[0].count : 0 }
        } catch (error) {
            return promise.reject(error)
        }
    }
    async selectReviewsForAdminByDriver(driver_id, page_no) {
        try {
            const selectParams = ` reviews.id, reviews.ip, reviews.rating, reviews.comment, reviews.created_date, users.first_name, users.last_name `,
                joins = ` LEFT JOIN users ON reviews.user_id=users.id `,
                where = ` reviews.driver_id=${driver_id} AND reviews.is_deleted=false`,
                pagination = ` ORDER BY created_date DESC LIMIT ${Number(config.limit)} OFFSET ${Number(config.limit) * (Number(page_no) - 1)} `,
                reviews = await db.select('reviews' + joins, selectParams, where + pagination),
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
                ip: body.ip,
                driver_id: body.driver_id,
                rating: body.rating,
                comment: body.comment
            }
            await db.insert('reviews', data)
            return true
        } catch (error) {
            return promise.reject(error)
        }
    }
    async isAbleToReview(user_id, driver_id) {
        try {
            const selectParams = ` COUNT(id) AS today_total_ratings, COUNT(id) FILTER(where driver_id=${driver_id}) AS today_taxi_rating `,
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
    async deleteReview(review_id) {
        try {
            const where = ` id=${review_id} `,
                data = {
                    is_deleted: true,
                    modified_date: 'now()'
                },
                result = await db.update('reviews', where, data)
            if (result.affectedRows === 0) {
                throw 'REVIEW_WITH_ID_NOT_FOUND'
            } else {
                return true
            }
        } catch (error) {
            return promise.reject(error)
        }
    }
}

module.exports = new TaxiHelper()