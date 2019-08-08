## tysx-packjs
  - 介绍
    - 使用webpack打包JS库

  - 使用方式
    - `git clone https://github.com/wxfree/tysx-packjs.git`
    - `npm install`安装相关依赖

  - 命令介绍(查看package.json中的scripts)
    - `npm run dev`测试环境打包,未抽取css,未压缩js
    - `npm run prod`正式环境打包,抽取css,压缩js
    - `npm run packcss`单独打包压缩css
    - `npm run serve`测试环境运行webpack-dev-server,主要是用热更替功能,打开localhost:3000既能访问
