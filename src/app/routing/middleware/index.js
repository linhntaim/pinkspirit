import commonMiddleware from './modules/common'
import localeMiddleware from './modules/locale'

export const common = {
    before: [
        commonMiddleware,
        localeMiddleware,
    ],
    after: [
        commonMiddleware,
    ],
}

export const all = {
    before: [
        commonMiddleware,
        localeMiddleware,
    ],
    after: [
        commonMiddleware,
    ],
}
