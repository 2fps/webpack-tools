const merge = require('webpack-merge')
// const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.config.base')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')
// const TerserPlugin = require('terser-webpack-plugin')

const plugins = [
  new CleanWebpackPlugin()
]

if (process.env.ZIP) {
  plugins.push(
    new FileManagerPlugin({
      onEnd: {
        // delete: [
        //   './web.zip'
        // ],
        archive: [
          {
            source: './dist',
            destination: './dist/web.zip'
          }
        ]
      }
    })
  )
}

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  // optimization: {
  //     minimizer: [
  //         new UglifyJSPlugin({
  //             uglifyOptions: {
  //                 compress: {
  //                     drop_console: true,
  //                 }
  //             }
  //         })
  //     ]
  // },
  // optimization: {
  //     minimizer: [
  //         new TerserPlugin({
  //             minify: (file, sourceMap) => {
  //                 const uglifyJsOptions = {
  //                     /* your `uglify-js` package options */
  //                     compress: {
  //                         drop_console: true
  //                     }
  //                 }
  //                 if (sourceMap) {
  //                     uglifyJsOptions.sourceMap = {
  //                         content: sourceMap,
  //                     }
  //                 }
  //                 return require('uglify-js').minify(file, uglifyJsOptions)
  //             },
  //         }),
  //     ],
  // },
  devtool: 'source-map',
  plugins
})
