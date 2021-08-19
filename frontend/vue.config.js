module.exports = {
	'transpileDependencies': ['vuetify'],
	publicPath: 'http://localhost:8080',
	devServer: {
		public: 'localhost',
		host: '0.0.0.0',
		watchOptions: {
			poll: true
		},
		historyApiFallback: true
	},
	productionSourceMap: true,
	configureWebpack: {
		devtool: 'source-map'
	},
	lintOnSave: 'warning'
}
