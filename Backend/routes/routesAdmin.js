const express = require('express')
const router = express.Router()

const headerValidator = require('../api/utils/headersValidator')
const adminAuth = require('../api/v1/controllers/adminAuth')
const users = require('../api/v1/controllers/users')
const taxi = require('../api/v1/controllers/taxi')

//authentication
router.post('/signin', headerValidator.nonAuthValidation, adminAuth.signin)
router.post('/sendForgotPasswordMail', headerValidator.nonAuthValidation, adminAuth.sendForgotPasswordMail)
router.post('/changePassword', headerValidator.authValidation, adminAuth.changePassword)
router.post('/resetPassword', headerValidator.authValidation, adminAuth.resetPassword)

//users
router.get('/users', headerValidator.authValidation, headerValidator.isAdmin, users.getAllUsers)
router.post('/user', headerValidator.authValidation, headerValidator.isAdmin, users.updateUser)

//Taxi
router.get('/taxis', headerValidator.authValidation, headerValidator.isAdmin, taxi.getTaxis)
router.get('/taxi/:taxi_id', headerValidator.authValidation, headerValidator.isAdmin, taxi.getTaxiForAdmin)
router.get('/driver/:driver_id', headerValidator.nonAuthValidation, taxi.getDriver)
router.post('/taxi', headerValidator.authValidation, headerValidator.isAdmin, taxi.updateTaxi)
router.post('/driver', headerValidator.authValidation, headerValidator.isAdmin, taxi.updateDriver)
router.get('/review/:driver_id', headerValidator.authValidation, taxi.getReviewsForAdmin)

module.exports = router