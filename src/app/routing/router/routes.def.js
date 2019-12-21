exports.imports = [
    {
        import: {raw: '{all}'},
        from: '../middleware',
    },
]

exports.routes = {
    routes: {
        name: 'home',
        routes: [
            {
                path: '/error',
                component: {raw: '() => import(\'../../../views/master/Error\')'},
                meta: {
                    middleware: {raw: 'all'},
                },
                children: [
                    {
                        path: '',
                        component: {raw: '() => import(\'../../../views/error/NotFound\')'},
                    },
                    {
                        path: '404',
                        name: 'not_found',
                        component: {raw: '() => import(\'../../../views/error/NotFound\')'},
                    },
                    {
                        path: '*',
                        component: {raw: '() => import(\'../../../views/error/NotFound\')'},
                    },
                ],
            },
            {
                path: '/',
                name: 'home',
                meta: {
                    middleware: {raw: 'all'},
                },
                component: {raw: '() => import(\'../../../views/pages/Home\')'},
            },
            {
                path: '*',
                redirect: '/error/404',
            },
        ],
    },
}
