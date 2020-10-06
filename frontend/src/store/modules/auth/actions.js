import axios from '../../../axios'
import router from '../../../router'

const login = async ({ commit }, data) => {
	delete axios.defaults.headers.common['Authorization']
	const { loginData, onSuccess } = data
	try {
		const response = await axios.post('/login', loginData)
		commit('setUser', response.data)
		if (onSuccess) onSuccess()
		commit('clearError', null, {root: true})
	} catch (error) {
		if (error.response && [400, 404].includes(error.response.status)) {
			commit('setError', { loginError: "Login or password don't match." }, {root: true})
		} else {
			commit('setError', {
				loginConnectionError: 'Problems connecting with database.'
			}, {root: true})
		}
	}
}

const logout = async ({ commit }) => {
	commit('logout')
	router.push({ name: 'Login' })
}

export default {
  login,
	logout
}