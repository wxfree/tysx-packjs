const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pkg = require('../package.json')
const libraryName = pkg.name
const config = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    filename: libraryName + '.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/' // 打包生成的index.html文件里面引用资源的前缀，正式环境就就用http://xxx.com+ publicPath,测试环境不需要设置默认为'/'
  },
  mode: 'development',
  devServer: {
    host: '0.0.0.0',
    port: '3000',
    hot: true,
    inline: true,
    overlay: true,
    proxy: {
      'static/*': {
        target: 'http://localhost:8080/static',
        secure: false,
        changeOrigin: true
      },
      'api/*': {
        target: 'http://localhost:8080',
        secure: false,
        changeOrigin: true
      }
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   exclude: /node_modules/
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/env']
        }
      },
      {
        test: /\.(sa|c|sc)ss$/,
        use: [
          // MiniCssExtractPlugin.loader,没有hmr热更替功能
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
          publicPath: './images',
          name: '[hash].[ext]',
          limit: 8192
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('development-版权所有,翻版必究'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: './src/template.html',
      minify: {
        collapseWhitespace: false, // 去除空格
        removeComments: true //去除注释
      }
    })
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
