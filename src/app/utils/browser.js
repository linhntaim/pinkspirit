import {detect} from 'detect-browser'

class Browser {
    constructor() {
        this.browser = detect()
    }

    getName() {
        return this.browser ? this.browser.name : null
    }

    getVersion() {
        return this.browser ? this.browser.version : null
    }

    matched(browserName, strict = true) {
        const name = this.getName()
        return name
            && (strict ?
                browserName.toLowerCase() === name.toLowerCase()
                : name.toLowerCase().indexOf(browserName.toLowerCase()) !== -1)
    }
}

export const browser = new Browser()