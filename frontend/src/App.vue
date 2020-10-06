<template>
	<v-app>
		<MainMenu />
		<v-main>
			<v-container fluid class="content" grid-list-xs>
				<router-view :key="$route.path" />
				<v-snackbar color="success" :value="userLogged" :timeout="3000" bottom>
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
	methods: {
		...mapMutations(['clearError']),
		...mapMutations('auth', ['setUser']),
		...mapActions(['auth/login'])
	},
	created() {
		if (sessionStorage.getItem('user')) {
			this.setUser(JSON.parse(sessionStorage.getItem('user')))
		}
	}
}
</script>

<style lang="scss">
.content {
	width: 100%;
	height: 100%;
	background: rgba(52, 60, 165, 0.664);
}
</style>
