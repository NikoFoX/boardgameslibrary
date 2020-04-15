const errors = state => state.errors
const user = state => state.user
const userLogged = state => Object.values(state.user).length > 0

export default {
	errors,
	user,
	userLogged
}
