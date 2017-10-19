const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const PATH = {
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist')
};

// 通用配置
module.exports = {
    entry: {
        main: `${PATH.src}/index.js`,
        // tsmain: `${PATH.src}/main.ts`,
        vuemain: `${PATH.src}/vuemain.ts`,
        // 限定lodash抽取到vendor文件中
        vendor: ['lodash', 'vue']
    },
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: PATH.dist
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${PATH.src}/index.html`
        }),
        // 构建前清理构建目录
        new CleanWebpackPlugin(['dist']),
        // 抽离公用代码到单独boundle中。注意下面两个插件到顺序
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: [
                    'file-loader',
                    'image-webpack-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: 'vue-loader',
                include: /component/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
};
