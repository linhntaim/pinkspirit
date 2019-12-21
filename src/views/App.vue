<template lang="pug">
    #app
        router-view
        page-loader
</template>

<script>
    import PageLoader from './components/PageLoader'
    import {APP_DEFAULT_META} from '../app/config'

    export default {
        name: 'App',
        components: {PageLoader},
        head: {
            meta: APP_DEFAULT_META.map(meta => {
                meta.undo = false
                return meta
            }),
        },
    }
</script>
