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
5. webpack entry只能传js,单独打包css
6. 使用async、await如果报 regeneratorRuntime is not defined，安装babel-polyfill即可
7. 图片url-loader转码
  ```
    优点:
      base64就是一串字符串码表示的图片，在加载页面和js时一块加载出来，减少了加载图片时的http请求。加载一张图片时会发起一次http请求，http请求每次建立都会需要一定的时间，对于加载一张小图来说，下载图片所需的时间会比建立http请求的时间要短，所以对小图进行base64转码是优化http请求，保证页面加速渲染，加快页面加载速度。
    缺点：
    　　base64会增加图片本身的大小，对于小图来说，转码增加的大小导致js加载延时能远远弥补建立http请求的时长。这种取舍是划算的。可是对于大图来说，这样的取舍是不划算的。
  ```
  8. `npm i typescript ts-loader -D`并`./node_modules/.bin/tsc --init`自动创建`tsconfig.json`;在webpack配置文件中配置`.ts/tsx`的loader
