import Game from '../db/models/Game'
import Rest from 'mongoose-rest-api'

const endpoints = Rest(Game, 'id')

const getAllGames = async (req, res) => {
	const games = await endpoints.get(req, res)
	if (games) return res.send(games)
	else return res.sendStatus(404)
}

const getGame = async (req, res) => {
	req.query.populate = [
		'result_win',
		'result_loss',
		'result_draw',
		'result_other'
	]
	let game = await endpoints.get(req, res)
	if (game) return res.json(game)
	else return res.sendStatus(404)
}

const newGame = async (req, res) => {
	req.body.user = req.user.id
	try {
		const game = await endpoints.post(req, res)
		return res.status(201).send(game)
	} catch (err) {
		return res.status(400).send(err.errors)
	}
}

const updateGame = async (req, res) => {
	let game = await endpoints.get(req, res)
	if (!game) return res.sendStatus(404)
	try {
		let game = await endpoints.patch(req, res)
		if (game) return res.send(game)
	} catch (err) {
		return res.status(400).send(err.errors)
	}
}

export default {
	getAllGames,
	getGame,
	newGame,
	updateGame
}
