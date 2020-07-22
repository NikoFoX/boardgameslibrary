import userSchema from './userSchema'
import mongoose from 'mongoose'

export default mongoose.model('User', userSchema)
