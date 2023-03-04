const cssRegex = /\.css$/;
const sassRegex = /\.(scss|sass)$/;
const lessRegex = /\.less$/;
const stylRegex = /\.styl$/;

const styleLoadersArray = [
  "style-loader",
  {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: "[path][name]__[local]--[hash:5]",
      },
    },
  },
];

const baseConfig = {
  // ...
  module: {
    rules: [
      // ...
       {
        test: cssRegex, //匹配 css 文件
        use: styleLoadersArray,
      },
      {
        test: lessRegex,
        use: [
          ...styleLoadersArray,
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                // 如果要在less中写类型js的语法，需要加这一个配置
                javascriptEnabled: true
              },
            },
          },
        ],
      },
      {
        test: sassRegex,
        use: [
          ...styleLoadersArray,
          "sass-loader",
        ],
      },
      {
        test: stylRegex,
        use: [
          ...styleLoadersArray,
          "stylus-loader",
        ],
      },
    ],
  },
  // ...
};

export default baseConfig;