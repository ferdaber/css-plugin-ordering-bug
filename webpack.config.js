const path = require('path')
const CssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: {
        'entry-a': path.resolve('a.js'),
        'entry-b': path.resolve('b.js'),
    },
    output: {
        path: path.resolve('build'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
    },
    plugins: [
        new CssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    CssExtractPlugin.loader,
                    {
                        loader: require.resolve('css-loader'),
                        options: { sourceMap: true },
                    },
                ],
            },
        ],
    },
    optimization: {
        namedModules: true,
        runtimeChunk: true,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'all',
                    name: 'vendor',
                    test: /shared_modules/,
                    minSize: 0,
                },
            },
        },
    },
    mode: 'development',
    devtool: 'source-map',
}
