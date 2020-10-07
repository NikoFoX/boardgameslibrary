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
          :color="MATCH_RESULTS_COLORS.WIN"
        >Wins: {{ game.result_win }}</v-alert>
        <v-alert
          tile
          dense
          border="left"
          class="result-alert"
          dark
          :color="MATCH_RESULTS_COLORS.LOSS"
        >Loses: {{ game.result_loss }}</v-alert>
        <v-alert
          tile
          dense
          border="left"
          class="result-alert"
          dark
          :color="MATCH_RESULTS_COLORS.DRAW"
        >Draws: {{ game.result_draw }}</v-alert>
        <v-alert
          tile
          dark
          dense
          border="left"
          class="result-alert"
          :color="MATCH_RESULTS_COLORS.OTHER"
        >Other: {{ game.result_other }}</v-alert>
      </v-card-text>
    </v-card>
    <MatchList :matches="game.matches"></MatchList>
  </div>
  <div v-else class="d-flex justify-center align-center h-100">
    <v-progress-circular indeterminate color="white" size="100">
      <i class="fas fa-dice h1 text-white"></i>
    </v-progress-circular>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import { MATCH_RESULTS, MATCH_RESULTS_COLORS } from "@/common/constants"
import MatchList from "@/views/matches/list/components/MatchList"

export default {
  name: "GameDetails",
  components: { MatchList },
  props: ["id"],
  data: () => ({
    MATCH_RESULTS: MATCH_RESULTS,
    MATCH_RESULTS_COLORS: MATCH_RESULTS_COLORS
  }),
  computed: {
    ...mapGetters(["game"]),
  },
  methods: {
    ...mapActions(["getGame"])
  },
  created() {
    this.getGame(this.id)
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
