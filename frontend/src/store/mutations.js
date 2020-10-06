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

const setMatches = (state, matches) => {
	state.matches = matches
}

export default {
	setError,
	clearError,
	clearErrors,
	clearFoundGames,
	clearFoundGame,
	setGames,
	setGame,
	setMatches
}
