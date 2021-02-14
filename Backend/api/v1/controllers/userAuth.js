const userAuthHelper = require('../helpers/userAuthHelper')
const userAuthValidator = require('../validators/userAuthValidator')
const responseHelper = require('../../utils/responseHelper')
const codeHelper = require('../../utils/codeHelper')
const S3helper = require('../../utils/S3helper')

class UserAuth {
    async signup(req, res) {
        try {
            await userAuthValidator.validateSignupForm(req.body)
            await userAuthValidator.isUserWithMobileExist(req.body.mobile_no, true)
            req.body.otp = await codeHelper.getOTP()
            const user = await userAuthHelper.insertUser(req.body)
            userAuthHelper.sendOTPSMS(req.body.mobile_no, req.body.otp)
            responseHelper.success(res, 'SIGNUP_SUCCESS', req.headers.language, { user_id: user.insertId })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    async isUserRegisteredWithSocialId(req, res) {
        try {
            await userAuthValidator.validateIsUserRegisteredWithSocialIdForm(req.body)
            await userAuthValidator.isUserWithSocialIdExist(req.body.social_id, true)
            responseHelper.success(res, 'SOCIAL_ID_IS_NEW', req.headers.language)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language, {})
        }
    }
    async signin(req, res) {
        try {
            await userAuthValidator.validateSigninForm(req.body)
            if (req.body.social_id) {
                let user = await userAuthValidator.isUserWithSocialIdExist(req.body.social_id, false),
                    token
                if (user.is_verified) {
                    token = await codeHelper.getJwtToken(user.id, 1)
                    await userAuthHelper.insertToken(user.id, token, req.headers)
                } else {
                    const otp = await codeHelper.getOTP()
                    await userAuthHelper.updateOTP(user.id, otp)
                    userAuthHelper.sendOTPSMS(user.mobile_no, otp)
                }
                delete user.otp
                responseHelper.success(res, 'OTP_VERIFIED', req.headers.language, { user, auth_token: token })
            } else {
                let user,
                    otp = await codeHelper.getOTP()
                if (req.body.email) {
                    user = await userAuthValidator.isUserWithEmailExist(req.body.email, false)
                    mailHelper.sendOTPMail(req.body.email, otp)
                } else {
                    user = await userAuthValidator.isUserWithMobileExist(req.body.mobile_no, false)
                    userAuthHelper.sendOTPSMS(req.body.mobile_no, otp)
                }
                await userAuthHelper.updateOTP(user.id, otp)
                delete user.otp
                responseHelper.success(res, 'SIGNIN_SUCCESS', req.headers.language, { user })
            }
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    async resendOTP(req, res) {
        try {
            await userAuthValidator.validateResendOTPForm(req.body)
            let user, otp = await codeHelper.getOTP()
            if (req.body.mobile_no) {
                user = await userAuthValidator.isUserWithMobileExist(req.body.mobile_no, false),
                    await userAuthHelper.updateOTP(user.id, otp)
                userAuthHelper.sendOTPSMS(req.body.mobile_no, otp)
            } else if (req.body.email) {
                user = await userAuthValidator.isUserWithEmailExist(req.body.email, false)
                mailHelper.sendOTPMail(req.body.email, otp)
            }
            responseHelper.success(res, 'OTP_SENT', req.headers.language, { user_id: user.id })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language, {})
        }
    }
    async verifyOTP(req, res) {
        try {
            await userAuthValidator.validateVerifyOTPForm(req.body)
            let token,
                user = await userAuthValidator.isUserWithIdExist(req.body.user_id)
            if (user.otp === Number(req.body.otp)) {
                await userAuthHelper.updateOTP(user.id, null)
                userAuthHelper.updateIsVerified(user.id, 1)
                token = await codeHelper.getJwtToken(user.id, 1)
                await userAuthHelper.insertToken(user.id, token, req.headers)
                delete user.otp
            } else {
                throw 'WRONG_OTP'
            }
            responseHelper.success(res, 'OTP_VERIFIED', req.headers.language, { user: user, auth_token: token })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    async editProfile(req, res) {
        try {
            await userAuthValidator.validateEditProfileForm(req.body)
            const user_db = await userAuthValidator.isUserWithIdExist(req.user_id)
            if (req.file) {
                req.body.profile_image = await S3helper.uploadImageOnS3('users/', req.file)
                if (user_db.profile_image) S3helper.deleteImageFromS3(user_db.profile_image)
            } else if (req.body.old_profile_image) {
                req.body.profile_image = req.body.old_profile_image
            } else {
                S3helper.deleteImageFromS3(user_db.profile_image)
            }
            const user = await userAuthHelper.updateUser(req.body, user_db)
            responseHelper.success(res, 'EDIT_PROFILE_SUCCESS', req.headers.language, user)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    async getProfile(req, res) {
        try {
            const user = await userAuthValidator.isUserWithIdExist(req.user_id)
            responseHelper.success(res, 'GET_PROFILE_SUCCESS', req.headers.language, { user })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }



    ///////////////////////////////////////////////////////////////
    async refreshToken(req, res) {
        try {
            await userAuthValidator.isTokenExists(req.headers.auth_token)
            const auth_token = await codeHelper.refreshToken(req.headers.auth_token)
            await userAuthHelper.updateToken(auth_token, req.headers.auth_token)
            responseHelper.success(res, 'TOKEN_REFRESHED', req.headers.language, { new_token: auth_token })
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    async updateDeviceToken(req, res) {
        try {
            await userAuthHelper.insertToken(req.user_id, req.headers.auth_token, req.headers)
            responseHelper.success(res, 'UPDATE_DEVICE_TOKEN_SUCCESS', req.headers.language)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
    async logOut(req, res) {
        try {
            await userAuthHelper.clearUserAuthData(req.headers.device_id)
            responseHelper.success(res, 'LOG_OUT_SUCCESS', req.headers.language)
        } catch (error) {
            console.log(error)
            responseHelper.error(res, error, req.headers.language)
        }
    }
}

module.exports = new UserAuth()