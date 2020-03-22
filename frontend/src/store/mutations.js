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
}

const LOGOUT = state => {
	state.user = null
	sessionStorage.setItem('user', '')
}

export default {
	SETERROR,
	CLEARERROR,
	SETUSER,
	LOGOUT
}
