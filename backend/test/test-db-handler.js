import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

const mongod = new MongoMemoryServer()

/**
 * Connect to the in-memory database.
 */
const connect = async () => {
	const uri = await mongod.getConnectionString()

	const mongooseOpts = {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}

	await mongoose.connect(uri, mongooseOpts)
}

/**
 * Drop database, close the connection and stop mongod.
 */
const closeDatabase = async () => {
	await mongoose.connection.dropDatabase()
	await mongoose.connection.close()
	await mongod.stop()
}

/**
 * Remove all the data for all db collections.
 */
const clearDatabase = async () => {
	const collections = mongoose.connection.collections

	for (const key in collections) {
		const collection = collections[key]
		await collection.deleteMany()
	}
}

before(async () => await connect())
after(async () => await closeDatabase())

export default {
	connect,
	closeDatabase,
	clearDatabase
}
