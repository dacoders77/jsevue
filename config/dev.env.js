/* eslint-disable */
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // ROOT_API: '"http://45.76.210.96:9603/api"',
  LOG_VIEWER_URL: '"http://45.76.210.96:9602/log-viewer/logs"',
  ROOT_API: '"http://jse.kk/api"'
})
