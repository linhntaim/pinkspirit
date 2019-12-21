import {dateTimeHelper} from '../../utils/date_time_helper'
import {localizer} from '../../utils/localizer'
import {numberFormatHelper} from '../../utils/number_format_helper'
import {DEFAULT_LOCALIZATION} from '../../config'
import localizationCookieStore from '../../utils/cookie_store/localization_cookie_store'

const localize = (localization, action, localeCallback = null) => {
    if (action === 'all' || action === 'store' || action === 'store_with_locale') {
        localizationCookieStore.store(localization)
    }
    if (action === 'all' || action === 'store_with_locale') {
        localizer.localize(localization).then(() => {
            localeCallback && localeCallback()
        })
    }
    if (action === 'all') {
        dateTimeHelper.localize(localization)
        numberFormatHelper.localize(localization)
    }
}

export default {
    namespaced: true,
    state: {
        user: null,
    },
    getters: {
        user: state => state.user,
    },
    mutations: {
        setUser(state, {user, localeCallback}) {
            state.user = user

            localize(state.user.localization, 'all', localeCallback)
        },

        setLocale(state, {locale, callback}) {
            if (locale != state.user.localization.locale) {
                state.user.localization._ts = 0
            }
            state.user.localization.locale = locale

            localize(state.user.localization, 'store_with_locale', callback)
        },

        setLocalization(state, {localization, localeCallback}) {
            for (let key in localization) {
                if (key == 'locale' && localization.locale != state.user.localization.locale) {
                    state.user.localization._ts = 0
                }
                state.user.localization[key] = localization[key]
            }

            localize(state.user.localization, 'all', localeCallback)
        },

        unsetUser(state) {
            if (state.user && state.user.localization) {
                state.user = {
                    localization: state.user.localization,
                }
            } else {
                let storedLocalization = localizationCookieStore.retrieve()
                state.user = {
                    localization: storedLocalization ? storedLocalization : DEFAULT_LOCALIZATION,
                }
            }

            state.user.localization._from_app = true
            state.user.localization._ts = 0

            localize(state.user.localization, 'store')
        },
    },
    actions: {
        anonymous({commit}, {callback}) {
            let storedLocalization = localizationCookieStore.retrieve()
            commit('setUser', {
                user: {
                    localization: storedLocalization ? storedLocalization : DEFAULT_LOCALIZATION,
                },
                localeCallback: callback,
            })
        },

        updateLocalization({commit}, {params, doneCallback}) {
            commit('setLocalization', {
                localization: params,
                localeCallback: doneCallback,
            })
        },

        updateLocale({commit}, {locale, doneCallback}) {
            commit('setLocale', {
                locale: locale,
                callback: doneCallback,
            })
        },
    },
}
