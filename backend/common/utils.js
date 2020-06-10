import User from '../db/models/User'

export const verifyToken = async (req, res, next) => {
	let token = req.headers['authorization']
	if (token) {
		token = token.split(' ')[1]
		const user = User.find({ token: token })
		if (user) {
			req.user = user
			next()
		} else res.status(403).send('User unathenticated')
	} else res.status(403).send('User unathenticated')
}
