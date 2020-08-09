import Match from '../db/models/Match'
import mongoose from 'mongoose'
import Rest from 'mongoose-rest-api'

const endpoints = Rest(Match, 'id')

// const getAllMatches = async (req, res) => {
// 	let matches = await Match.find({})
// 	return res.send(matches)
// }

// const getMatch = async (req, res) => {
// 	const matchId = req.params.id
// 	if (!mongoose.Types.ObjectId.isValid(matchId))
// 		return res.status(400).send('Invalid Match id')
// 	let match = await Match.findById(matchId)
// 	if (!match) return res.status(404).send('Match not found')
// 	return res.send(match)
// }

const newMatch = async (req, res) => {
	req.body.user = req.user.id
	try {
		const match = await endpoints.post(req, res)
		return res.status(201).send(match)
	} catch (err) {
		return res.status(400).send(err.errors)
	}
}

export default {
	// getAllMatches,
	// getMatch,
	newMatch
}
