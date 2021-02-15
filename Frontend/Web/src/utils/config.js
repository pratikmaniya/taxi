let config = {}
config['AUTHORIZATION']='@#Slsjpoq$S1o08#MnbAiB%UVUV&Y*5EU@exS1o!08L9TSlsjpo#TEKOTO';
console.log('Environment:::', process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
    config = {
        API_BASE_URL: 'https://www.noticetenant.com:8443/api/v1/',
        //http://159.100.208.43/wage
        image_url: 'https://home.wagedev.com:8443',
        LANGUAGE: 'EN',
        web_url: 'https://wageapp.io/',
        EMAIL_REGEX: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        GOOGLE_KEY: "AIzaSyDRBumq-xj5aw8Psutvq0rwmgOL0gHNLBs"
    };
}
else if (process.env.NODE_ENV === 'sandbox') {
    config = {
        API_BASE_URL: 'https://www.noticetenant.com:8443/api/v1/',
        image_url: 'https://home.wagedev.com:8443',
        LANGUAGE: 'EN',
        web_url: 'https://wageapp.io/',
        EMAIL_REGEX: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        GOOGLE_KEY: "AIzaSyDRBumq-xj5aw8Psutvq0rwmgOL0gHNLBs"
    };
}
else {
    //https://admin.wagedev.com/ http://3.217.25.173:3005/api/v1/ http://3.217.25.173:3005/admin/
    config = {
        API_BASE_URL: 'https://www.noticetenant.com:8443/api/v1/',
        image_url: 'https://home.wagedev.com:8443',
        LANGUAGE: 'EN',
        web_url: 'https://wageapp.io/',
        EMAIL_REGEX: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        GOOGLE_KEY: "AIzaSyDRBumq-xj5aw8Psutvq0rwmgOL0gHNLBs"
    };
}

export default config;