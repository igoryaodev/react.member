const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = (options) => {
  const { dev } = options
  let config = {
    devtool: 'eval-source-map',//由bundle.js映射到origin文件，容易在浏览器调试
    mode: dev ? 'development' : 'production',
    cache: true,
    entry: [
      'babel-polyfill',
      './src/index.js',
      // './src/another.module.js',
      'webpack-hot-middleware/client?http://localhost:8080',
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      chunkFilename: '[name].bundle.js',
      filename: '[name].bundle.[hash:10].js'
    },
    // optimization: {
    //     splitChunks: {
    //       chunks: 'all'
    //     }
    // },
    module: {
      rules: [
        {
          test: /\.js[x]?$/,
          exclude: /node_modules/,
          loader:'babel-loader'
        },
        {
          test: /\.(le|sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(jpeg|jpg|png|gif|svg)$/,
          loader: 'file-loader?name=img/[hash].[ext]'
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist'],{

      }),
      new MiniCssExtractPlugin({
        filename: dev ? 'style.css' : 'style.[hash].css',
        chunkFilename: dev ? '[id].css' : '[id].[hash].css'
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico',
        minify: true,
        inject: true
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: '127.0.0.1',
        analyzerPort: 8083,
        defaultSizes: 'gzip',
        // openAnalyzer: false,
      })

    ]
  }
  if(dev) {
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin()
    )
  }else{
    config.plugins.push(
      new UglifyjsWebpackPlugin({
        uglifyOptions: {
          ecma: 8,
          warnings: false,
          output: {
            comments: false,
            beautify: true
          }
        },
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        cache: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({})
    )

  }
  return config
}