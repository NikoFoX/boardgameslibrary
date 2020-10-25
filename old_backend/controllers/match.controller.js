import Match from '../db/models/Match'
import mongoose from 'mongoose'
import Rest from 'mongoose-rest-api'

const endpoints = Rest(Match, 'id')

const getAllMatches = async (req, res) => {
	req.query.populate = ['gameTitle']
	const matches = await endpoints.get(req, res)
	if (matches) return res.send(matches)
	else return res.sendStatus(404)
}

const getMatch = async (req, res) => {
	let game = await endpoints.get(req, res)
	if (game) return res.json(game)
	else return res.sendStatus(404)

	// const matchId = req.params.id
	// if (!mongoose.Types.ObjectId.isValid(matchId))
	// 	return res.status(400).send('Invalid Match id')
	// let match = await Match.findById(matchId)
	// if (!match) return res.status(404).send('Match not found')
	// return res.send(match)
}

const newMatch = async (req, res) => {
	req.body.user = req.user.id
	try {
		const match = await endpoints.post(req, res)
		return res.status(201).send(match)
	} catch (err) {
		return res.status(400).send(err.errors)
	}
}

const updateMatch = async (req, res) => {
	req.body.user = req.user.id
	try {
		const match = await endpoints.patch(req, res)
		return res.status(201).send(match)
	} catch (err) {
		return res.status(400).send(err.errors)
	}
}

const removeMatch = async (req, res) => {
	req.body.user = req.user.id
	try {
		await endpoints.delete(req, res)
		return res.status(203)
	} catch (err) {
		return res.status(400).send(err.errors)
	}
}

export default {
	getAllMatches,
	getMatch,
	newMatch,
	updateMatch,
	removeMatch
}
