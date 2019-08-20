const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 清理打包完成后的dist文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const pkg = require('../package.json')
const libraryName = pkg.name
const config = {
  entry: path.resolve(__dirname, '../src/entry/index.js'),
  output: {
    filename: `${libraryName}.[hash:8].js`,
    path: path.resolve(__dirname, '../dist')
    // publicPath: '../dist/'
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
        // exclude: /node_modules/
      },
      {
        test: /\.(sa|c|sc)ss$/,
        use: [
          // MiniCssExtractPlugin.loader,没有hmr热更替功能
          // 还未抽取css并合并，所以sourceMap设置与否都没啥用
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        loader: 'url-loader',
        options: {
          outputPath: 'images', // 在dist下创建images
          // publicPath: './images',
          name: '[hash].[ext]',
          limit: 8192
        }
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('development-版权所有,翻版必究'),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: './src/template.html',
      minify: {
        collapseWhitespace: false, // 去除空格
        removeComments: true //去除注释
      }
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    alias: {
      '@/image': '../src/image'
    },
    // enforceExtension: false, // import '../xxx.js'必须带上后缀,写了true不加后缀名，死翘翘
    extensions: ['.js', '.css', '.scss', '.json'] // 依次匹配后缀 import '../style'
  }
}

module.exports = config
