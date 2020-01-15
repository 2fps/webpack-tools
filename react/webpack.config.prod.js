const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

const plugins = [
    new CleanWebpackPlugin()
]

if (process.env.ZIP) {
    plugins.push(
        new FileManagerPlugin({
            onEnd: {
                delete: [
                    './web.zip',
                ],
                archive: [
                    {
                        source: './dist',
                        destination: './web.zip'
                    },
                ]
            }
        })
    )
}

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    devtool: 'source-map',
    plugins
});
