import axios from '@/axios'
import router from '@/router'

const login = async ({ commit }, data) => {
	const { loginData, onSuccess } = data
	try {
		const response = await axios.post('/login', loginData)
		commit('SETUSER', response.data)
		if (onSuccess) onSuccess()
		commit('CLEARERROR')
	} catch (error) {
		if (error.response && [(400, 404)].includes(error.response.status)) {
			commit('SETERROR', { loginError: "Login or password don't match." })
		} else {
			commit('SETERROR', {
				loginConnectionError: 'Problems connecting with database.'
			})
		}
	}
}

const logout = async ({ commit }) => {
	commit('LOGOUT')
	router.push({ name: 'Home' })
}

export default {
	login,
	logout
}
