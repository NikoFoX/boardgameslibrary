import axios from '@/axios'
import originalAxios from 'axios'
import router from '@/router'
import xmljs from 'xml-js'

const login = async ({ commit }, data) => {
	const { loginData, onSuccess } = data
	try {
		const response = await axios.post('/login', loginData)
		commit('setUser', response.data)
		if (onSuccess) onSuccess()
		commit('clearError')
	} catch (error) {
		if (error.response && [(400, 404)].includes(error.response.status)) {
			commit('setError', { loginError: "Login or password don't match." })
		} else {
			commit('setError', {
				loginConnectionError: 'Problems connecting with database.'
			})
		}
	}
}

const logout = async ({ commit }) => {
	commit('logout')
	router.push({ name: 'Login' })
}

const addGame = async ({ commit, dispatch }, data) => {
	const { gameData, onSuccess } = data
	try {
		const response = await axios.post('/game', gameData)
		if (onSuccess) onSuccess()
		// get games and go to library
		dispatch('getGames')
	} catch (error) {
		console.log('Error adding game')
		console.log(error)
	}
}

const findGames = async ({ state, commit }, gameTitle) => {
	const api = `https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query=${gameTitle}`
	try {
		const response = await originalAxios.get(api)
		let foundGames = xmljs.xml2json(response.data, {
			compact: true
		})
		foundGames = JSON.parse(foundGames)
		if (foundGames.items) foundGames = foundGames.items.item
		else foundGames = null
		if (foundGames) {
			let games = {}
			foundGames.forEach((game) => {
				games[game._attributes.id] = {
					name: game.name._attributes.value,
					id: game._attributes.id
				}
			})
			state.foundGames = games
		} else {
			state.errors['foundGames'] = 'No games found'
		}
	} catch (error) {
		console.log('Error finding games')
		console.log(error)
	}
}

const findGame = async ({ state, commit }, gameId) => {
	const api = `https://www.boardgamegeek.com/xmlapi2/thing?id=${gameId}`
	try {
		const response = await originalAxios.get(api)
		let foundGame = xmljs.xml2json(response.data, {
			compact: true
		})
		foundGame = JSON.parse(foundGame)
		foundGame = foundGame.items.item
		console.log(foundGame)
		state.foundGame = {
			image: foundGame.image._text,
			thumbnail: foundGame.thumbnail._text
		}
	} catch (error) {
		console.log('Error finding games')
		console.log(error)
	}
}

const getGames = async ({ commit }) => {
	try {
		const response = await axios.get('/game')
		commit('setGames', response.data)
		router.push({ name: 'Library' })
	} catch (error) {
		console.log('Error getting games')
		console.log(error)
	}
}

const getGame = async ({ commit }, gameId) => {
	try {
		const response = await axios.get(`/game/${gameId}`)
		commit('setGame', response.data)
	} catch (error) {
		console.log('Error getting game')
		console.log(error)
	}
}

const saveMatch = async ({ commit, dispatch, state }, match) => {
	let isNew = !match.id
	try {
		if (isNew) await axios.post('/match/', match)
		else await axios.patch(`/match/${match.id}`, match)
		dispatch('getGame', state.game.id)
	} catch (error) {
		console.log('Error saving match')
		console.log(error)
	}
}

export default {
	login,
	logout,
	addGame,
	findGames,
	findGame,
	getGames,
	getGame,
	saveMatch
}
