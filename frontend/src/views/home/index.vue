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
            {{ match.gameTitle.title }}
          </span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <MatchItem :match="match"></MatchItem>
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
import MatchItem from "@/components/MatchItem";
export default {
  name: "Home",
  components: {MatchItem},
  data: () => ({
    MATCH_RESULTS: MATCH_RESULTS,
    loading: true
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