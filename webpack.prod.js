const merge = require('webpack-merge');
const commonCfg = require('./webpack.common');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const VisualizerPlugin = require('webpack-visualizer-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(
    commonCfg,
    {
        devtool: 'source-map',
        plugins: [
            // 删除未引用导出并压缩
            new UglifyJSPlugin({ sourceMap: true }),
            new webpack.HashedModuleIdsPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    // 定义NODE_ENV值
                    NODE_ENV: JSON.stringify('production')
                }
            }),
            // 将入口引入到css抽离成单独文件（默认是放在js的bundle中）
            new ExtractTextPlugin('[name].[contenthash].css'),
            // 模块可视化分析
            new VisualizerPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader'
                    })
                }
            ]
        }
    }
);
