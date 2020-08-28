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
	name: 'GameList',
	data: () => ({
	}),
	computed: {
		...mapGetters(['games'])
	},
	methods: {
		...mapActions(['getGames'])
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
