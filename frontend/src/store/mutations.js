const setError = (state, errorItem) => {
	state.errors = {
		...state.errors,
		...errorItem
	}
}
const clearError = (state, errorName) => {
	delete state.errors[errorName]
}

const clearErrors = (state) => {
	state.errors = {}
}

const setUser = (state, userData) => {
	state.user = userData
	sessionStorage.setItem('user', JSON.stringify(userData))
	sessionStorage.setItem('authToken', userData.token)
}

const logout = (state) => {
	state.user = {}
	sessionStorage.setItem('user', '')
}

const clearFoundGames = (state) => {
	state.foundGames = null
}

const clearFoundGame = (state) => {
	state.foundGame = null
}

const setGames = (state, games) => {
	state.games = { ...games }
}

const setGame = (state, game) => {
	state.game = game
}

export default {
	setError,
	clearError,
	clearErrors,
	setUser,
	logout,
	clearFoundGames,
	clearFoundGame,
	setGames,
	setGame
}
