import {all} from '../middleware'

export const routes = [
    {
        path: '/error',
        meta: {
            middleware: all,
        },
        component: () => import('../../../views/master/Error'),
        children: [
            {
                path: '',
                component: () => import('../../../views/error/NotFound'),
            },
            {
                path: '404',
                name: 'not_found',
                component: () => import('../../../views/error/NotFound'),
            },
            {
                path: '*',
                component: () => import('../../../views/error/NotFound'),
            },
        ],
    },
    {
        path: '/',
        name: 'home',
        meta: {
            middleware: all,
        },
        component: () => import('../../../views/pages/Home'),
    },
    {
        path: '*',
        redirect: '/error/404',
    },
]
