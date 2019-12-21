const fs = require('fs')
const path = require('path')

/** Create routes **/

const stringOrRaw = value => {
    return typeof value === 'object' ? value.raw : '\'' + value + '\''
}

class RoutesContent {
    constructor() {
        this.content = ''
    }

    insertImport(i) {
        this.content += 'import ' + stringOrRaw(i.import) + ' from ' + stringOrRaw(i.from) + '\n'
        return this
    }

    insertBlank() {
        this.content += '\n'
        return this
    }

    insertLine(text, tabs = 0) {
        this.content += ' '.repeat(tabs * 4) + text + '\n'
    }

    output() {
        return this.content
    }
}

exports.createRoutes = (inRoutesDefFile, outRoutesFile) => {
    console.log('Creating routes from definition...')

    const {imports, routes} = require(inRoutesDefFile)

    const routesContent = new RoutesContent()
    imports.forEach(i => routesContent.insertImport(i))
    const traverseRoute = (route, tabs = 1) => {
        routesContent.insertLine('{', tabs)
        if (route.hasOwnProperty('path')) {
            routesContent.insertLine('path: ' + stringOrRaw(route.path) + ',', tabs + 1)
        }
        if (route.hasOwnProperty('name')) {
            routesContent.insertLine('name: ' + stringOrRaw(route.name) + ',', tabs + 1)
        }
        if (route.hasOwnProperty('redirect')) {
            routesContent.insertLine('redirect: ' + stringOrRaw(route.redirect) + ',', tabs + 1)
        }
        if (route.hasOwnProperty('meta')) {
            const meta = route.meta
            routesContent.insertLine('meta: {', tabs + 1)
            for (let k in meta) {
                routesContent.insertLine(k + ': ' + stringOrRaw(meta[k]) + ',', tabs + 2)
            }
            routesContent.insertLine('},', tabs + 1)

        }
        if (route.hasOwnProperty('component')) {
            routesContent.insertLine('component: ' + stringOrRaw(route.component) + ',', tabs + 1)
        }
        if (route.hasOwnProperty('children')) {
            routesContent.insertLine('children: [', tabs + 1)
            route.children.forEach(r => traverseRoute(r, tabs + 2))
            routesContent.insertLine('],', tabs + 1)
        }
        routesContent.insertLine('},', tabs)
    }
    for (let subRouteName in routes) {
        routesContent.insertBlank()
        routesContent.insertLine('export const ' + subRouteName + ' = [')
        routes[subRouteName].routes.forEach(route => traverseRoute(route, 1))
        routesContent.insertLine(']')
    }

    /* Write routes.js */
    const outRoutesDir = path.dirname(outRoutesFile)
    if (!fs.existsSync(outRoutesDir)) {
        fs.mkdirSync(outRoutesDir, {
            recursive: true,
        })
    }
    fs.writeFile(outRoutesFile, routesContent.output(), function (err) {
        if (err) {
            console.log(err)
        }
    })

    console.log('Routes created!\n')
}