const SETERROR = (state, errorItem) => {
	state.errors = {
		...state.errors,
		...errorItem
	}
}
const CLEARERROR = (state, errorName) => {
	delete state.errors[errorName]
}

const clearErrors = (state) => {
	state.errors = {}
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

const CLEARFOUNDGAMES = (state) => {
	state.foundGames = null
}

const CLEARFOUNDGAME = (state) => {
	state.foundGame = null
}

export default {
	SETERROR,
	CLEARERROR,
	clearErrors,
	SETUSER,
	LOGOUT,
	CLEARFOUNDGAMES,
	CLEARFOUNDGAME
}
