const promise = require('bluebird')
const jwt = require('jsonwebtoken');

const config = require('./config')

class CodeHelper {
    getLink(user_type, user_id) {
        const expirationTime = 15 * 60,
            sign = {
                user_id: user_id,
                user_type: user_type
            },
            token = jwt.sign(sign, config.JWTSecretKey, {
                expiresIn: expirationTime
            })
        return `${config.resetPasswordURLPrefix}?token=${token}`
    }
    getJwtToken(user_id, user_type) {
        try {
            let expirationTime = 15 * 60,
                sign = {
                    user_id: user_id,
                    user_type: user_type
                }
            if (user_type === 3) {
                expirationTime = 60 * 60
            }
            const token = jwt.sign(sign, config.JWTSecretKey, {
                expiresIn: expirationTime
            })
            return token
        } catch (error) {
            return promise.reject(error)
        }
    }
    refreshToken(old_token, for_admin) {
        try {
            let token, decoded = jwt.decode(old_token)
            if (decoded && decoded.user_id && decoded.email) {
                token = this.getJwtToken(decoded.user_id, decoded.email, for_admin)
            } else {
                throw 'TOKEN_MALFORMED'
            }
            return token
        } catch (error) {
            return promise.reject(error)
        }
    }
    decodeToken(token) {
        try {
            return new promise((resolve, reject) => {
                jwt.verify(token, config.JWTSecretKey, async (error, decoded) => {
                    if (error) {
                        console.log(error)
                        reject('TOKEN_EXPIRED')
                    } else {
                        resolve(decoded)
                    }
                })
            })
        } catch (error) {
            return promise.reject(error)
        }
    }
}

module.exports = new CodeHelper()
