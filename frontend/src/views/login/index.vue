<template>
  <div class="login">
    <h3>Board Games Library</h3>
    <v-alert
      v-if="accountConfirmed"
      class="mt-3"
      type="success"
    >
      Account confirmed. You can now log in.
    </v-alert>
    <v-card
      raised
      class="login-card"
    >
      <v-card-title>
        Login
      </v-card-title>
      <div v-if="errors.loginErrors && errors.loginErrors.non_field_errors">
        <v-alert
          v-for="([error, errorMsg], index) in Object.entries(errors.loginErrors.non_field_errors)"
          :key="index"
          type="error"
          transition="scale-transition"
        >
          {{ errorMsg }}
        </v-alert>
      </div>
      <v-text-field
        v-model="loginForm.email"
        prefix=" "
        placeholder="Email"
        autofocus
        prepend-icon="fas fa-at"
        clearable
        light
        :error="errors.loginErrors && errors.loginErrors.email"
        :error-messages="errors.loginErrors ? errors.loginErrors.email : []"
        @input="clearError('loginErrors')"
      />
      <v-text-field
        v-model="loginForm.password"
        type="password"
        prefix=" "
        prepend-icon="fas fa-lock"
        placeholder="Password"
        clearable
        light
        :error="errors.loginErrors && errors.loginErrors.password"
        :error-messages="errors.loginErrors ? errors.loginErrors.password : []"
        @input="clearError('loginErrors')"
      />
      <v-btn
        block
        color="success"
        :disabled="loginLoading"
        @click="_login()"
        @keyup.enter="_login()"
      >
        <span v-if="loginLoading">
          <v-progress-circular indeterminate />
        </span>
        <span v-else>LOGIN</span>
      </v-btn>
    </v-card>
    <span class="text-center mt-6 mb-1">OR</span>
    <v-card
      raised
      class="login-card"
    >
      <v-card-title>Register</v-card-title>
      <v-text-field
        v-model="registerForm.username"
        prefix=" "
        placeholder="Username"
        prepend-icon="fas fa-sign-in-alt"
        clearable
        light
        :error="errors.registerErrors && errors.registerErrors.username"
        :error-messages="errors.registerErrors ? errors.registerErrors.username : []"
        @input="clearError('registerErrors')"
      />
      <v-text-field
        v-model="registerForm.email"
        prefix=" "
        placeholder="Email"
        prepend-icon="fas fa-at"
        clearable
        light
        :error="errors.registerErrors && errors.registerErrors.email"
        :error-messages="errors.registerErrors ? errors.registerErrors.email : []"
        @input="clearError('registerErrors')"
      />
      <v-text-field
        v-model="registerForm.password1"
        type="password"
        prefix=" "
        prepend-icon="fas fa-lock"
        placeholder="Password"
        clearable
        light
        :error="errors.registerErrors && errors.registerErrors.password1"
        :error-messages="errors.registerErrors ? errors.registerErrors.password1 : []"
        @input="clearError('registerErrors')"
      />
      <v-text-field
        v-model="registerForm.password2"
        type="password"
        prefix=" "
        prepend-icon="fas fa-lock"
        placeholder="Password"
        clearable
        light
        :error="errors.registerErrors && errors.registerErrors.password2"
        :error-messages="errors.registerErrors ? errors.registerErrors.password2 : []"
        @input="clearError('registerErrors')"
      />
      <v-btn
        block
        color="primary"
        :disabled="registerLoading"
        @click="_register()"
      >
        REGISTER
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

const store = 'auth'

export default {
	name: 'Login',
	data: () => ({
    loginForm: {
      email: '',
      password: '',
    },
		registerForm: {
      username: '',
      email: '',
      password1: '',
      password2: ''
    },
    loginLoading: false,
    registerLoading: false,
	}),
	computed: {
		...mapGetters(['auth/user', 'errors']),
    accountConfirmed () {
      return this.$route.query.confirmed === 'true'
    }
	},
	methods: {
		...mapMutations(['clearError']),
		...mapActions('auth', ['login', 'register']),
		_login() {
      this.loginLoading = true
			this.login({
				loginData: this.loginForm,
				onSuccess: () => {
					this.$router.push({ name: 'Library' })
				},
        onError: () => {
          this.loginLoading = false
        }
			})
		},
    _register() {
		  this.registerLoading = true
      this.register({
        registerData: this.registerForm,
        onError: () => {
          this.registerLoading = false
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
		padding: 20px;

	}
}
</style>
