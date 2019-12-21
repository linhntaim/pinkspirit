import {APP_DEBUG, APP_LOG_ONLY} from '../config'

export class Log {
    write(something, namespace = null) {
        if (APP_DEBUG) {
            if (APP_LOG_ONLY.length && (!namespace || APP_LOG_ONLY.indexOf(namespace) === -1)) return
            if (typeof something === 'object') {
                if (namespace) {
                    /*eslint no-console: "off" */
                    console.log(namespace + ': ', something)
                } else {
                    /*eslint no-console: "off" */
                    console.log(something)
                }
            } else {
                /*eslint no-console: "off" */
                console.log(namespace ? namespace + ': ' + something : something)
            }
        }
    }
}

export const log = new Log()
