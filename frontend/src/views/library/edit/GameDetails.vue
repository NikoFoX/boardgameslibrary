<template>
  <div v-if="game">
    <v-alert elevation="10" class="text-center p-1" color="blue-grey lighten-3">
      <span class="h4">{{ game.title }}</span>
      <!-- <v-btn color="warning" class="float-right" small>
        <v-icon>far fa-edit</v-icon>
      </v-btn>-->
    </v-alert>
    <v-card class="mb-5">
      <v-card-text class="text-dark h1">
        <div>Total matches: {{ game.played }}</div>
        <v-alert
          tile
          dense
          border="left"
          class="result-alert"
          color="success"
        >Wins: {{ game.result_win }}</v-alert>
        <v-alert
          tile
          dense
          border="left"
          class="result-alert"
          dark
          color="red"
        >Loses: {{ game.result_loss }}</v-alert>
        <v-alert
          tile
          dense
          border="left"
          class="result-alert"
          dark
          color="grey darken-1"
        >Draws: {{ game.result_draw }}</v-alert>
        <v-alert
          tile
          dense
          border="left"
          class="result-alert"
          color="white"
        >Other: {{ game.result_other }}</v-alert>
      </v-card-text>
    </v-card>
    <MatchList :matches="game.matches"></MatchList>
    <EditMatchModal></EditMatchModal>
  </div>
  <div v-else class="d-flex justify-center align-center h-100">
    <v-progress-circular indeterminate color="white" size="100">
      <i class="fas fa-dice h1 text-white"></i>
    </v-progress-circular>
  </div>
</template>

<script>
import EditMatchModal from "./components/EditMatchModal"
import { mapActions, mapGetters } from "vuex"
import { MATCH_RESULTS } from "@/common/constants"
import MatchList from "@/views/home/MatchList"

export default {
  name: "GameDetails",
  components: { MatchList, EditMatchModal },
  props: ["id"],
  data: () => ({
    MATCH_RESULTS: MATCH_RESULTS
  }),
  computed: {
    ...mapGetters(["game"]),
  },
  methods: {
    ...mapActions(["getGame"]),
    editMatch (match) {
      this.$root.$emit('onEditMatch', match)
    }
  },
  created() {
    this.getGame(this.id);
  },
};
</script>

<style lang="scss" scoped>
.versus-chip {
  display: inline-block;
  width: 20%;
}
.result-alert {
  margin-bottom: 0;
  width: 100px;
}
</style>
