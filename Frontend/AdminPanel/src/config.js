console.log('Environment:::', process.env.NODE_ENV)

let config = {
    SampleCSVURL: "https://motologs-dev.s3.amazonaws.com/backend-utils/MotologsSampleCSV.csv",
    auth_token: "@#Slsjpoq$S1o08#MnbAiB%UVUV&Y*5EU@exS1o!08L9TSlsjpo#",
    EMAIL_REGEX: /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}

if (process.env.NODE_ENV === 'production') {
    config.API_BASE_URL = 'https://admin.loggy.com:8443/api/v1/admin/'
    config.urlCheckIndex = 2
} else {
    config.API_BASE_URL = 'http://localhost:3004/api/v1/admin/'
    config.urlCheckIndex = 1
}

export default config;