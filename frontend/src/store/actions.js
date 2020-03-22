import axios from '@/axios'
import router from '@/router'

const login = async ({ commit }, data) => {
	const { loginData, onSuccess } = data
	try {
		const response = await axios.post('/login', loginData)
		commit('SETUSER', response.data)
		if (onSuccess) onSuccess()
	} catch (error) {
		if (error.response.status === 404) {
			commit('SETERROR', { loginError: "Login or password don't match." })
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
