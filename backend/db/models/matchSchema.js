import mongoose from 'mongoose'
import { MATCH_RESULTS } from '../../common/constants'
import normalize from 'normalize-mongoose'

let matchSchema = new mongoose.Schema({
	played: { type: Date, default: Date.now },
	result: { type: Number, default: MATCH_RESULTS.OTHER },
	team: Array,
	opponents: Array,
	scenario: String,
	points: mongoose.Decimal128,
	game: { type: mongoose.ObjectId, required: true }
})

// Workaround to extract decimal value from Decimal128 object
matchSchema.set('toJSON', {
	transform: (doc, ret) => {
		if (ret.points) ret.points = ret.points.toString()
		return ret
	}
})

matchSchema.plugin(normalize)

export default matchSchema
