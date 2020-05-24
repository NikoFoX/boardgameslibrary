import mongoose from 'mongoose'

let userSchema = new mongoose.Schema({
	name: String,
	lastName: String,
	username: String
})

// INITIALS AS INSTANCE METHOD
userSchema.methods.get_initials = function () {
	let initials = this.name[0] + this.lastName[0]
	return initials
}

// INITIALS AS INSTANCE PROPERTY - virtual
userSchema.virtual('initials').get(function () {
	return this.name[0] + this.lastName[0]
})

export default mongoose.model('User', userSchema)
