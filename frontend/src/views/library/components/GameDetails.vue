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
    <v-timeline :dense="['xs', 'sm'].includes($vuetify.breakpoint.name)">
      <v-timeline-item fillDot small>
        <template v-slot:icon></template>
        <v-btn
          :block="['xs'].includes($vuetify.breakpoint.name)"
          color="success"
          id="button-1"
        >Add new game</v-btn>
      </v-timeline-item>
      <v-timeline-item
        v-for="match in game.matches.slice().reverse()"
        :key="match.id"
        icon="fas fa-dice"
        large
        fillDot
        color="blue-grey lighten-4"
        :id="'blue-grey-lighten-' + match.id"
        :icon-color="match.result === MATCH_RESULTS.WIN ? 'success' : 'red'"
      >
        <MatchItem :match="match"></MatchItem>
      </v-timeline-item>
    </v-timeline>
    <EditMatchModal></EditMatchModal>
  </div>
  <div v-else class="d-flex justify-center align-center h-100">
    <v-progress-circular indeterminate color="white" size="100">
      <i class="fas fa-dice h1 text-white"></i>
    </v-progress-circular>
  </div>
</template>

<script>
import EditMatchModal from "./EditMatchModal"
import { mapActions, mapGetters } from "vuex"
import { MATCH_RESULTS } from "@/common/constants"
import MatchItem from "@/components/MatchItem"

export default {
  name: "GameDetails",
  components: {MatchItem, EditMatchModal },
  props: ["id"],
  data: () => ({
    MATCH_RESULTS: MATCH_RESULTS,
    dialog: false,
    // game: {
    // 	id: 1,
    // 	title: 'Arkham Horror 3ed',
    // 	played: 5,
    // 	wins: 3,
    // 	loses: 2,
    // 	draw: 1,
    // 	notFinished: 3,
    // 	rating: '4.45',
    // 	games: [
    // 		{
    // 			id: 10,
    // 			played: '2020-04-12 13:28',
    // 			name: 'Arkham Horror 3ed',
    // 			result: 'Lost',
    // 			points: [10, 20],
    // 			team: ['Jacob'],
    // 			opponent: ['Game'],
    // 			scenario: "Revenge of Thal'Ak"
    // 		},
    // 		{
    // 			id: 3,
    // 			played: '2020-03-21 16:28',
    // 			name: 'Arkham Horror 3ed',
    // 			result: 'Lost',
    // 			points: [],
    // 			team: ['Kima', 'Adam'],
    // 			opponent: ['Game'],
    // 			scenario: 'Coming of Cthulu'
    // 		},
    // 		{
    // 			id: 1,
    // 			played: '2019-12-28 21:28',
    // 			name: 'Arkham Horror 3ed',
    // 			result: 'Won',
    // 			points: [],
    // 			team: ['Kima', 'Radek'],
    // 			opponent: ['Game'],
    // 			scenario: 'Dark times in Arkham'
    // 		}
    // 	]
    // }
  }),
  computed: {
    ...mapGetters(["game"]),
  },
  methods: {
    ...mapActions(["getGame"]),
    openNewGameDialog() {
      console.log("openNewGameDialog");
    },
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
