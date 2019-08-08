const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const pkg = require('../package.json')
const libraryName = pkg.name
const config = {
  entry: path.resolve(__dirname, '../src/entry/index.js'),
  output: {
    filename: `${libraryName}.[hash:8].js`,
    path: path.resolve(__dirname, '../dist'),
    library: libraryName,
    libraryTarget: 'umd'
  },
  mode: 'production',
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
        // options: {
        //   presets: ['@babel/env']
        // }
      },
      {
        test: /\.(sa|c|sc)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false
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
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('production-版权所有,翻版必究'),
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: './src/template.html',
      minify: {
        collapseWhitespace: false, // 去除空格
        removeComments: true //去除注释
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.[hash:8].css'
    })
  ],
  resolve: {
    alias: {
      '@': '../src'
    },
    // enforceExtension: false, // import '../xxx.js'必须带上后缀,写了true不加后缀名，死翘翘
    extensions: ['.js', '.css', '.scss', '.json'] // 依次匹配后缀 import '../style'
  },
  optimization: {
    minimizer: [
      new UglifyjsWebpackPlugin({
        uglifyOptions: {
          compress: true,
          parallel: true
        }
      }),
      new OptimizeCSSAssetsWebpackPlugin()
    ]
  }
}

module.exports = config
