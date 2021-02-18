const express = require('express')
const router = express.Router()
const Multer = require('multer')

const headerValidator = require('../api/utils/headersValidator')
const userAuth = require('../api/v1/controllers/userAuth')
const taxi = require('../api/v1/controllers/taxi')

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 100 * 1024 * 1024, // Maximum file size is 10MB
    },
}),
    taxi_image_fields = [
        { name: 'license_image_front', maxCount: 1 },
        { name: 'license_image_back', maxCount: 1 },
        { name: 'vehicle_image', maxCount: 1 },
        { name: 'proof_of_eligibility_image', maxCount: 1 }
    ]

// authentication
router.post('/signin', headerValidator.nonAuthValidation, userAuth.signin)

// taxi
router.get('/taxi', headerValidator.nonAuthValidation, taxi.getTaxi)
router.put('/taxi', headerValidator.nonAuthValidation, multer.fields(taxi_image_fields), taxi.addTaxi)
router.get('/review/:taxi_id', headerValidator.nonAuthValidation, taxi.getReviews)
router.put('/review', headerValidator.authValidation, taxi.addReview)


module.exports = router