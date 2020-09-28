module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	'extends': ['eslint:recommended', 'plugin:vue/base', 'plugin:vue/essential'],
	parserOptions: {
		parser: 'babel-eslint'
	},
	plugins: [
		'vue'
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
	}
}
