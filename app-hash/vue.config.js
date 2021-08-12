const { name } = require('./package') // qiankun，这个 name 默认从 package.json 获取，可以自定义，只要和父应用注册时的 name 保持一致即可
module.exports = {
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',// qiankun，子应用必须支持跨域：由于 qiankun 是通过 fetch 去获取子应用的引入的静态资源的，所以必须要求这些静态资源支持跨域；本地服务直接在vue.config.js内配上跨域相关即可，上线的话，需要在服务器配置白名单。
    },
  },
  configureWebpack: {// qiankun，在一些低端机上，当qiankun无法从entry export上面拿到微应用生命周期时会尝试从window对象上获取，默认是取window[appName]，当微应用导出的library name和appName不一致时，需要手动指定
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};