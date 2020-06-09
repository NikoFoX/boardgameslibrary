import { Decimal128 } from 'mongodb'
import mongoose from 'mongoose'

let gameSchema = new mongoose.Schema({
	title: String,
	rating: Decimal128,
	coverUrl: String,
	bggUrl: String
})

export default mongoose.model('Game', gameSchema)
