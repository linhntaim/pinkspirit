export const APP_ENV = process.env.VUE_APP_ENV
export const APP_DEBUG = process.env.VUE_APP_DEBUG === 'true'
export const APP_LOG_ONLY = process.env.VUE_APP_LOG_ONLY ? process.env.VUE_APP_LOG_ONLY.split(',') : []
export const APP_HOST_SELF = 'self'
export const APP_HOST_SUB = 'sub'
export const APP_HOST = process.env.VUE_APP_HOST ? process.env.VUE_APP_HOST : APP_HOST_SELF
export const APP_HOST_SUB_PATH = APP_HOST === APP_HOST_SUB ? process.env.VUE_APP_HOST_SUB_PATH : ''
export const APP_NAME = process.env.VUE_APP_NAME
export const APP_VERSION = process.env.VUE_APP_VERSION
export const APP_TITLE = process.env.VUE_APP_TITLE
export const APP_DESCRIPTION = process.env.VUE_APP_DESCRIPTION
export const APP_AUTHOR = process.env.VUE_APP_AUTHOR
export const APP_URL = window.location.origin + (APP_HOST === APP_HOST_SUB ? APP_HOST_SUB_PATH : '')
export const APP_LOGO_URL = {
    original: APP_URL + '/sites/logos/logo.png',
    s32: APP_URL + '/sites/logos/logo_32x32.png',
    s128: APP_URL + '/sites/logos/logo_128x128.png',
    s256: APP_URL + '/sites/logos/logo_256x256.png',
    s512: APP_URL + '/sites/logos/logo_512x512.png',
    black_original: APP_URL + '/sites/logos/logo_black.png',
    black_s32: APP_URL + '/sites/logos/logo_black_32x32.png',
    black_s128: APP_URL + '/sites/logos/logo_black_128x128.png',
    black_s256: APP_URL + '/sites/logos/logo_black_256x256.png',
    black_s512: APP_URL + '/sites/logos/logo_black_512x512.png',
    white_original: APP_URL + '/sites/logos/logo_white.png',
    white_s32: APP_URL + '/sites/logos/logo_white_32x32.png',
    white_s128: APP_URL + '/sites/logos/logo_white_128x128.png',
    white_s256: APP_URL + '/sites/logos/logo_white_256x256.png',
    white_s512: APP_URL + '/sites/logos/logo_white_512x512.png',
}
export const APP_COOKIE = {
    names: {
        default: process.env.VUE_APP_COOKIE_DEFAULT_NAME,
        localization: process.env.VUE_APP_COOKIE_LOCALIZATION_NAME,
    },
    disabled: {
        localization: process.env.VUE_APP_COOKIE_DISABLE_LOCALIZATION,
    },
    secret: process.env.VUE_APP_COOKIE_SECRET,
    domain: process.env.VUE_APP_COOKIE_DOMAIN,
}
export const APP_ROUTE = {
    not_found: 'not_found',
}
export const DEFAULT_LOCALIZATION = {
    locale: process.env.VUE_APP_LOCALE,
    country: process.env.VUE_APP_COUNTRY,
    timezone: process.env.VUE_APP_TIMEZONE,
    currency: process.env.VUE_APP_CURRENCY,
    number_format: process.env.VUE_APP_NUMBER_FORMAT,
    first_day_of_week: 0,
    long_date_format: 0,
    short_date_format: 0,
    long_time_format: 0,
    short_time_format: 0,
    time_offset: 0,
}
export const APP_DEFAULT_META = [{
    id: 'og-title',
    property: 'og:title',
    content: APP_TITLE,
}, {
    id: 'og-description',
    property: 'og:description',
    content: APP_DESCRIPTION,
}, {
    id: 'og-url',
    property: 'og:url',
    content: APP_URL,
}, {
    id: 'og-type',
    property: 'og:type',
    content: 'website',
}, {
    id: 'og-image',
    property: 'og:image',
    content: APP_URL + '/sites/img/cover.jpg',
}, {
    id: 'og-image-alt',
    property: 'og:image:alt',
    content: 'A photo of Hân in her birthday\'s photo shoot',
}, {
    id: 'fb-app-id',
    property: 'fb:app_id',
    content: process.env.VUE_APP_FACEBOOK_APP_ID,
}, {
    id: 'twitter-card',
    property: 'twitter:card',
    content: 'summary',
}, {
    id: 'twitter-site',
    property: 'twitter:site',
    content: '@' + process.env.VUE_APP_TWITTER_USERNAME,
}, {
    id: 'twitter-creator',
    property: 'twitter:creator',
    content: '@' + process.env.VUE_APP_TWITTER_USERNAME,
}, {
    id: 'google-verification',
    name: 'google-site-verification',
    content: process.env.VUE_APP_GOOGLE_VERIFICATION,
}, {
    id: 'bing-verification',
    name: 'msvalidate.01',
    content: process.env.VUE_APP_BING_VERIFICATION,
}, {
    id: 'yandex-verification',
    name: 'yandex-verification',
    content: process.env.VUE_APP_YANDEX_VERIFICATION,
}]