const fs = require('fs')

const pathTrim = p => {
    return p.replace(new RegExp('^[/]|[/]$', 'g'), '')
}
const lastMod = lastModified => {
    return lastModified.date + 'T' + lastModified.time + 'Z'
}
const lastModifiedNow = (() => {
    const now = new Date()
    const r = v => v < 10 ? '0' + v : v
    return {
        date: now.getUTCFullYear() + '-' + r(now.getUTCMonth() + 1) + '-' + r(now.getUTCDate()),
        time: r(now.getUTCHours()) + ':' + r(now.getUTCMinutes()) + ':' + r(now.getUTCSeconds()),
    }
})()
const siteMapGenerator = process.env.VUE_APP_SITEMAP_GENERATOR || (process.env.VUE_APP_NAME + '-' + process.env.VUE_APP_VERSION)
const siteMapUrlPath = process.env.VUE_APP_SITEMAP_URL_PATH
const siteMapUrlXslIndex = siteMapUrlPath + '/sitemap-index.xsl'
const siteMapUrlXsl = siteMapUrlPath + '/sitemap.xsl'

class UrlSet {
    constructor(name) {
        this.name = name + '.xml'
        this.content = ''
    }

    getName() {
        return this.name
    }

    insert(location, lastModified = null) {
        const locTag = '<loc>' + location + '</loc>'
        const lastModTag = '<lastmod>' + lastMod(lastModified ? lastModified : lastModifiedNow) + '</lastmod>'
        this.content += '<url>' + locTag + lastModTag + '</url>'
    }

    getOutput() {
        return '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<!--generator=\'' + siteMapGenerator + '\'-->\n' +
            '<?xml-stylesheet type="text/xsl" href="' + siteMapUrlXsl + '"?>\n' +
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' +
            'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
            'xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">' + this.content + '</urlset>'
    }
}

class SiteMapIndex {
    constructor(name = 'sitemap') {
        this.name = name + '.xml'
        this.content = ''
        this.urlSet = null
        this.counter = 0
    }

    createUrlSet(name = null) {
        this.endUrlSet()

        ++this.counter
        this.urlSet = new UrlSet(name ? 'sitemap-' + name : 'sitemap-' + this.counter)
    }

    end() {
        this.endUrlSet()
    }

    endUrlSet() {
        if (this.urlSet) {
            const locTag = '<loc>' + siteMapUrlPath + '/' + this.urlSet.getName() + '</loc>'
            const lastModTag = '<lastmod>' + lastMod(lastModifiedNow) + '</lastmod>'
            this.content += '<sitemap>' + locTag + lastModTag + '</sitemap>'
            this.urlSet = null
        }
    }

    insertUrl(location, lastModified = null) {
        if (this.urlSet) {
            this.urlSet.insert(location, lastModified)
        }
    }

    getName() {
        return this.name
    }

    getUrlSet() {
        return this.urlSet
    }

    getOutput() {
        return '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<!--generator=\'' + siteMapGenerator + '\'-->\n' +
            '<?xml-stylesheet type="text/xsl" href="' + siteMapUrlXslIndex + '"?>\n' +
            '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + this.content + '</sitemapindex>'
    }
}

exports.createSiteMap = (inRoutesDefFile, outSiteMapDir) => {
    console.log('Creating sitemap from definition...')

    const {routes} = require(inRoutesDefFile)

    if (!fs.existsSync(outSiteMapDir)) {
        fs.mkdirSync(outSiteMapDir, {
            recursive: true,
        })
    }

    const siteMapIndex = new SiteMapIndex()
    const traverseRoute = (route, path = '') => {
        if ((route.hasOwnProperty('sitemap') && route.sitemap === false)
            || !route.hasOwnProperty('path')
            || typeof route.path !== 'string'
            || route.path === '*') return

        const routePath = pathTrim(route.path)
        path = routePath && path ? path + '/' + routePath : (path ? path : routePath)

        if (route.hasOwnProperty('children')) {
            route.children.forEach(r => traverseRoute(r, path))
            return
        }
        
        siteMapIndex.insertUrl(path ? siteMapUrlPath + '/' + path : siteMapUrlPath)
    }
    for (let subRouteName in routes) {
        const subRoute = routes[subRouteName]
        siteMapIndex.createUrlSet(subRoute.name)
        subRoute.routes.forEach(route => traverseRoute(route))
        const urlSet = siteMapIndex.getUrlSet()
        if (urlSet) {
            /* Write sitemap url set */
            fs.writeFile(outSiteMapDir + '/' + urlSet.getName(), urlSet.getOutput(), function (err) {
                if (err) {
                    console.log(err)
                }
            })
        }
    }

    /* Write sitemap index */
    siteMapIndex.end()
    fs.writeFile(outSiteMapDir + '/' + siteMapIndex.getName(), siteMapIndex.getOutput(), function (err) {
        if (err) {
            console.log(err)
        }
    })

    console.log('Sitemap created!\n')
}