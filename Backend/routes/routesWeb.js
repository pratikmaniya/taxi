const express = require('express')
const router = express.Router()
const Multer = require('multer')

const headerValidator = require('../api/utils/headersValidator')
const userAuth = require('../api/v1/controllers/userAuth')
const categories = require('../api/v1/controllers/categories')

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 100 * 1024 * 1024, // Maximum file size is 10MB
    },
});

//authentication
router.post('/signup', headerValidator.nonAuthValidation, userAuth.signup)
router.post('/isUserRegisteredWithSocialId', headerValidator.nonAuthValidation, userAuth.isUserRegisteredWithSocialId)
router.post('/signin', headerValidator.nonAuthValidation, userAuth.signin)
router.post('/resendOTP', headerValidator.nonAuthValidation, userAuth.resendOTP)
router.post('/verifyOTP', headerValidator.nonAuthValidation, userAuth.verifyOTP)
router.get('/getProfile', headerValidator.authValidation,  userAuth.getProfile)
router.post('/editProfile', headerValidator.authValidation, multer.single('profile_image'), userAuth.editProfile)

// categories
router.post('/getAllCategories', headerValidator.nonAuthValidation, categories.getAllCategories)


module.exports = router