const path = require('path');
const { merge } = require('webpack-merge');
import baseConfig from './webpack-react.base';
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const devConfig = merge(baseConfig({
  entry: '../xlc_manage/src/index.tsx',
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    path: './dist'
  },
  module: {
    rules: {
      include: '../xlc_manage/src'
    },
    generator: {
      filename: 'static/images/[name].[contenthash:8][ext]'
    }
  },
  resolve: {
    alias: {
      path: '../xlc_manage/src'
    },
    modules: [path.resolve(__dirname, '../xlc_manage/src'), 'node_modules']
  },
  plugins: {
    template: '../xlc_manage/public/index.html'
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
    proxy: [
      {
        context: ['/api', '/email'],
        target: 'http://127.0.0.1:3000',
      },
    ]
  },
  plugins: [
    new ReactRefreshWebpackPlugin(), // 添加热更新插件
  ]
});
export default devConfig;