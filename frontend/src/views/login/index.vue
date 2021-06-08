<template>
  <div class="login">
    <h3>Board Games Library</h3>
    <v-alert
      v-if="accountRegistered"
      class="mt-3"
      type="success"
    >
      Account registered. You can now log in.
    </v-alert>
    <v-expansion-panels
      v-model="openedPanel"
      mandatory
      popout
      hover
      class="login-card"
    >
      <v-expansion-panel ripple>
        <v-expansion-panel-header>
          <span class="text-center h5">LOGIN</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
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
            :error="!!(errors.loginErrors && errors.loginErrors.email)"
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
            :error="!!(errors.loginErrors && errors.loginErrors.password)"
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
            <v-progress-circular
              v-if="loginLoading"
              indeterminate
            />
            <span v-else>LOGIN</span>
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel />
      <v-expansion-panel ripple>
        <v-expansion-panel-header>
          <span class="text-center h5">REGISTER</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-text-field
            v-model="registerForm.username"
            prefix=" "
            placeholder="Username"
            prepend-icon="fas fa-sign-in-alt"
            clearable
            light
            :error="!!(errors.registerErrors && errors.registerErrors.username)"
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
            :error="!!(errors.registerErrors && errors.registerErrors.email)"
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
            :error="!!(errors.registerErrors && errors.registerErrors.password1)"
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
            :error="!!(errors.registerErrors && errors.registerErrors.password2)"
            :error-messages="errors.registerErrors ? errors.registerErrors.password2 : []"
            @input="clearError('registerErrors')"
          />
          <v-btn
            block
            color="primary"
            :disabled="registerLoading"
            @click="_register()"
          >
            <v-progress-circular
              v-if="registerLoading"
              indeterminate
            />
            <span v-else>REGISTER</span>
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
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
    openedPanel: '',
    loginLoading: false,
    registerLoading: false,
    accountRegistered: false
	}),
	computed: {
		...mapGetters(['auth/user', 'errors']),
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
        onSuccess: () => {
          this.accountRegistered = true
          this.openedPanel = 0 // login panel is 0; register is 2
        },
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
