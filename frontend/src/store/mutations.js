const SETERROR = (state, errorItem) => {
	state.errors = {
		...state.errors,
		...errorItem
	}
}
const CLEARERROR = (state, errorName) => {
	delete state.errors[errorName]
}

const SETUSER = (state, userData) => {
	state.user = userData
	sessionStorage.setItem('user', JSON.stringify(userData))
	sessionStorage.setItem('authToken', userData.token)
}

const LOGOUT = (state) => {
	state.user = {}
	sessionStorage.setItem('user', '')
}

export default {
	SETERROR,
	CLEARERROR,
	SETUSER,
	LOGOUT
}
