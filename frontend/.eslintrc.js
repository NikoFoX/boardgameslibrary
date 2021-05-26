module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	extends: ['plugin:vue/recommended', 'eslint:recommended', 'plugin:vue/base', 'plugin:vue/essential'],
	parser: "vue-eslint-parser",
	parserOptions: {
    	vueFeatures: {
			filter: true,
			interpolationAsNonHTML: false,
    	}
  	},
	plugins: [
		'vue'
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
	}
}
