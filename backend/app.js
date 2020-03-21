const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const asyncHandler = require('express-async-handler')

// CORS
const whitelist = ['http://localhost:8080']
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(bodyParser.json())
app.use(cors(corsOptions))

app.use(new morgan('common'))

// MONGOOSE MONGODB
mongoose.connect('mongodb://localhost:27017/boardgameslibrary', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
let db = mongoose.connection

// REMOVE IN PRODUCTION
db.dropDatabase()

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', async function() {
  // we're connected!

  let userSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    username: String
  })

  userSchema.methods.initials = function() {
    let initials = this.name[0] + this.lastName[0]
    console.log(`${this.name} ${this.lastName} - ${initials}`)
    return initials
  }

  let User = mongoose.model('User', userSchema)

  let john = await User.create({
    name: 'John',
    lastName: 'Snow',
    username: 'john'
  })
  john.initials()

  console.log(await User.find())

  app.get('/', (req, res) => {
    res.send('Initial backend response.')
  })

  app.post(
    '/login/',
    asyncHandler(async (req, res) => {
      console.log(`Login request from ${req.body.username}`)
      const foundUser = await User.findOne({
        username: req.body.username
      })
      if (foundUser) {
        res.send(`Hello ${foundUser.name}!`)
      } else {
        res.status(404).send('User not found')
      }
    })
  )

  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})
