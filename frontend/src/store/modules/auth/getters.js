const user = (state) => state.user
const userLogged = (state) => Object.values(state.user).length > 0

export default {
  user,
  userLogged
}