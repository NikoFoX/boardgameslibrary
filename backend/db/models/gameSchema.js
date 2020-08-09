import { Decimal128, ObjectId } from 'mongodb'
import mongoose from 'mongoose'
import Game from './Game'
import Match from './Match'
import normalize from 'normalize-mongoose'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals'
import { MATCH_RESULTS } from '../../common/constants'

let gameSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true
		},
		rating: Decimal128,
		image: String,
		thumbnail: String,
		externalId: {
			type: String,
			required: true,
			validate: [
				async function (value) {
					// try to find game for user with same externalId
					let game = await Game.findOne({
						user: this.user,
						externalId: value
					})
					return game ? false : true
				},
				'Game already exists in user library.'
			]
		},
		user: {
			type: ObjectId,
			required: true
		}
	},
	{
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	}
)

// methods
// gameSchema.method('matches', function () {
// 	return Match.count({ game: this.id })
// })

// virtuals
// gameSchema.virtual('result_win').get(function () {
// 	let matches = this.matches()
// 	console.log(matches)
// 	return 2
// })

// POPULATE VIRTUALS
gameSchema.virtual('played', {
	ref: 'Match',
	localField: '_id',
	foreignField: 'game',
	count: true
})

gameSchema.virtual('result_win', {
	ref: 'Match',
	localField: '_id',
	foreignField: 'game',
	match: { result: MATCH_RESULTS.WIN },
	count: true
})

gameSchema.virtual('result_loss', {
	ref: 'Match',
	localField: '_id',
	foreignField: 'game',
	match: { result: MATCH_RESULTS.LOSS },
	count: true
})

gameSchema.virtual('result_draw', {
	ref: 'Match',
	localField: '_id',
	foreignField: 'game',
	match: { result: MATCH_RESULTS.DRAW },
	count: true
})

gameSchema.virtual('result_other', {
	ref: 'Match',
	localField: '_id',
	foreignField: 'game',
	match: { result: MATCH_RESULTS.OTHER },
	count: true
})

gameSchema.plugin(normalize)
gameSchema.plugin(mongooseLeanVirtuals)

export default gameSchema
