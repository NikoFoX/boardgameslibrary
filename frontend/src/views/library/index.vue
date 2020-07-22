<template>
	<v-container fluid grid-list-xs>
		<v-row>
			<v-col v-for="game in games" :key="game.id" cols="auto">
				<v-hover v-slot:default="{ hover }">
					<v-card
						class="game-card"
						@click="gameDetails()"
						color="transparent"
						:flat="!!game.image"
						:to="{ name: 'GameDetails', params: { id: game.id } }"
						hover
					>
						<div v-if="game.image">
							<v-img
								:src="game.image"
								height="200px"
								max-width="275px"
								contain
							></v-img>
							<v-overlay absolute v-if="hover">
								<span class="game-title">{{ game.title }}</span>
							</v-overlay>
						</div>
						<span v-else class="game-title">{{ game.title }}</span>
					</v-card>
				</v-hover>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	name: 'Library',
	data: () => ({
		// library: [
		// 	{
		// 		id: 1,
		// 		name: 'Pandemic',
		// 		bggLink: 'https://boardgamegeek.com/boardgame/30549/pandemic'
		// 	},
		// 	{
		// 		id: 2,
		// 		name: 'Arkham Horror 3rd Ed',
		// 		cover:
		// 			'https://cf.geekdo-images.com/imagepage/img/KnbBZ6ioy7OfhM7d0ZsQMm11tII=/fit-in/900x600/filters:no_upscale()/pic4582151.jpg',
		// 		bggLink:
		// 			'https://boardgamegeek.com/boardgame/257499/arkham-horror-third-edition'
		// 	},
		// 	{
		// 		id: 3,
		// 		name: 'Pandemic Legacy',
		// 		cover:
		// 			'https://cf.geekdo-images.com/imagepage/img/vuhGm0iS67iW8Z1019HsPmijRUU=/fit-in/900x600/filters:no_upscale()/pic2452831.png',
		// 		bggLink:
		// 			'https://boardgamegeek.com/boardgame/161936/pandemic-legacy-season-1'
		// 	},
		// 	{
		// 		id: 4,
		// 		name: 'Neuroshima Hex 3.0',
		// 		cover:
		// 			'https://cf.geekdo-images.com/imagepage/img/yzaaayLuV4qUbO3M22T31gXiyYQ=/fit-in/900x600/filters:no_upscale()/pic1844819.jpg',
		// 		bggLink: 'https://boardgamegeek.com/boardgame/21241/neuroshima-hex-30'
		// 	}
		// ]
	}),
	computed: {
		...mapGetters(['games'])
	},
	methods: {
		...mapActions(['getGames']),
		gameDetails() {
			console.log('game details')
		}
	},
	mounted() {
		this.getGames()
	}
}
</script>

<style lang="scss" scoped>
.game {
	&-card {
		text-align: center;
		display: flex;
		height: 100%;
		align-items: center;
		word-break: normal;
		line-height: normal;
	}
	&-img {
	}
	&-title {
		font-weight: bold;
		padding: 5px;
		font-size: 2.3vmax;
		word-break: normal;
		line-height: normal;
	}
}
</style>
