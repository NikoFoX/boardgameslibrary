import mongoose from 'mongoose'
import { v4 as uuid4 } from 'uuid'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import normalize from 'normalize-mongoose'

let userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		min: 4,
		max: 30,
		unique: true
	},
	password: {
		type: String,
		equired: true,
		trim: true,
		min: 8,
		max: 30
	},
	token: {
		type: String,
		equired: true,
		unique: true,
		default: () => uuid4().toString()
	}
})

// INITIALS AS INSTANCE METHOD
// userSchema.methods.get_initials = function () {
// 	let initials = this.name[0] + this.lastName[0]
// 	return initials
// }

// INITIALS AS INSTANCE PROPERTY - virtual
// userSchema.virtual('initials').get(function () {
// 	return this.name[0] + this.lastName[0]
// })

userSchema.plugin(mongooseUniqueValidator)
userSchema.plugin(normalize)

export default userSchema
