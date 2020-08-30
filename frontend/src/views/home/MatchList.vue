<template>
  <div v-if="loading" class="d-flex justify-center align-center h-100">
    <v-progress-circular indeterminate color="white" size="100">
      <i class="fas fa-dice h1 text-white"></i>
    </v-progress-circular>
  </div>
  <div v-else-if="!loading && matches.length > 0">
    <v-timeline :dense="['xs', 'sm'].includes($vuetify.breakpoint.name)">
      <v-timeline-item fillDot small>
        <template v-slot:icon></template>
        <v-btn
          :block="['xs'].includes($vuetify.breakpoint.name)"
          color="success"
          id="button-1"
        ><i class="fas fa-plus mr-3" />Add new match</v-btn>
      </v-timeline-item>
      <v-timeline-item
        v-for="(match, matchIndex) in matchList.slice().reverse()"
        :key="match.id"
        :id="'blue-grey-lighten-' + match.id"
      >
        <template v-slot:icon>
          <v-speed-dial fab elevation="15" transition="slide-x-reverse-transition"
                        :open-on-hover="$vuetify.breakpoint.mdAndUp"
                        :direction="$vuetify.breakpoint.smAndDown ? 'right' : matchIndex%2 === 0 ? 'right' : 'left'">
            <template v-slot:activator>
              <v-btn fab>
                <v-icon :color="match.result === MATCH_RESULTS.WIN ? 'success' : 'red'" large class="fas fa-dice"></v-icon>
              </v-btn>
            </template>
            <v-btn fab color="warning" @click="editMatch(match)"
                   :class="$vuetify.breakpoint.smAndDown ? 'ml-10' : ''">
              <v-icon>fas fa-edit</v-icon>
            </v-btn>
            <v-btn fab color="red">
              <v-icon>fas fa-times</v-icon>
            </v-btn>
          </v-speed-dial>
        </template>
        <MatchItem :match="match"></MatchItem>
      </v-timeline-item>
    </v-timeline>
<!--    <v-expansion-panels popout>-->
<!--      <v-expansion-panel v-for="(match, i) in matches" :key="i">-->
<!--        <v-expansion-panel-header>-->
<!--          <span>-->
<!--            <v-chip-->
<!--              x-small-->
<!--              :color="match.result === MATCH_RESULTS.WIN ? 'success' : 'red darken-1'"-->
<!--              text-color="primary"-->
<!--            >?</v-chip>-->
<!--            {{ match.gameTitle.title }}-->
<!--          </span>-->
<!--        </v-expansion-panel-header>-->
<!--        <v-expansion-panel-content>-->
<!--          <MatchItem :match="match"></MatchItem>-->
<!--        </v-expansion-panel-content>-->
<!--      </v-expansion-panel>-->
<!--    </v-expansion-panels>-->
  </div>
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
  props: [ 'gameMatches' ],
  data: () => ({
    MATCH_RESULTS: MATCH_RESULTS,
    loading: true
  }),
  computed: {
    ...mapGetters(["matches"]),
    matchList () {
      return this.gameMatches || this.matches
    }
  },
  methods: {
    ...mapActions(["getMatches"])
  },
  mounted() {
    if (!this.gameMatches) {
      this.getMatches({
        onSuccess: () => {
          this.loading = false;
        },
        onError: () => {
          this.loading = false;
        },
      })
    }
  }
}
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