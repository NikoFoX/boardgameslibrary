import mongoose from 'mongoose'
import { MATCH_RESULTS } from '../../common/constants'
import normalize from 'normalize-mongoose'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals'

let matchSchema = new mongoose.Schema(
	{
		played: { type: Date, default: Date.now },
		result: { type: Number, default: MATCH_RESULTS.OTHER },
		team: Array,
		opponents: Array,
		scenario: String,
		points: { type: mongoose.Decimal128, get: (v) => `${v}` },
		game: { type: mongoose.ObjectId, required: true }
	},
	{
		toObject: { virtuals: true, getters: true },
		toJSON: { virtuals: true, getters: true }
	}
)

// Workaround to extract decimal value from Decimal128 object
// matchSchema.set('toJSON', {
// 	transform: (doc, ret) => {
// 		if (ret.points) ret.points = ret.points.toString()
// 		return ret
// 	}
// })

// virtuals
// matchSchema.virtual('gameName').get(async function () {
// 	console.log(this.game)
// 	let game = await Game.findOne({ _id: this.game })
// 	return game.title
// })

matchSchema.virtual('gameTitle', {
	ref: 'Game',
	localField: 'game',
	foreignField: '_id',
	justOne: true,
	options: { select: 'title' }
})

matchSchema.plugin(normalize)
matchSchema.plugin(mongooseLeanVirtuals)

export default matchSchema
