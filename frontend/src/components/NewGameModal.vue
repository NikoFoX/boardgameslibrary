<template>
  <v-dialog
    v-model="newGameDialog"
    :fullscreen="mobile"
    :max-width="mobile ? '' : '500px'"
    fab-transition
  >
    <v-card>
      <v-toolbar
        v-if="mobile"
        color="light"
        light
        max-height="50px"
        width="100%"
        flat
        dense
        tile
        class="p-0"
      >
        <v-toolbar-items class="ml-auto">
          <v-btn
            icon
            @click="newGameDialog = false"
          >
            <v-icon>fa fa-times</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-title v-if="foundGame && chosenGame">
        <v-img
          height="200px"
          contain
          :src="foundGame.thumbnail"
          alt="Game"
          class="mb-3"
        />
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              {{ chosenGame.name }}
            </v-col>
            <v-col>
              <v-btn
                color="success"
                block
                @click="_addGame()"
              >
                Add to library
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-title>
      <div class="p-3 bg-light w-100">
        <v-form
          dark
          @submit.prevent
        >
          <v-text-field
            v-model="newGameTitle"
            label="Game title"
            clearable
            @keydown.enter="_findGames()"
            @click:clear="clearSearch()"
          />
        </v-form>
        <v-alert
          v-if="errors.gameTitle"
          dense
          type="error"
          transition="scale-transition"
        >
          {{ errors.gameTitle }}
        </v-alert>
        <v-btn
          block
          color="primary"
          dark
          @click="_findGames()"
        >
          Find game
        </v-btn>
      </div>
      <v-card-text v-if="!chosenGame">
        <v-list
          v-if="foundGames.length > 0"
          dense
        >
          <v-list-item-group v-model="chosenGame">
            <v-list-item
              v-for="(foundGame, index) in foundGames"
              :key="index"
              :value="foundGame"
              :disabled="gameAlreadyInLibrary(foundGame)"
            >
              {{ foundGame.title }}
              <v-chip
                v-if="gameAlreadyInLibrary(foundGame)"
                color="success"
                small
                class="ml-3"
              >
                ALREADY IN LIBRARY
              </v-chip>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-alert
          v-else-if="errors.foundGames"
          dense
          type="error"
          transition="scale-transition"
        >
          {{ errors.foundGames }}
        </v-alert>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
	name: 'NewGameModal',
	data: () => {
		return {
			newGameTitle: '',
			newGameDialog: false,
			chosenGame: null
		}
	},
  computed: {
		...mapGetters(['errors', 'foundGames', 'foundGame', 'games']),
		mobile () {
			return !this.$vuetify.breakpoint.smAndUp
		}
	},
	watch: {
		newGameDialog: function(newValue) {
			if (!newValue) this.init()
		},
		chosenGame: function(newValue) {
			if (newValue) this.findGame(newValue.id)
		},
		newGameTitle: function() {
			this.clearErrors()
			this.clearFoundGames()
		}
	},
  mounted() {
		this.$eventBus.$on('showNewGameModal', () => {
			this.chosenGame = null
			this.newGameDialog = true
			this.clearFoundGames()
			this.clearErrors()
		})
	},
	methods: {
		...mapActions(['addGame', 'findGames', 'findGame']),
		...mapMutations(['clearErrors', 'clearFoundGames', 'clearFoundGame', 'setError']),
		init() {
			this.newGameTitle = ''
			this.chosenGame = null
			this.clearFoundGame()
			this.clearFoundGames()
			this.clearErrors()
		},
		_findGames() {
			this.chosenGame = null
			this.clearFoundGame()
			if (this.newGameTitle !== null && this.newGameTitle !== "") {
			  this.findGames(this.newGameTitle)
      } else {
        this.setError({gameTitle: "Please provide game title"})
      }
		},
		_addGame() {
			const gameData = {
				title: this.chosenGame.name,
				image: this.foundGame.image,
				external_id: this.chosenGame.id
			}
			this.addGame({
				gameData: gameData,
				onSuccess: () => {
					this.newGameDialog = false
				}
			})
		},
		clearSearch() {
			this.clearFoundGame()
			this.clearFoundGames()
		},
		gameAlreadyInLibrary(game) {
			return !!this.games.find(g => g.external_id === game.id)
		}
	},
}
</script>

<style lang="scss" scoped></style>
