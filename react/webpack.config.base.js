const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HappyPack = require('happypack')
const os = require('os')

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    chunkFilename: 'js/[name].[hash:7].js',
    filename: 'js/[name].[hash:7].js',
  },
  resolve: {
    // 设置别名
    alias: {
      '@': path.resolve('src')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: true
  },
  stats: {
    assets: false,
    builtAt: false,
    modules: false,
    entrypoints: false
  },
  module: {
    // noParse: function(content) {
    //   return /react/.test(content)
    // },
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            emitWarning: true,
            // emitError: true,
            cache: true,
            formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
          }
        }
      }, {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: 'happypack/loader?id=babel',
        // use: [{
        //     loader: 'babel-loader'
        // }],
      }, /*  {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [{
              loader: 'babel-loader'
          }],
      }, */ {
        test: /\.(png|jpeg|jpg|gif|svg)$/,
        loader: 'url-loader',
        include: [path.resolve('src')],
        options: {
          limit: 8192,
          name: path.posix.join('static', 'img/[name].[hash:7].[ext]')
        }
      }, { // 字体图标
        test: /\.(eot|woff|woff2|ttf)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
          }
        }
      }, {
        test: /\.css$/i,
        use: [
          // {loader: 'style-loader'},
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader',
            options: {
              plugins:[
                require('autoprefixer')
              ]
            }
          }]
      }, {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')
              ]
            }
          }, {
            loader: 'less-loader'
          }]
      }, {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader',
            options: {
              plugins:[
                require('autoprefixer')
              ]
            }
          }, {
            loader: 'sass-loader'
          }]
      }
    ]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin()
    // new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:7].css',
      ignoreOrder: true
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),//模板
      filename: 'index.html',
      inject: true, // 允许插件修改哪些内容，包括head与body
      hash: true, // 是否添加hash值
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true // 删除空白符与换行符
      },
      chunksSortMode: 'none' // 如果使用webpack4将该配置项设置为'none'
    }),
    new HappyPack({ // 基础参数设置
      id: 'babel', // 上面loader?后面指定的id
      loaders: ['babel-loader?cacheDirectory'], // 实际匹配处理的loader
      threadPool: happyThreadPool,
      // cache: true // 已被弃用
      verbose: true
    })
    // new webpack.DllReferencePlugin({
    //     manifest: require('./dist/react.manifest.json')
    // })
  ]
}

