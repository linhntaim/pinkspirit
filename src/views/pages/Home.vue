<template lang="pug">
    .home.no-selection
        .background
        .content
            h1.animated.fast.delay-fastest.slideInDown(@click="explorePost")
                strong pinkspirit
                i.fas(:class="{'fa-chevron-down': !postActive, 'fa-chevron-up': postActive}")
            blockquote.animated.faster.slideInDown(:class="{active: postActive}")
                p The&nbsp;
                    span.color-pink &ldquo;pinkspirit&rdquo;
                    | &nbsp;is a project by myself, inspired by&nbsp;
                    span.color-pink Lê Bảo Hân
                    | .
                p It was started in 2015, when I knew Hân for a long time - more than one year, maybe.&nbsp;
                    | Hân was studying at Hanoi University of Industrial Fine Art at that time and would soon graduate.&nbsp;
                    | She was very attractive. I saw her and felt impressed immediately by her beauty;&nbsp;
                    | especially, when she got into something I could not define, something that would do exist forever, in her timelessly amazing black and white photos.
                p She, and her inspiration, inspired me to do a lot of things.&nbsp;
                    | I quit my stable job.&nbsp;
                    | I did travelling, exploring many places and human cultures, learning to live this life, improving my own skills and spreading my own thoughts.&nbsp;
                    | My world became wider.&nbsp;
                    | And because of Hân, it even became fantastical.&nbsp;
                    | I used to be eager to discover the whole world from then on.
                p Till now, Hân was still an inspiring person to me.&nbsp;
                    | The project&nbsp;
                    span.color-pink &ldquo;pinkspirit&rdquo;
                    | &nbsp;was still under development, though some parts of it were inactive for years.
                p Just send her my adoration.
                p &mdash;
                p Here are parts of this project:
                p -&nbsp;
                    a(href="https://katniss.linhntaim.com" target="_blank") Katniss
                    | &nbsp;(also inpsired by&nbsp;
                    a(href="https://en.wikipedia.org/wiki/Katniss_Everdeen" target="_blank") Katniss Everdeen
                    | &nbsp;in&nbsp;
                    a(href="https://en.wikipedia.org/wiki/The_Hunger_Games" target="_blank")
                        em The Hunger Games
                    | )
                p - Some writings at&nbsp;
                    a(href="https://hey.linhntaim.com/tag/han/" target="_blank") hey.linhntaim.com
                p -&nbsp;
                    a(href="https://korean-t2i.linhntaim.com" target="_blank") Korean t2i
                p -&nbsp;
                    a(href="https://flappy-ball.linhntaim.com" target="_blank") Flappy ball
                p -&nbsp;
                    a(href="https://reflecting-ball.linhntaim.com" target="_blank") Reflecting ball
                p -&nbsp;
                    a(href="https://maze-runner.linhntaim.com" target="_blank") Maze runner
                p - ...
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
                postActive: false,
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
            explorePost($event) {
                $event.stopPropagation()
                this.postActive = !this.postActive
            },
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