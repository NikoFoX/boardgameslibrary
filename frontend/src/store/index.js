import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import auth from './modules/auth'

Vue.use(Vuex)

const initialStoreState = {
	games: [],
	game: {
		matches: []
	},
	matches: [],
	errors: {},
	foundGames: null,
	foundGame: null
}

export default new Vuex.Store({
	state: initialStoreState,
	mutations: mutations,
	actions: actions,
	getters: getters,
	modules: {
		auth
	}
})
