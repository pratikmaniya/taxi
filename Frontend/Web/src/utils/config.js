let config = {}
console.log('Environment:::', process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
    config = {
        AUTHORIZATION: '%!DyVNgw4x%MOBpwHgEeG&glJRsN3wlC4p4yMpHkmv^NW7BK%Z',
        API_BASE_URL: 'https://info.incoognito.com/api/v1/',
        EMAIL_REGEX: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        MOBILE_REGEX: /^([0|\+[0-9]{1,5})?([0-9]{7})$/
    };
} else {
    config = {
        AUTHORIZATION: '%!DyVNgw4x%MOBpwHgEeG&glJRsN3wlC4p4yMpHkmv^NW7BK%Z',
        API_BASE_URL: 'http://localhost:3004/api/v1/',
        EMAIL_REGEX: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        MOBILE_REGEX: /^([0|\+[0-9]{1,5})?([0-9]{7})$/
    };
}

export default config;