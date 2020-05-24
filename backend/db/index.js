import dbConfig from '../config/db.config.js'
import mongoose from 'mongoose'
// Import models
import User from './models/User'

mongoose.Promise = global.Promise // ??

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url

db.models = {
	User: User
}
export default db
