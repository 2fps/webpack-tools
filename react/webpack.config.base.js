const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
    module: {
        rules: [
            /* {
                test: /\.(js|jsx|ts|tsx)$/,
                enforce: 'pre',
                use: {
                    loader: 'eslint-loader',
                    options: {
                        emitWarning: true,
                        // emitError: true,
                        cache: true,
                        formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
                    }
                },
                exclude: /node_modules/
            }, */ {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader'
                }],
            }, {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader'
                }],
            }, {
              test: /\.(png|jpeg|jpg|gif|svg)$/,
              loader: 'url-loader',
              options: {
                  limit: 8192,
                  name: path.posix.join('static', 'img/[name].[hash:7].[ext]')
               }
            }, { // 字体图标
                test: /\.(eot|woff|woff2|ttf)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                    }
                }
            }, {
                test: /\.css$/i,
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
                        plugins:[
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
            template: path.resolve(__dirname, 'src', 'index.html'),//模板
            filename: 'index.html',
            inject: true, //允许插件修改哪些内容，包括head与body
            hash: true, //是否添加hash值
            minify: { //压缩HTML文件
                removeComments: true,//移除HTML中的注释
                collapseWhitespace: true //删除空白符与换行符
            },
            chunksSortMode: 'none' //如果使用webpack4将该配置项设置为'none'
        }),
    ]
};

