import Game from '../db/models/Game'
import Rest from 'mongoose-rest-api'

const endpoints = Rest(Game, 'id')

const getAllGames = async (req, res) => {
	const games = await endpoints.get(req, res)
	if (games) return res.send(games)
	else return res.sendStatus(404)
}

const getGame = async (req, res) => {
	const game = await endpoints.get(req, res)
	if (game) return res.send(game)
	else return res.sendStatus(404)
}

const newGame = async (req, res) => {
	const game = await endpoints.post(req, res).catch((err) => {
		return res.status(400).send(err.errors)
	})
	return res.status(201).send(game)
}

const updateGame = async (req, res) => {
	const game = await endpoints.patch(req, res).catch((err) => {
		return res.status(400).send(err)
	})
	if (game) return res.send(game)
	else res.sendStatus(404)
}

export default {
	getAllGames,
	getGame,
	newGame,
	updateGame
}
