const webpack = require('webpack')
const config = require('../webpack.config')

const compiler = webpack(config)

compiler.run((error, stats) => {
  if (error) {
    console.error(error)
    return
  }

  console.log(stats.toString({ preset: 'normal', colors: true }))
})
