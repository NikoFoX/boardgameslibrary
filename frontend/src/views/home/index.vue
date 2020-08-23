<template>
  <div v-if="loading" class="d-flex justify-center align-center h-100">
    <v-progress-circular indeterminate color="white" size="100">
      <i class="fas fa-dice h1 text-white"></i>
    </v-progress-circular>
  </div>
  <v-card v-else-if="!loading && matches.length > 0">
    <v-card-title primary-title>Recently played games</v-card-title>
    <v-expansion-panels popout>
      <v-expansion-panel v-for="(match, i) in matches" :key="i">
        <v-expansion-panel-header>
          <span>
            <v-chip
              x-small
              :color="match.result === MATCH_RESULTS.WIN ? 'success' : 'red darken-1'"
              text-color="primary"
            >?</v-chip>
            {{ match.name }}
          </span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row no-gutters v-if="match.points">
            <v-col class="text-center">{{ match.points }} : {{ match.points }}</v-col>
          </v-row>
          <v-row no-gutters>
            <v-col v-if="match.team.length > 0">
              <span>Team: {{ match.team.join(', ') }}</span>
            </v-col>
            <v-col v-if="match.opponents.length > 0">
              <span class="float-right">
                <v-badge left color="primary" class="mr-5">
                  <span slot="badge">VS</span>
                </v-badge>
              </span>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
  <div v-else class="w-100 h-100">
    <span class="noMatchesPlayedInfo">No matches here yet :(</span>
  </div>
</template>

<script>
import { MATCH_RESULTS } from "@/common/constants";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  data: () => ({
    MATCH_RESULTS: MATCH_RESULTS,
    loading: true,
    // gamesPlayed: [
    //   {
    //     id: 1,
    //     played: "2020-04-04 13:28",
    //     name: "Pandemic Legacy",
    //     result: "Won",
    //     points: [],
    //     team: ["Kima"],
    //     opponent: ["Game"],
    //     scenario: "March",
    //   },
    //   {
    //     id: 2,
    //     played: "2020-04-11 13:28",
    //     name: "Neuroshima Hex",
    //     result: "Lost",
    //     points: [30, 20],
    //     team: [],
    //     opponent: ["Jacob"],
    //     scenario: "",
    //   },
    //   {
    //     id: 3,
    //     played: "2020-04-12 13:28",
    //     name: "Arkham Horror",
    //     result: "Lost",
    //     points: [],
    //     team: ["Kima", "Adam"],
    //     opponent: ["Game"],
    //     scenario: "Coming of Cthulu",
    //   },
    // ],
  }),
  computed: {
    ...mapGetters(["matches"]),
  },
  methods: {
    ...mapActions(["getMatches"]),
  },
  mounted() {
    this.getMatches({
      onSuccess: () => {
        this.loading = false;
      },
      onError: () => {
        this.loading = false;
      },
    });
  },
};
</script>

<style lang="scss" scoped>
.noMatchesPlayedInfo {
  font-size: 25px;
  height: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>