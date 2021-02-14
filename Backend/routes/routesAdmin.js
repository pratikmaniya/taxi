const express = require('express')
const router = express.Router()
const Multer = require('multer')

const headerValidator = require('../api/utils/headersValidator')
const adminAuth = require('../api/v1/controllers/adminAuth')
const users = require('../api/v1/controllers/users')
const categories = require('../api/v1/controllers/categories')

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 100 * 1024 * 1024, // Maximum file size is 10MB
    },
});

//authentication
router.post('/signin', headerValidator.nonAuthValidation, adminAuth.signin)
router.post('/changePassword', headerValidator.authValidation, adminAuth.changePassword)
router.post('/sendForgotPasswordMail', headerValidator.authValidation, adminAuth.sendForgotPasswordMail)
router.post('/resetPassword', headerValidator.authValidation, adminAuth.resetPassword)

//dashboard
router.get('/getCounts', headerValidator.authValidation, headerValidator.isAdminOrSeller, adminAuth.getCounts)

//users
router.post('/getAllUsers', headerValidator.authValidation, headerValidator.isAdmin, users.getAllUsers)
router.post('/updateActiveStatusOfUser', headerValidator.authValidation, headerValidator.isAdmin, users.updateActiveStatusOfUser)

//category
router.post('/getAllCategories', headerValidator.authValidation, headerValidator.isAdmin, categories.getAllCategories)
router.post('/getSingleCategory', headerValidator.authValidation, headerValidator.isAdmin, categories.getSingleCategory)
router.post('/addCategory', headerValidator.authValidation, headerValidator.isAdmin, multer.single('category_image'), categories.addCategory)
router.post('/editCategory', headerValidator.authValidation, headerValidator.isAdmin, multer.single('category_image'), categories.editCategory)
router.post('/updateActiveStatusOfCategory', headerValidator.authValidation, headerValidator.isAdmin, categories.updateActiveStatusOfCategory)

module.exports = router