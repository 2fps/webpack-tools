const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const baseWebpackConfig = require('./webpack.config.base')
const apiMocker = require('webpack-api-mocker')

const port = 8000

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'src'), // 开发服务运行时的文件根目录
    historyApiFallback: true, // spa不跳转,history模式的路由需要true
    host: 'localhost',
    port: port,
    hot: true,
    inline: true, // 实时刷新
    compress: true, // Enable gzip compression for everything served
    overlay: true, // Shows a full-screen overlay in the browser
    stats: 'errors-only', // To show only errors in your bundle
    open: true, // When open is enabled, the dev server will open the browser.
    quiet: true,
    proxy: {
      '/datarecognize': {
        'target': 'http://47.111.24.30:8082/',
        'changeOrigin': true,
        'pathRewrite': { '^/api': '' }
      }
    },
    before(app) {
      apiMocker(app, path.resolve('./mocker/index.js'))
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`You application is running here http://localhost:${ port }`],
        notes: ['Some additionnal notes to be displayed unpon successful compilation']
      },
      clearConsole: true
    })
  ]
})
