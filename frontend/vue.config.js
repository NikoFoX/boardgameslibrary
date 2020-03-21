module.exports = {
  'transpileDependencies': ['vuetify'],
  publicPath: 'http://localhost:8080',
  devServer: {
    host: 'localhost',
    port: '8080',
    proxy: 'http://localhost:3000'
  },
  productionSourceMap: true,
  // css: {
  // sourceMaps: true
  // },
  configureWebpack: {
    devtool: 'source-map'
  }
}
