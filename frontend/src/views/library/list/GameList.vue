<template>
  <v-container
    fluid
    grid-list-xs
  >
    <v-row>
      <template v-if="games.length === 0">
        <v-col>
          <div class="text-center">
            No games here yet :(
          </div>
        </v-col>
      </template>
      <template v-else>
        <v-col
          v-for="game in games"
          :key="game.id"
          cols="auto"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card
              class="game-card"
              color="transparent"
              :flat="!!game.image"
              :to="{ name: 'GameDetails', params: { id: game.id } }"
              hover
              @click="gameDetails()"
            >
              <div v-if="game.image">
                <v-img
                  :src="game.image"
                  height="200px"
                  max-width="275px"
                  contain
                />
                <v-overlay
                  v-if="hover"
                  absolute
                >
                  <span class="game-title">{{ game.title }}</span>
                </v-overlay>
              </div>
              <span
                v-else
                class="game-title"
              >{{ game.title }}</span>
            </v-card>
          </v-hover>
        </v-col>
      </template>
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
  mounted() {
		this.getGames()
	},
	methods: {
		...mapActions(['getGames'])
	},
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
