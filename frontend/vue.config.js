module.exports = {
	'transpileDependencies': ['vuetify'],
	publicPath: 'http://0.0.0.0:8080',
	devServer: {
		public: '0.0.0.0',
		host: '0.0.0.0',
		port: '8080',
		proxy: 'http://localhost:8000',
		watchOptions: {
			poll: true
		}
	},
	productionSourceMap: true,
	// css: {
	// 	sourceMaps: true
	// },
	configureWebpack: {
		devtool: 'source-map'
	},
	lintOnSave: 'warning'
}
