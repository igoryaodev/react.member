
## 项目结构 
```
webpack.demo 
  --| public 
    --| index.html 
  --| src 
    --| index.js 
    --| index.less 
    --| App.js 
    --| App.less 
  --| .babelrc 
  --| package.json 
  --| server.js 
  --| webpack.common.js 
  --| webpack.dev.js 
  --| webpack.production.js 
  ```

### 启动项目 
  cnpm i 
  npm run start 

### 生产环境 
  npm run build 

### 测试环境 
  start/dev npm run dev //需要全局安装 nodemon |sudo cnpm i nodemon -g 

### 项目源码 


#### index.html
```
/* 
* 
@index.html 
*/ 
....
  <div id="app"></div>
.... 
```

#### index.js 

```
/* 
*@index.js 
*/ 
import React from 'react'
import{ render } from 'react-dom' 
import App from './App' 
import './index.less' 
render(<App>, document.getElementById('root')) 
```

#### App.js
```
/* 
* @App.js
 */ 
 import React, { Component } from 'react' 
 import './App.less' export default 
 class App extends Component { 

  constructor(props) { 
   super(props) 
  } 

  componentDidMount(){
   console.log('componentDidMount') 
  } 

  render() { 
    return (
      <div>
       webpack4 demo
      </div>
    ) 
  } 
} 
```
#### index.less  App.less
```
/* 
* @index.less 
* @App.less 
*/ 
...... 
...... 
```


#### server.js
```
/*
* @server.js
*/


const express = require('express')
const proxy = require('proxy-middleware')
const url = require('url')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const WebpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.dev')
const compiler = webpack(config)
const app = express()

let server = new WebpackDevServer(compiler, {
  quiet: true, 
  contentBase: './dist',
  publicPath: '/',
  noInfo: true,
  hot: true,
  stats: {
    color: true
  },
  lazy: false,
  watchOptions: {
      aggregateTimeout: 300,
      poll: true
  },
}).listen(8081)

app.use(WebpackHotMiddleware(compiler, {
  log: false,
  hot: true,
  heartbeat: 2000
}))
app.use('/', proxy(url.parse('http://127.0.0.1:8081')))


app.listen(8080, () => { 
  console.log('listen on 8080')
})
```

#### webpack.common.js

```
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = (options) => {
  const { dev } = options
  let config = {
    devtool: 'eval-source-map',//由bundle.js映射到origin文件，容易在浏览器调试
    mode: dev ? 'development' : 'production',
    cache: true,
    entry: [
      'babel-polyfill',
      './src/index.js',
      'webpack-hot-middleware/client?http://localhost:8080',
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].bundle.[hash:10].js'
    },
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
      })

    ]
  }
  if(dev) {
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin()
    )
  }else{
    config.optimization = {
      minimizer: [
        new UglifyjsWebpackPlugin({
          uglifyOptions: {
            ecma: 8,
            warnings: false,
            output: {
              comments: false,
              beautify: false
            }
          },
          test: /\.js[x]?$/,
          exclude: /node_modules/,
          cache: true,
          sourceMap: false
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    }
  }
  return config
}
```

#### webpack.dev.js
```
module.exports = require('./webpack.common')({dev: true})
```

#### webpack.production.js
```
module.exports = require('./webpack.common')({dev: false})
```

#### .babelrc
```
{
  "presets": [
    ["es2015", {"loose":true}],
    "react",
    "stage-0"
  ],
}
```

#### package.json

```
{
  "name": "webpack.demo",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.4.1",
    "react-dom": "^16.4.1"
  },
  "scripts": {
    "start:dev": "webpack-dev-server",
    "dev": "webpack --config webpack.dev.js --mode development && nodemon server",
    "build": "webpack --config webpack.production.js --mode production"
  },
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-polyfill": "^6.26.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-es2015-loose": "^8.0.0",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "clean-webpack-plugin": "^0.1.19",
    "css-loader": "^1.0.0",
    "express": "^4.16.3",
    "file-loader": "^1.1.11",
    "html-webpack-plugin": "^3.2.0",
    "mini-css-extract-plugin": "^0.4.1",
    "node-sass": "^4.9.2",
    "optimize-css-assets-webpack-plugin": "^5.0.0",
    "proxy-middleware": "^0.15.0",
    "sass-loader": "^7.1.0",
    "uglifyjs-webpack-plugin": "^1.2.7",
    "url-loader": "^1.0.1",
    "webpack": "^4.16.5",
    "webpack-cli": "^3.1.0",
    "webpack-dev-server": "^3.1.5",
    "webpack-hot-middleware": "^2.22.3",
    "webpack-html-plugin": "^0.1.1"
  },
  "engines": {
    "node": ">=6.9.5"
  }
}

```

