const errors = (state) => state.errors
const user = (state) => state.user
const userLogged = (state) => Object.values(state.user).length > 0

const foundGames = (state) => state.foundGames
const foundGame = (state) => state.foundGame

const games = (state) => state.games
const game = (state) => state.game

export default {
	errors,
	user,
	userLogged,
	foundGames,
	foundGame,
	games,
	game
}
