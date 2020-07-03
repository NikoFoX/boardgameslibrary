<template>
	<v-card>
		<v-app-bar color="dark" dark>
			<v-app-bar-nav-icon
				color="primary"
				@click="drawer = true"
			></v-app-bar-nav-icon>
			<v-spacer></v-spacer>
			<router-link tag="span" :to="{ name: 'Home' }"
				>Board Games Library</router-link
			>
		</v-app-bar>
		<v-navigation-drawer
			v-if="userLogged"
			app
			dark
			disable-route-watcher
			class="p-1"
			v-model="drawer"
			ref="drawer"
		>
			<div class="text-center mb-3">
				<!-- <template v-if="drawerOpen()"> -->
				<v-card @click="goToAccount()">
					<v-card-text :class="!drawerOpen() ? 'p-2' : ''">
						<!-- <v-avatar color="red">{{ user.initials }}</v-avatar> -->
						<span v-if="drawerOpen()" class="text-light">
							{{ user.username }}
						</span>
					</v-card-text>
				</v-card>
				<!-- </template> -->
				<!-- <template v-else>
					<v-avatar color="red">{{ user.initials }}</v-avatar>
				</template> -->
			</div>
			<v-list dark elevation="10">
				<v-list-item-group>
					<v-list-item :to="{ name: 'Home' }">Recently played</v-list-item>
					<v-list-item :to="{ name: 'Library' }">Library</v-list-item>
					<v-list-item @click="newGameDialog = !newGameDialog"
						>Add new game</v-list-item
					>
					<v-dialog v-model="newGameDialog" max-width="500px" fab-transition>
						<div class="p-3 bg-light">
							<v-form dark>
								<v-text-field
									label="Game title"
									clearable
									v-model="newGameTitle"
								></v-text-field>
							</v-form>
							<v-btn block color="primary" dark @click="_addGame()"
								>Add game</v-btn
							>
						</div>
					</v-dialog>
				</v-list-item-group>
			</v-list>
			<!-- Footer -->
			<template v-slot:append>
				<v-btn block color="red" @click="logout()" dark>Logout</v-btn>
			</template>
		</v-navigation-drawer>
	</v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	name: 'MainMenu',
	data: () => ({
		drawer: false,
		newGameDialog: false,
		newGameTitle: ''
	}),
	computed: {
		...mapGetters(['user', 'errors', 'userLogged'])
	},
	methods: {
		...mapActions(['logout', 'addGame']),
		drawerOpen() {
			return this.$refs.drawer && !this.$refs.drawer.isMiniVariant
		},
		goToAccount() {
			this.$router.push({ name: 'Account' })
		},
		_addGame() {
			const gameData = {
				title: this.newGameTitle
			}
			this.addGame({
				gameData: gameData,
				onSuccess: () => {
					this.newGameDialog = false
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.title {
	font-size: 5px;
}
</style>
