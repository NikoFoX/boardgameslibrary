<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<div class="d-flex align-center">
				<router-link :to="{ name: 'Home' }">
					<v-img
						alt="Vuetify Logo"
						class="shrink mr-2"
						contain
						src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
						transition="scale-transition"
						width="40"
					/>
				</router-link>
			</div>
			<v-spacer></v-spacer>
			<template v-if="user">
				<div>
					<span class="mr-2">
						<router-link class="text-light" :to="{ name: 'Account' }"
							>Logged: {{ user.name + ' ' + user.lastName }}
						</router-link>
					</span>

					<div>
						<a class="text-white" @click="logout()">Logout</a>
					</div>
				</div>
				<v-avatar color="red">{{ user.initials }}</v-avatar>
			</template>
			<template v-else>
				<v-dialog v-model="loginDialog" max-width="500px" hide-overlay>
					<template v-slot:activator="{ on }">
						<a class="text-white login" v-on="on">Log in</a>
					</template>
					<v-container grid-list-xs>
						<v-alert
							v-if="errors.hasOwnProperty('loginError')"
							type="error"
							transition="scale-transition"
							>{{ errors.loginError }}</v-alert
						>
						<v-text-field
							@input="CLEARERROR('loginError')"
							prefix=" "
							placeholder="Login"
							autofocus
							prepend-inner-icon="fas fa-sign-in-alt"
							v-model="username"
							clearable
							light
						></v-text-field>
						<v-text-field
							@input="CLEARERROR('loginError')"
							type="password"
							prefix=" "
							prepend-inner-icon="fas fa-lock"
							v-model="password"
							placeholder="Password"
							clearable
							light
						></v-text-field>
						<v-btn block color="primary" dark @click="_login()">LOGIN</v-btn>
					</v-container>
				</v-dialog>
			</template>
		</v-app-bar>

		<v-content>
			<router-view :key="$route.path" />
		</v-content>
	</v-app>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
	name: 'App',
	components: {},
	data: () => ({
		drawer: true,
		loginDialog: false,
		username: '',
		password: ''
	}),
	computed: {
		...mapGetters(['errors', 'user'])
	},
	methods: {
		...mapMutations(['CLEARERROR', 'SETUSER']),
		...mapActions(['login', 'logout']),
		_login() {
			let loginData = {
				username: this.username,
				password: this.password
			}
			this.login({
				loginData: loginData,
				onSuccess: () => {
					this.loginDialog = false
				}
			})
		}
	},
	created() {
		if (sessionStorage.getItem('user')) {
			this.SETUSER(JSON.parse(sessionStorage.getItem('user')))
		}
	}
}
</script>

<style lang="scss">
.login {
	font-weight: bold;
	text-decoration: underline !important;
}
</style>
