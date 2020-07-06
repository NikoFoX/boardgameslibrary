import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from './axios'

Vue.prototype.$eventBus = new Vue()

Vue.config.productionTip = false

new Vue({
	router,
	store,
	axios,
	vuetify,
	render: (h) => {
		return h(App)
	}
}).$mount('#app')
