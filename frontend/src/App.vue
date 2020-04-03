<template>
	<v-app>
		<MainMenu />
		<v-content class="">
			<v-container fluid class="content" grid-list-xs>
				<router-view :key="$route.path" />
				<v-snackbar color="success" :value="!!user" :timeout="3000" bottom>
					<span class="">Succesfully logged in</span>
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
	data: () => ({
		drawer: true
	}),
	computed: {
		...mapGetters(['errors', 'user'])
	},
	methods: {
		...mapMutations(['CLEARERROR', 'SETUSER']),
		...mapActions(['login'])
	},
	created() {
		if (sessionStorage.getItem('user')) {
			this.SETUSER(JSON.parse(sessionStorage.getItem('user')))
		}
	}
}
</script>

<style lang="scss">
.content {
	width: 100%;
	height: 100%;
	background: rgb(127, 214, 185);
}
</style>
