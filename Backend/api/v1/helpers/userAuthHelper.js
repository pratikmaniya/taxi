const bcrypt = require('bcryptjs')
const promise = require('bluebird')

const db = require('../../utils/db')

class UserAuthHelper {
    async insertUser(body) {
        try {
            const data = {
                name: body.name ? body.name : null,
                email: body.email ? body.email : null,
                social_id: body.social_id ? body.social_id : null,
                mobile_no: body.mobile_no,
                otp: body.otp,
                is_verified: 0,
                is_active: 1,
                created_date: dateHelper.getCurrentTimeStamp(),
                modified_date: dateHelper.getCurrentTimeStamp()
            },
                user = await db.insert('users', data)
            return user
        } catch (error) {
            return promise.reject(error)
        }
    }
    async sendOTPSMS(mobile_no, otp) {
        try {
            // SEND OTP
        } catch (error) {
            return promise.reject(error)
        }
    }
    async insertToken(user_id, auth_token, headers) {
        try {
            const data = {
                user_id: user_id,
                auth_token: auth_token,
                device_id: headers.device_id,
                device_token: headers.device_token,
                device_type: headers.device_type,
                os: headers.os,
                app_version: headers.device_type === '0' ? headers.ios_app_version : headers.android_app_version ? headers.android_app_version : headers.web_app_version,
                created_date: dateHelper.getCurrentTimeStamp(),
                modified_date: dateHelper.getCurrentTimeStamp()
            }
            await db.insert('user_auth_relation', data)
            return true
        } catch (error) {
            console.log(error)
            return promise.reject(error)
        }
    }
    async updateOTP(user_id, otp) {
        try {
            const where = `id='${user_id}'`,
                data = {
                    otp: otp,
                    modified_date: dateHelper.getCurrentTimeStamp()
                }
            await db.update("users", where, data)
            return true
        } catch (error) {
            console.log(error)
            return promise.reject(error)
        }
    }
    async updateIsVerified(user_id, is_verified) {
        try {
            const where = `id='${user_id}'`,
                data = {
                    is_verified: is_verified,
                    modified_date: dateHelper.getCurrentTimeStamp()
                }
            await db.update("users", where, data)
            return true
        } catch (error) {
            console.log(error)
            return promise.reject(error)
        }
    }
    async updateToken(auth_token, old_token) {
        try {
            const where = `auth_token='${old_token}'`,
                data = {
                    auth_token: auth_token,
                    modified_date: dateHelper.getCurrentTimeStamp()
                }
            await db.update("user_auth_relation", where, data)
            return true
        } catch (error) {
            console.log(error)
            return promise.reject(error)
        }
    }
    async updateUser(body, user_arg) {
        try {
            const condition = ` id=${user_arg.id} `,
                data = {
                    name: body.name,
                    email: body.email,
                    profile_image: body.profile_image,
                    modified_date: dateHelper.getCurrentTimeStamp()
                }
            await db.update('users', condition, data)
            return data
        } catch (error) {
            return promise.reject(error)
        }
    }
    async clearUserAuthData(device_id) {
        try {
            const where = `device_id='${device_id}'`
            await db.delete('user_auth_relation', where)
            return true
        } catch (error) {
            console.log(error)
            return promise.reject(error)
        }
    }
}

module.exports = new UserAuthHelper()