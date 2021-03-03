const taxiValidator = require('../validators/taxiValidator')
const taxiHelper = require('../helpers/taxiHelper')
const responseHelper = require('../../utils/responseHelper')
const S3helper = require('../../utils/S3helper')

class Taxi {
    async getTaxis(req, res) {
        try {
            await taxiValidator.validateGetAllTaxisForm(req.query)
            const taxis = await taxiHelper.selectTaxis(req.query)
            responseHelper.success(res, 'GET_TAXIS_SUCCESS', req.headers.language, { total_taxis: taxis.taxisCount, taxis: taxis.taxis })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    async getTaxi(req, res) {
        try {
            const taxi = await taxiHelper.selectTaxi(req.query.search, req.user_type)
            responseHelper.success(res, 'GET_TAXIS_SUCCESS', req.headers.language, { ...taxi })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    async getDriver(req, res) {
        try {
            const taxi = await taxiHelper.selectDriver(req.params.driver_id)
            responseHelper.success(res, 'GET_DRIVERS_SUCCESS', req.headers.language, { ...taxi })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    async getTaxiForAdmin(req, res) {
        try {
            const taxi = await taxiHelper.selectTaxiForAdmin(req.params.taxi_id)
            responseHelper.success(res, 'GET_TAXIS_SUCCESS', req.headers.language, { ...taxi })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    async addTaxi(req, res) {
        try {
            await taxiValidator.validateAddTaxiForm(req.body)
            const taxi = await taxiHelper.selectTaxi(req.body.plate_no)
            if (req.files.license_image_front && req.files.license_image_front.length > 0
                && req.files.license_image_back && req.files.license_image_back.length > 0
                && req.files.vehicle_image && req.files.vehicle_image.length > 0) {
                req.body.license_image_front = await S3helper.uploadImageOnS3('taxi/', req.files.license_image_front[0])
                req.body.license_image_back = await S3helper.uploadImageOnS3('taxi/', req.files.license_image_back[0])
                if (taxi && Object.keys(taxi).length > 0) {
                    req.body.taxi_id = taxi.id
                } else {
                    req.body.vehicle_image = await S3helper.uploadImageOnS3('taxi/', req.files.vehicle_image[0])
                    req.body.taxi_id = await taxiHelper.insertTaxi(req.body)
                }
                await taxiHelper.insertDriver(req.body)
                responseHelper.success(res, 'ADD_TAXI_SUCCESS', req.headers.language)
            } else {
                throw { param: 'images', type: 'required' }
            }
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    async updateTaxi(req, res) {
        try {
            await taxiValidator.validateEditTaxiForm(req.body)
            await taxiHelper.updateTaxi(req.body)
            responseHelper.success(res, 'EDIT_TAXI_SUCCESS', req.headers.language)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    async updateDriver(req, res) {
        try {
            await taxiValidator.validateEditDriverForm(req.body)
            await taxiHelper.updateDriver(req.body)
            responseHelper.success(res, 'EDIT_DRIVER_SUCCESS', req.headers.language)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    async getReviews(req, res) {
        try {
            const reviews = await taxiHelper.selectReviews(req.params.driver_id, req.query.page_no)
            responseHelper.success(res, 'GET_REVIEWS_SUCCESS', req.headers.language, { total_reviews: reviews.reviewsCount, reviews: reviews.reviews })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    async getReviewsForAdmin(req, res) {
        try {
            const reviews = await taxiHelper.selectReviewsForAdmin(req.params.driver_id, req.query.page_no)
            responseHelper.success(res, 'GET_REVIEWS_SUCCESS', req.headers.language, { total_reviews: reviews.reviewsCount, reviews: reviews.reviews })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    async addReview(req, res) {
        try {
            await taxiValidator.validateAddReviewForm(req.body)
            await taxiHelper.insertReview(req.body, req.user_id)
            responseHelper.success(res, 'ADD_REVIEW_SUCCESS', req.headers.language)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    async isAbleToReview(req, res) {
        try {
            const message = await taxiHelper.isAbleToReview(req.user_id, req.params.driver_id)
            responseHelper.success(res, message.message, req.headers.language, { ...message })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
}

module.exports = new Taxi()