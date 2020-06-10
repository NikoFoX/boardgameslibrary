import { Decimal128, ObjectId } from 'mongodb'
import mongoose from 'mongoose'

let gameSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	rating: Decimal128,
	image: String,
	thumbnail: String,
	user: {
		type: ObjectId,
		required: true
	}
})

export default mongoose.model('Game', gameSchema)
