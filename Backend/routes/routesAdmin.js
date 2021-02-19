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
router.get('/taxi/:taxi_id', headerValidator.authValidation, headerValidator.isAdmin, taxi.getTaxi)
router.post('/taxi', headerValidator.authValidation, headerValidator.isAdmin, taxi.updateTaxi)

module.exports = router