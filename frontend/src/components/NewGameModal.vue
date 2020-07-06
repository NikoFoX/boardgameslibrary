<template>
  <v-dialog v-model="newGameDialog" max-width="500px" fab-transition scrollable>
    <v-card>
      <v-card-title v-if="foundGame && chosenGame">
        <v-img height="200px" contain :src="foundGame.thumbnail" alt="Game" class="mb-3"></v-img>
        <div class="w-100 d-flex">
          <span>{{ chosenGame.name }}</span>
          <v-btn color="success" class="ml-auto" @click="_addGame()">Add to library</v-btn>
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <div class="p-3 bg-light">
        <v-form dark>
          <v-text-field
            label="Game title"
            clearable
            v-model="newGameTitle"
            @click:clear="clearSearch()"
          ></v-text-field>
        </v-form>
        <v-btn block color="primary" dark @click="_findGames()">Find game</v-btn>
      </div>
      <v-card-text>
        <v-list dense v-if="foundGames">
          <v-list-item-group v-model="chosenGame">
            <v-list-item
              v-for="(foundGame, index) in foundGames"
              :key="index"
              :value="foundGame"
            >{{ foundGame.name }}</v-list-item>
          </v-list-item-group>
        </v-list>
        <v-alert
          v-else-if="errors.foundGames"
          type="error"
          transition="scale-transition"
        >{{ errors.foundGames }}</v-alert>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "NewGameModal",
  data: () => {
    return {
      newGameTitle: "",
      newGameDialog: false,
      chosenGame: null
    };
  },
  watch: {
    chosenGame: function(newValue) {
      if (newValue) this.findGame(newValue.id);
    },
    newGameTitle: function(newValue) {
      this.clearErrors();
      this.CLEARFOUNDGAMES();
    }
  },
  computed: {
    ...mapGetters(["errors", "foundGames", "foundGame"])
  },
  methods: {
    ...mapActions(["addGame", "findGames", "findGame"]),
    ...mapMutations(["clearErrors", "CLEARFOUNDGAMES", "CLEARFOUNDGAME"]),
    _findGames() {
      if (this.newGameTitle !== null) this.findGames(this.newGameTitle);
    },
    _addGame() {
      const gameData = {
        title: this.newGameTitle,
        image: this.foundGame.image
      };
      this.addGame({
        gameData: gameData,
        onSuccess: () => {
          this.newGameDialog = false;
        }
      });
    },
    clearSearch() {
      this.CLEARFOUNDGAME();
      this.CLEARFOUNDGAMES();
    }
  },
  mounted() {
    this.$eventBus.$on("showNewGameModal", () => {
      this.chosenGame = null;
      this.newGameDialog = true;
      this.CLEARFOUNDGAMES();
      this.clearErrors();
    });
  }
};
</script>

<style lang="scss" scoped></style>
