const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
dotenvExpand(dotenv.config())

const fs = require('fs')
const {createRoutes} = require('./app.routes.module')
const {createSiteMap} = require('./app.sitemap.module')

const inRoutesDefFile = './src/app/routing/router/routes.def.js'
const outRoutesFile = './src/app/routing/router/routes.js'
const outSiteMapDir = './public'

if (!fs.existsSync(inRoutesDefFile)) {
    console.log('Route Definition does not exist!')
    return
}

const args = process.argv.slice(2)

if (args.length) {
    let processed = false
    args.some(arg => {
        if (arg === '--sitemap') {
            processed = true
            createSiteMap(inRoutesDefFile, outSiteMapDir)
            return true
        }
        return false
    })
    if (processed) return
}

createRoutes(inRoutesDefFile, outRoutesFile)