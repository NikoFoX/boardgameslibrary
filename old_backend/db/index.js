import dbConfig from '../config/db.config.js'
import mongoose from 'mongoose'
// Import models
import User from './models/User.js'
import Game from './models/Game.js'
import Match from './models/Match.js'

mongoose.Promise = global.Promise // ??

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url

db.models = {
	User: User,
	Game: Game,
	Match: Match
}
export default db
