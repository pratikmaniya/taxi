
export const LANGUAGE = 'en'
export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const WEBPAGE_URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
export const PER_PAGE = 10
export const PAGE_RANGE = 5
export const RICH_TEXT_BOX_OPTIONS = ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded'/*, 'emoji'*/, 'image', 'remove', 'history']

export const APP_NAME = 'Taxi'

export const NOTIFICATION_TEXT_LENGTH = 120

export const LAST_EDIT_ID_SHOW_TIME = 5000

export const DEFAULT_DATE = '01/01/1920'

export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD'

export const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const STORAGE_KEYS = {
    AUTH: 'webauth',
    IS_CLIENT: 'isClient',
    AUTH_TOKEN: 'web_auth_token'
}

export var PAGE_PROPS = {
    [process.env.PUBLIC_URL + '/']: {
        headerText: 'Dashboard',
        searchText: '',
        isSearchClicked: false,
        renderSearchBox: false,
        hideContentHeader: true,
    },
    [process.env.PUBLIC_URL + '/dashboard']: {
        headerText: 'Dashboard',
        searchText: '',
        isSearchClicked: false,
        renderSearchBox: false,
        hideContentHeader: true,
    },
    [process.env.PUBLIC_URL + '/salon']: {
        headerText: 'Salon',
        searchText: '',
        isSearchClicked: false,
        renderSearchBox: true
    },
    [process.env.PUBLIC_URL + '/salon/staff']: {
        headerText: 'Staff Details',
        searchText: '',
        isSearchClicked: false,
        renderSearchBox: false
    },
    [process.env.PUBLIC_URL + '/salon/edit']: {
        headerText: 'Edit Salon',
        searchText: '',
        isSearchClicked: false,
        renderSearchBox: false
    },
    [process.env.PUBLIC_URL + '/servicecategory']: {
        headerText: 'Service Category',
        searchText: '',
        isSearchClicked: false,
        renderSearchBox: false
    },
    [process.env.PUBLIC_URL + '/servicecategory/addservicecategory']: {
        headerText: ' Add Service Category',
        searchText: '',
        isSearchClicked: false,
        renderSearchBox: false
    },
    [process.env.PUBLIC_URL + '/servicecategory/edit']: {
        headerText: ' Edit Service Category',
        searchText: '',
        isSearchClicked: false,
        renderSearchBox: false
    },
    [process.env.PUBLIC_URL + '/salon/edit/service']: {
        headerText: ' Services',
        searchText: '',
        isSearchClicked: false,
        renderSearchBox: false
    },
    [process.env.PUBLIC_URL + '/salon/edit/addservice']: {
        headerText: ' Add Service',
        searchText: '',
        isSearchClicked: false,
        renderSearchBox: false
    },
    [process.env.PUBLIC_URL + '/customers']: {
        headerText: 'Customers',
        searchText: '',
        isSearchClicked: false,
        renderSearchBox: true
    },
    [process.env.PUBLIC_URL + '/customers/edit']: {
        headerText: 'Edit Customers',
        searchText: '',
        isSearchClicked: false,
        renderSearchBox: false
    },
    [process.env.PUBLIC_URL + '/salon/offers']: {
        headerText: 'Offers',
        searchText: '',
        isSearchClicked: false,
        renderSearchBox: true
    },
    [process.env.PUBLIC_URL + '/referrals/referrals']: {
        headerText: 'Referrals',
        searchText: '',
        isSearchClicked: false,
        renderSearchBox: false
    },
}