1. npm install
2. 各种loaders的作用
  2.1 css-loader：加载.css文件;style-loader：将css-loader加载的css用style注入到页面中;sass-loader依赖于node-sass,用来解析.scss;postcss-loader用来自动添加浏览器前缀-webkit,-ms,autoprefixer:https://github.com/browserslist/browserslist#queries;mini-css-extract-plugin:用于提取js中的css,只用在正式环境打包、因为这玩意没有hmr功能;loader的使用顺序是从下往上从右往左
  2.2 babel-loader: 编译es6、es7代码转化成es5，向下兼容
