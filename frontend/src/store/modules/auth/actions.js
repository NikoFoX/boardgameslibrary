import axios from '../../../axios'
import router from '../../../router'

const login = async ({ commit }, data) => {
	delete axios.defaults.headers.common['Authorization']
	const { loginData, onSuccess, onError } = data
	try {
		const response = await axios.post('api/auth/login/', loginData)
		commit('setUser', response.data)
		if (onSuccess) onSuccess()
		commit('clearError', null, {root: true})
	} catch (error) {
		if (onError) onError()
		if (error.response && [400, 404].includes(error.response.status)) {
			commit('setError', { loginErrors: error.response.data}, {root: true})
		} else {
			commit('setError', {
				loginErrors: {
					loginConnectionError: 'Problems connecting with database.'
				}
			}, {root: true})
		}
	}
}

const logout = async ({ commit }) => {
	commit('logout')
	sessionStorage.clear()
	router.push({ name: 'Login' })
}

const register = async ({ commit }, data) => {
	const { registerData, onSuccess, onError } = data
	sessionStorage.clear()
	try {
		const response = await axios.post('api/auth/register/', registerData)
		if (onSuccess) onSuccess()
		commit('clearError', null, {root: true})
	} catch (error) {
		if (onError) onError()
		if (error.response && [400].includes(error.response.status)) {
			commit('setError', {registerErrors: error.response.data}, {root: true})
		}
	}
}

export default {
  	login,
	logout,
	register
}
