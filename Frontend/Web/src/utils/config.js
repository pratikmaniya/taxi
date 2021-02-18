let config = {}
config['AUTHORIZATION'] = '%!DyVNgw4x%MOBpwHgEeG&glJRsN3wlC4p4yMpHkmv^NW7BK%Z';
console.log('Environment:::', process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
    config = {
        API_BASE_URL: 'https://info.incoognito.com/api/v1/',
        //http://159.100.208.43/wage
        image_url: 'https://home.wagedev.com:8443',
        LANGUAGE: 'EN',
        web_url: 'https://wageapp.io/',
        EMAIL_REGEX: '',
        GOOGLE_KEY: "AIzaSyDRBumq-xj5aw8Psutvq0rwmgOL0gHNLBs",
        STORAGE_KEYS: {
            AUTH: 'webauth',
            IS_CLIENT: 'isClient',
            AUTH_TOKEN: 'web_auth_token'
        },
        APP_NAME: 'Taxi'
    };
} else {
    //https://admin.wagedev.com/ http://3.217.25.173:3005/api/v1/ http://3.217.25.173:3005/admin/
    config = {
        API_BASE_URL: 'http://localhost:3004/api/v1/',
        image_url: 'https://home.wagedev.com:8443',
        LANGUAGE: 'EN',
        web_url: 'https://wageapp.io/',
        GOOGLE_KEY: "AIzaSyDRBumq-xj5aw8Psutvq0rwmgOL0gHNLBs",
        STORAGE_KEYS: {
            AUTH: 'webauth',
            IS_CLIENT: 'isClient',
            AUTH_TOKEN: 'web_auth_token'
        },
        APP_NAME: 'Taxi'
    };
}

export default config;