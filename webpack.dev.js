const merge = require('webpack-merge');
const webpack = require('webpack');
const commonCfg = require('./webpack.common');

module.exports = merge(
    commonCfg,
    {
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './dist',
            hot: true
        },
        plugins: [
            // 模块热替换
            new webpack.HotModuleReplacementPlugin(),
            // 更新组件时在控制台输出组件的路径而不是数字ID
            new webpack.NamedModulesPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        }
    }
);
