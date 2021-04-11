module.exports = {
	'transpileDependencies': ['vuetify'],
	publicPath: 'http://127.0.0.1:8080',
	devServer: {
		host: '0.0.0.0',
		port: '8080',
		// proxy: 'http://localhost:3000'
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
