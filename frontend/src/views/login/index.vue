<template>
	<div class="login">
		<h3>Board Games Library</h3>
		<v-card raised class="login-card">
			<v-alert
				v-if="errors.loginError"
				type="error"
				transition="scale-transition"
				>{{ errors.loginError }}</v-alert
			>
			<v-alert
				v-if="errors.loginConnectionError"
				type="error"
				transition="scale-transition"
				>{{ errors.loginConnectionError }}</v-alert
			>
			<v-text-field
				@input="clearError('loginError')"
				prefix=" "
				placeholder="Login"
				autofocus
				prepend-inner-icon="fas fa-sign-in-alt"
				v-model="username"
				clearable
				light
			></v-text-field>
			<v-text-field
				@input="clearError('loginError')"
				type="password"
				prefix=" "
				prepend-inner-icon="fas fa-lock"
				v-model="password"
				placeholder="Password"
				clearable
				light
			></v-text-field>
			<v-btn block color="primary" dark @click="_login()">LOGIN</v-btn>
		</v-card>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

const store = 'auth'

export default {
	name: 'Login',
	data: () => ({
		username: '',
		password: ''
	}),
	computed: {
		...mapGetters(['user', 'errors'])
	},
	methods: {
		...mapMutations(['clearError']),
		...mapActions(store, ['login']),
		_login() {
			let loginData = {
				username: this.username,
				password: this.password
			}
			this.login({
				loginData: loginData,
				onSuccess: () => {
					this.$router.push({ name: 'Library' })
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.login {
	display: flex;
	flex-direction: column;
	align-items: center;

	&-card {
		margin-top: 30px;
		width: 100%;
		max-width: 400px;
		padding: 10px;
	}
}
</style>
