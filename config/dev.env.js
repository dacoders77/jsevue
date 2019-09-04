/* eslint-disable */
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //ROOT_API: '"http://45.76.210.96:9603/api"',
  ROOT_API: '"http://jse.kk/api"',
  LOG_VIEWER_URL: '"http://45.76.210.96:9602/log-viewer/logs"',
  //PUSHER_KEY: '"957f41d7acfeba2194c8"', // Nastya's key?
  //PUSHER_CLUSTER: '"ap1"', // Nastya's?

  PUSHER_KEY: '"72d2ded78de1bafac432"', // Boris's local
  PUSHER_CLUSTER: '"mt1"' // Boris's cluster
})
