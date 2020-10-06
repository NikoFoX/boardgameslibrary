import axios from '../../../axios'

const setUser = (state, userData) => {
	state.user = userData
	sessionStorage.setItem('user', JSON.stringify(userData))
	sessionStorage.setItem('authToken', userData.token)
	axios.defaults.headers.common['Authorization'] = `Token ${userData.token}`
}

const logout = (state) => {
	state.user = {}
	sessionStorage.setItem('user', '')
}

export default {
  setUser,
  logout
}