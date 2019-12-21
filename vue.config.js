const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    productionSourceMap: false,
    configureWebpack: {
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        output: {
                            comments: false,
                        },
                    },
                }),
            ],
        },
    },
}
