const webpack = require('webpack')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const ROOT_PATH = path.resolve(__dirname)
const APP_PATH = path.resolve(ROOT_PATH, 'src')
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist')
const plugins = [
  new VueLoaderPlugin()
]

module.exports = (env, argv) => {
  if (argv.mode !== 'development') {
    plugins.push(new CleanWebpackPlugin())
    plugins.push(new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true
    }))
    plugins.push(new webpack.LoaderOptionsPlugin({
      minimize: true
    }))
  } else {
    plugins.push(new webpack.NamedModulesPlugin())
    plugins.push(new webpack.HotModuleReplacementPlugin())
    plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      generateStatsFile: true,
      statsOptions: { source: false }
    }))
  }

  return {
    entry: './src/index.js',
    output: {
      path: BUILD_PATH,
      filename: 'Hitalk-vue.min.js',
      library: 'Hitalk',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    externals: {
      vue: 'Vue'
    },
    resolve: {
      extensions: ['.js', '.json', '.vue', '.scss', '.css'],
      alias: {
        '@': path.resolve(__dirname, APP_PATH)
      }
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      }, {
        test: /\.vue$/,
        loader: [{
          loader: 'vue-loader'
        },
        'eslint-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
        include: APP_PATH
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['url-loader?limit=8192']
      }
      ]
    },
    devServer: {
      hot: true,
      open: true,
      port: 8088,
      inline: true,
      progress: true,
      host: 'localhost',
      publicPath: '/dist/',
      historyApiFallback: true,
      stats: 'errors-only', // 只在发生错误时输出
      overlay: { // 当有编译错误或者警告的时候显示一个全屏overlay
        errors: true,
        warnings: true
      }
    },
    devtool: 'cheap-module-source-map',
    plugins
  }
}
