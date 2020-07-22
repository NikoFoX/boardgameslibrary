import mongoose from 'mongoose'
import { MATCH_RESULTS } from '../../common/constants'
import { Decimal128, ObjectId } from 'mongodb'
import normalize from 'normalize-mongoose'

let matchSchema = new mongoose.Schema({
	played: { type: Date, default: Date.now },
	result: { type: Number, default: MATCH_RESULTS.OTHER },
	team: Array,
	opponents: Array,
	scenario: String,
	points: Decimal128,
	game: ObjectId
})

matchSchema.plugin(normalize)

export default matchSchema
