const jwt = require('jsonwebtoken')
const semver = require('semver')

const config = require('./config')
const db = require('./db')
const responseHelper = require('./responseHelper')

class HeaderValidator {
  validateHeaders(headers) {
    let error
    if (!headers.language) {
      error = { param: 'language', type: 'required' }
    } else if (!headers.auth_token) {
      error = { param: 'auth_token', type: 'required' }
    } else if (!headers.web_app_version) {
      if (!headers.device_id) {
        error = { param: 'device_id', type: 'required' }
      } else if (!headers.device_token) {
        error = { param: 'device_token', type: 'required' }
      } else if (!headers.device_type) {
        error = { param: 'device_type', type: 'required' }
      } else if (headers.device_type === '0' && !headers.ios_app_version) {
        error = 'APP_VERSION_MISSING'
      } else if (headers.device_type === '1' && !headers.android_app_version) {
        error = 'APP_VERSION_MISSING'
      } else if (!headers.os) {
        error = { param: 'os', type: 'required' }
      } else {
        let version = headers.android_app_version ? headers.android_app_version : headers.ios_app_version
        let currentAppVerision = headers.android_app_version ? config.androidAppVerision : config.iosAppVerision
        let tmp_version = version.split(".")
        tmp_version = tmp_version.length < 3 ? tmp_version.concat(['0', '0', '0']) : tmp_version
        tmp_version.splice(3)
        version = tmp_version.join(".")
        if (semver.valid(version) === null) {
          error = 'INVALID_APP_VERSION'
        } else {
          if (semver.satisfies(version, `>= ${currentAppVerision}`)) {
          } else {
            error = 'UPGRADE_APP'
          }
        }
      }
    }
    return error
  }

  nonAuthValidation(req, res, next) {
    let error = HV.validateHeaders(req.headers)
    if (error) {
      responseHelper.error(res, error, req.headers.language)
    } else if (req.headers.auth_token !== config.default_auth_token) {
      HV.authValidation(req, res, next)
    } else {
      next()
    }
  }

  authValidation(req, res, next) {
    let error = HV.validateHeaders(req.headers)
    if (error) {
      responseHelper.error(res, error, req.headers.language)
    } else {
      let token = req.headers.auth_token
      jwt.verify(token, config.JWTSecretKey, (err, decoded) => {
        if (err) {
          if (req.route.path === "/refreshToken") {
            next()
          } else {
            responseHelper.error(res, 'TOKEN_EXPIRED', req.headers.language)
          }
        } else if (decoded && decoded.user_id && decoded.user_type) {
          req.user_id = decoded.user_id
          req.user_type = decoded.user_type
          if (decoded.user_type === 3) {
            next()
          } else {
            HV.isUserActive(req, res, next, decoded)
          }
        } else {
          responseHelper.error(res, 'TOKEN_MALFORMED', req.headers.language)
        }
      })
    }
  }

  isAdmin(req, res, next) {
    if (req.user_type === 3) {
      next()
    } else {
      responseHelper.error(res, 'NOT_AUTHORISED', req.headers.language)
    }
  }

  isAdminOrSeller(req, res, next) {
    if (req.user_type === 3 || req.user_type === 2) {
      next()
    } else {
      responseHelper.error(res, 'NOT_AUTHORISED', req.headers.language)
    }
  }

  async isUserActive(req, res, next, decoded) {
    let selectParams = 'is_active',
      where = `id='${decoded.user_id}'`,
      user = await db.select('users', selectParams, where)
    if (user[0] && user[0].is_active) {
      next();
    } else {
      responseHelper.error(res, 'USER_BLOCKED', req.headers.language)
    }
  }
}

const HV = new HeaderValidator()
module.exports = HV
