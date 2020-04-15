const errors = state => state.errors
const user = state => state.user
const userLogged = state => state.user.name !== null

export default {
	errors,
	user,
	userLogged
}
