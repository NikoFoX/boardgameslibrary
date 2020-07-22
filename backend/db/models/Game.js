import gameSchema from './gameSchema'
import mongoose from 'mongoose'

export default mongoose.model('Game', gameSchema)
