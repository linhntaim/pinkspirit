import {dateTimeHelper} from './date_time_helper'
import {log} from './log'
import {session} from './session'
import localeReady from '../../app/locales'
import router from '../routing/router'
import store from '../store'
import AdvancedRouter from '../../plugins/advanced_router'
import App from '../../views/App'
import EventBus from '../../plugins/event_bus'
import Middleware from '../../plugins/middleware'
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import VueHead from 'vue-head'

export class Application {
    constructor() {
        this.instance = null
    }

    get() {
        return new Promise((resolve, reject) => {
            let tried = 0, instance = () => {
                if (this.instance) {
                    resolve(this.instance)
                    return
                }

                if (++tried > 100) {
                    reject()
                    return
                }

                setTimeout(() => {
                    instance()
                }, 200)
            }

            instance()
        })
    }

    useDefault() {
        Vue.use(VueCookie)
        Vue.use(EventBus)
    }

    use() {
        this.useDefault()

        Vue.use(VueHead)
        Vue.use(AdvancedRouter, {router, session})
        Vue.use(Middleware, {
            router,
            store,
            beforeEnable: () => {
                return !session.skipping()
            },
            afterEnable: () => {
                return !session.skipping()
            },
            beforeRouting: () => {
                log.write('start', 'routing')
            },
            afterRouting: () => {
                if (session.skipping()) session.abortSkipping()
                log.write('end', 'routing')
            },
        })
    }

    create() {
        log.write('creating', 'app')

        this.use()

        localeReady(i18n => {
            dateTimeHelper.withCompiler((format, bags) => {
                return i18n.t(format, bags)
            })

            this.instance = new Vue({
                i18n,
                router,
                store,
                render: h => h(App),
            }).$mount('#app')

            log.write('created', 'app')
        })
    }
}

export const app = new Application()
