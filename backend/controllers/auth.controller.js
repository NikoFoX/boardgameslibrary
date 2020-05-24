import db from '../db'
const User = db.models.User

const home = (req, res) => {
	res.status(200).send('Initial message')
}

const login = async (req, res) => {
	console.log(`Login request from ${req.body.username}`)
	const foundUser = await User.findOne({
		username: req.body.username
	})
	if (foundUser) {
		res.send(foundUser.toJSON({ virtuals: true }))
	} else {
		res.status(404).send('User not found')
	}
}

export default {
	home,
	login
}
