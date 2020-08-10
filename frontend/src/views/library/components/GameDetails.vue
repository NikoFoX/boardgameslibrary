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
        <div>Wins: {{ game.result_win }}</div>
        <div>Loses: {{ game.result_loss }}</div>
        <div>Draw: {{ game.result_draw }}</div>
        <div>Not finished: {{ game.result_other }}</div>
      </v-card-text>
    </v-card>
    <v-timeline :dense="['xs', 'sm'].includes($vuetify.breakpoint.name)">
      <v-timeline-item fillDot small>
        <template v-slot:icon>
          <v-btn small fab color="success" id="icon-1">
            <i class="fas fa-plus"></i>
          </v-btn>
        </template>
        <v-btn
          :block="['xs'].includes($vuetify.breakpoint.name)"
          color="success"
          id="button-1"
        >Add new game</v-btn>
      </v-timeline-item>
      <v-timeline-item
        v-for="(match, index) in game.matches"
        :key="match.id"
        icon="fas fa-dice"
        large
        fillDot
        color="blue-grey lighten-4"
        :id="'blue-grey-lighten-' + index"
        :icon-color="match.result === 'Won' ? 'success' : 'red'"
      >
        <v-card raised color="blue-grey lighten-4">
          <v-card-title class="py-1 pl-2 pr-2">
            <!-- <span class="h6">{{ match.played.split(' ')[0] }}</span> -->
            <span class="h6">{{ match.played.split('T')[0] }}</span>
            <v-chip class="ml-auto" small v-if="match.points">
              <i class="fas fa-star mr-2"></i>
              {{ match.points }}
            </v-chip>
          </v-card-title>
          <v-card-text class="text-dark">
            <v-row justify-space-between class="align-center">
              <v-col v-if="match.team.length > 0" cols="12" class="py-1">
                <span>Team: {{ match.team.join(', ') }}</span>
              </v-col>
              <v-col cols="12" class="text-center pt-0 pb-1">
                <v-chip color="primary" small>vs</v-chip>
              </v-col>
              <v-col
                cols="12"
                class="pt-0 pb-1 pl-2 pr-1 d-flex justify-end"
                v-for="(opponent, opponentIndex) in match.opponents"
                :key="opponentIndex"
              >
                <span>{{ opponent.team.join(', ') }}</span>
                <v-chip color="red" small class="ml-3 mb-1">
                  <i class="fas fa-star mr-2"></i>
                  {{ opponent.points }}
                </v-chip>
              </v-col>
              <v-col cols="12" v-if="match.scenario">Scenario: {{ match.scenario }}</v-col>
            </v-row>
          </v-card-text>
        </v-card>
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
import EditMatchModal from "./EditMatchModal";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "GameDetails",
  components: { EditMatchModal },
  props: ["id"],
  data: () => ({
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

<style lang="scss" scoped></style>
