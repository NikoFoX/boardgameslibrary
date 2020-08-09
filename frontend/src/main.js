import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from './axios'
import vuelidate from 'vuelidate'

Vue.prototype.$eventBus = new Vue()

Vue.config.productionTip = false

Vue.use(vuelidate)

new Vue({
	router,
	store,
	axios,
	vuetify,
	render: (h) => {
		return h(App)
	}
}).$mount('#app')
