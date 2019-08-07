1. npm install
2. 各种loaders的作用
  2.1 css-loader：加载.css文件;style-loader：将css-loader加载的css用style注入到页面中;sass-loader依赖于node-sass,用来解析.scss;postcss-loader用来自动添加浏览器前缀-webkit,-ms,autoprefixer:https://github.com/browserslist/browserslist#queries;mini-css-extract-plugin:用于提取js中的css,只用在正式环境打包、因为这玩意没有hmr功能;loader的使用顺序是从下往上从右往左
  2.2 babel-loader: 编译es6、es7代码转化成es5，向下兼容
3. output.path、output.publicPath、devServer.publicPath
  output.path:本地资源输出的路径，输出到dist下
  output.publicPath:补全index.html文件里引用资源的前缀;测试环境不需要配置,默认为'/';正式环境可以配置资源路径的域名
  output.publicPath = process.env.NODE_ENV === 'development' ? '/': 'http://cdn.xxx.com'
  devServer.publicPath:同上，如果不设置默认读取output.publicPath
4. .eslintrc.js parseOptions.ecmaVersion = 2018,6的话不支持对象spread/rest
