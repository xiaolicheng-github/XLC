const path = require('path');
const { merge } = require('webpack-merge');
import baseConfig from './webpack-vue.base';

const devConfig = merge(baseConfig({
  entry: '../xlc_blog/src/index.ts',
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    path: './dist'
  },
  module: {
    rules: {
      include: '../xlc_blog/src'
    },
    generator: {
      filename: 'static/images/[name].[contenthash:8][ext]'
    }
  },
  resolve: {
    alias: {
      path: '../xlc_blog/src'
    },
    modules: [path.resolve(__dirname, '../xlc_blog/src'), 'node_modules']
  },
  plugins: {
    template: '../xlc_blog/public/index.html'
  }
}), {
  mode: 'development', // 开发模式,打包更加快速,省了代码优化步骤
  devtool: 'eval-cheap-module-source-map', // 源码调试模式
  devServer: {
    port: 3000, // 服务端口号
    compress: false, // gzip压缩,开发环境不开启,提升热更新速度
    hot: true, // 开启热更新，后面会讲react模块热替换具体配置
    historyApiFallback: true, // 解决history路由404问题
    static: {
      directory: path.join(__dirname, "../public"), //托管静态资源public文件夹
    }, 
    proxy: {
      '/api': 'http://127.0.0.1:4000'
    }
  }
});
export default devConfig;