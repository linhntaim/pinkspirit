<template lang="pug">
    .home.no-selection
        .background
        .content
            h1.animated.fast.delay-fastest.slideInDown
                a(@click="$event.stopPropagation()" :href="appUrl")
                    strong pinkspirit
            .project(:class="{active: projectCurrentIndex === 0}")
                .band.animated.faster.slideInLeft
                h2.animated.delay-fast.fadeInUpSmall
                    a(@click="$event.stopPropagation()" href="https://katniss.linhntaim.com" target="_blank") Katniss
                    span.arrow-right
                .description.animated.delay-1s-fast.fadeInDownMedium A Laravel-based Framework with extended/integrated modules/flows for Web Artisans to build sites more and more quickly.
            .project(:class="{active: projectCurrentIndex === 1}")
                .band.animated.faster.slideInLeft
                h2.animated.delay-fast.fadeInUpSmall
                    a(@click="$event.stopPropagation()" href="https://korean-t2i.linhntaim.com" target="_blank") Korean T2i
                    span.arrow-right
                .description.animated.delay-1s-fast.fadeInDownMedium Convert Korean texts into images.
            .project(:class="{active: projectCurrentIndex === 2}")
                .band.animated.faster.slideInLeft
                h2.animated.delay-fast.fadeInUpSmall
                    a(@click="$event.stopPropagation()" href="https://flappy-ball.linhntaim.com" target="_blank") Flappy Ball
                    span.arrow-right
                .description.animated.delay-1s-fast.fadeInDownMedium Balls are pulled down by gravity, and when any of them reaches the ground, the game is over. Play to get your highest score.
            .project(:class="{active: projectCurrentIndex === 3}")
                .band.animated.faster.slideInLeft
                h2.animated.delay-fast.fadeInUpSmall
                    a(@click="$event.stopPropagation()" href="https://reflecting-ball.linhntaim.com" target="_blank") Reflecting Ball
                    span.arrow-right
                .description.animated.delay-1s-fast.fadeInDownMedium Balls are falling to ground due to gravity. They are also jumping their own dance. Click or tap on screen to push the nearest ball to higher place.
            .project(:class="{active: projectCurrentIndex === 4}")
                .band.animated.faster.slideInLeft
                h2.animated.delay-fast.fadeInUpSmall
                    a(@click="$event.stopPropagation()" href="https://maze-runner.linhntaim.com" target="_blank") Maze Runner
                    span.arrow-right
                .description.animated.delay-1s-fast.fadeInDownMedium Create a maze and all you must do is to help the red dot finding out the way to escape.
</template>

<script>
    import {APP_URL} from '../../app/config'
    import {$ui} from '../../app/utils/ui'
    import {timeoutCaller} from '../../app/utils/timeout_caller'

    export default {
        name: 'Home',
        head: {
            meta: [],
        },
        data() {
            return {
                appUrl: APP_URL,
                projectCurrentIndex: 0,
                projectLength: 5,
                projectNextHandler: null,
                projectNextTimeout: [13000, 7000, 14000, 15000, 12000],
            }
        },
        computed: {},
        mounted() {
            const onDocumentClicked = e => {
                this.stopAutoNext()
                if (e.offsetX >= window.innerWidth / 2) {
                    this.nextProject()
                } else {
                    this.prevProject()
                }
                this.autoNext()
            }
            $ui(document).off('click', onDocumentClicked).on('click', onDocumentClicked)
            this.autoNext()
        },
        methods: {
            prevProject() {
                if (this.projectCurrentIndex > 0) {
                    --this.projectCurrentIndex
                } else if (this.projectCurrentIndex === 0) {
                    this.projectCurrentIndex = this.projectLength - 1
                }
            },
            nextProject() {
                if (this.projectCurrentIndex < this.projectLength - 1) {
                    ++this.projectCurrentIndex
                } else if (this.projectCurrentIndex === this.projectLength - 1) {
                    this.projectCurrentIndex = 0
                }
            },
            stopAutoNext() {
                if (this.projectNextHandler) {
                    timeoutCaller.clear(this.projectNextHandler)
                }
            },
            autoNext() {
                this.projectNextHandler = timeoutCaller.register(() => {
                    this.nextProject()

                    this.autoNext()
                }, this.projectNextTimeout[this.projectCurrentIndex])
            },
        },
    }
</script>