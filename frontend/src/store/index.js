import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const initialStoreState = {
	user: {},
	games: {},
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
	modules: {}
})
