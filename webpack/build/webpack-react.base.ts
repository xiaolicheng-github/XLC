const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'prod'; // 是否是开发模式
const styleLoaderConfig = () => isProd ? MiniCssExtractPlugin.loader : 'style-loader';

console.log('NODE_ENV', process.env.NODE_ENV)
console.log('BASE_ENV', process.env.BASE_ENV)

const webpackConfig = (options: any) => ({
  // 打包入口文件
  entry: path.join(__dirname, options?.entry || '../src/index.tsx'),
  // 打包文件出口
  output: {
    // filename: "[name].[chunkhash:8][ext] [ext] 格式是webpack提供的占位符, :8是生成hash的长度。
    filename: options?.output?.filename || 'static/js/[name].[chunkhash:8].js', // 每个输出js的名称
    path: path.join(__dirname,  options?.output?.path || '../dist'), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: '/' // 打包后文件的公共前缀路径
  },
  // 打包规则
  module : {
    rules: [
      {
        include: [path.resolve(__dirname, options?.module?.rules?.include || '../src')], // 只对项目src文件的ts,tsx进行loader解析
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        use: ['babel-loader', 'thread-loader'] // 此配置移至babel.config.js
      },
      {
        test: /\.css$/, //匹配所有 css文件
        include: [path.resolve(__dirname,  '../')],
        use: [
          styleLoaderConfig(),
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/, //匹配所有 scss文件
        include: [path.resolve(__dirname, options?.module?.rules?.include || '../src')],
        use: [
          styleLoaderConfig(),
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/, //匹配所有less文件
        include: [path.resolve(__dirname, options?.module?.rules?.include || '../src')],
        use: [
          styleLoaderConfig(),
          'css-loader',
          'less-loader',
          'postcss-loader'
        ]
      },
      {
        test:/.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{ 
          filename: options?.module?.generator?.filename || 'static/images/[name].[contenthash:8][ext]' // 文件输出目录和命名
        },
      },
      {
        test:/.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{ 
          filename: options?.module?.generator?.filename || 'static/images/[name].[contenthash:8][ext]' // 文件输出目录和命名
        },
      },
      {
        test:/.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{ 
          filename: options?.module?.generator?.filename || 'static/images/[name].[contenthash:8][ext]' // 文件输出目录和命名
        },
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'], // 提升构建速度
    alias: { // 设置别名，引入文件时可用@表示../src
      '@': path.join(__dirname, options?.resolve?.alias?.path || '../src')
    },
    modules: options?.resolve?.modules || [], // 查找第三方模块只在本项目的node_modules中查找
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,  options?.plugins?.template || '../public/index.html'), // 模板取定义root节点的模板
      inject: true, // 自动注入静态资源
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV) // 配置环境变量(判断当前环境)
    })
  ],
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
});
export default webpackConfig;