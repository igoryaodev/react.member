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
  quiet: true,  //向控制台显示任何内容 
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