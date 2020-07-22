<template>
	<v-app>
		<MainMenu />
		<v-content>
			<v-container fluid class="content" grid-list-xs>
				<router-view :key="$route.path" />
				<v-snackbar color="success" :value="userLogged" :timeout="3000" bottom>
					<span class>Succesfully logged in</span>
				</v-snackbar>
			</v-container>
		</v-content>
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
		...mapGetters(['errors', 'user', 'userLogged'])
	},
	methods: {
		...mapMutations(['clearError', 'setUser']),
		...mapActions(['login'])
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
