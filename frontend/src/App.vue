<template>
  <v-app>
    <MainMenu v-if="userLogged" />
    <v-main>
      <v-container
        fluid
        class="content"
        grid-list-xs
      >
        <router-view :key="$route.path" />
        <v-snackbar
          color="success"
          :value="userLogged"
          :timeout="3000"
          bottom
        >
          <span class>Succesfully logged in</span>
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import MainMenu from '@/components/MainMenu'

export default {
	name: 'App',
	components: {
		MainMenu
	},
	data: () => ({}),
	computed: {
		...mapGetters(['errors']),
		...mapGetters('auth', ['user', 'userLogged'])
	},
  created() {
		if (sessionStorage.getItem('user')) {
			this.setUser(JSON.parse(sessionStorage.getItem('user')))
		}
	},
	methods: {
		...mapMutations(['clearError']),
		...mapMutations('auth', ['setUser']),
		...mapActions(['auth/login'])
	},
}
</script>

<style lang="scss">
@import "scss/index";
.content {
	width: 100%;
	height: 100%;
	background: rgba(52, 60, 165, 0.664);
}
</style>
