console.log('Environment:::', process.env.NODE_ENV)

let config = {
    LIMIT:10,
    auth_token: "%!DyVNgw4x%MOBpwHgEeG&glJRsN3wlC4p4yMpHkmv^NW7BK%Z",
    EMAIL_REGEX: /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}

if (process.env.NODE_ENV === 'production') {
    config.API_BASE_URL = 'https://www.ridesafett.com/api/v1/admin/'
    config.urlCheckIndex = 2
} else {
    config.API_BASE_URL = 'http://localhost:3004/api/v1/admin/'
    config.urlCheckIndex = 1
}

export default config;