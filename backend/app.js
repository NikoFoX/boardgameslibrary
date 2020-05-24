import express from 'express'
const app = express()
import morgan from 'morgan'
import cors from 'cors'
import { json } from 'body-parser'

// CORS
// const whitelist = ['http://localhost:3000', 'http://localhost:8080']
// const corsOptions = {
// 	origin: (origin, callback) => {
// 		console.log(origin)
// 		if (whitelist.indexOf(origin) !== -1) {
// 			callback(null, true)
// 		} else {
// 			callback(new Error('Not allowed by CORS'))
// 		}
// 	}
// }
app.use(json())
app.use(cors())

app.use(new morgan('dev'))

// MONGOOSE MONGODB
import db from './db'
db.mongoose
	.connect(db.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('DB connected')
	})
	.catch((error) => {
		console.log('Problem connecting to database', error)
		process.exit()
	})

// ATTACH ROUTES
import router from './routes'
app.use(router)

// REMOVE IN PRODUCTION
db.mongoose.connection.dropDatabase()
db.mongoose.connection.once('open', async function () {
	// Creating John Snow user
	let john = await db.models.User.create({
		name: 'John',
		lastName: 'Snow',
		username: 'john'
	})

	// Calling object instance method get_initials()
	console.log(john.get_initials())
	// Getting object instance virtual property initials
	console.log(john.initials)
})
//

app.listen(3000, () => {
	console.log('listening on 3000')
})
