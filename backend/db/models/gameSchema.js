import { Decimal128, ObjectId } from 'mongodb'
import mongoose from 'mongoose'
import Game from './Game'
import normalize from 'normalize-mongoose'

let gameSchema = new mongoose.Schema({
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
})

gameSchema.plugin(normalize)

export default gameSchema
