<template>
  <div v-if="!matches" class="d-flex justify-center align-center h-100">
    <v-progress-circular indeterminate color="white" size="100">
      <i class="fas fa-dice h1 text-white"></i>
    </v-progress-circular>
  </div>
  <div v-else>
    <v-timeline :dense="['xs', 'sm'].includes($vuetify.breakpoint.name)">
      <v-timeline-item fillDot small v-if="!isAllGamesMatches">
        <template v-slot:icon></template>
        <v-btn
          :block="['xs'].includes($vuetify.breakpoint.name)"
          color="success"
          id="button-1"
          @click="addMatch()"
        ><i class="fas fa-plus mr-3" />Add new match</v-btn>
      </v-timeline-item>
      <v-timeline-item
        v-for="(match, matchIndex) in matches.slice().reverse()"
        :key="match.id"
        :id="'blue-grey-lighten-' + match.id"
      >
        <template v-slot:icon>
          <v-speed-dial fab elevation="15" transition="slide-x-reverse-transition"
                        :open-on-hover="$vuetify.breakpoint.mdAndUp"
                        :direction="timelineItemButtonHoverDirection(matchIndex)">
            <template v-slot:activator>
              <v-btn fab>
                <v-icon :color="getMatchResultColor(match.result)" large class="fas fa-dice"></v-icon>
              </v-btn>
            </template>
            <v-btn fab color="warning" @click="editMatch(match)"
                   :class="$vuetify.breakpoint.smAndDown ? 'ml-10' : ''">
              <v-icon>fas fa-edit</v-icon>
            </v-btn>
            <v-btn fab color="red" @click="removeMatch(match)">
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
    <RemoveMatchModal></RemoveMatchModal>
    <EditMatchModal></EditMatchModal>
  </div>
</template>

<script>
import { MATCH_RESULTS, MATCH_RESULTS_COLORS } from "@/common/constants";
import { mapActions, mapGetters } from "vuex";
import MatchItem from "./MatchItem";
import RemoveMatchModal from "./RemoveMatchModal";
import EditMatchModal from './EditMatchModal'
export default {
  name: "Home",
  props: ['matches'],
  components: {RemoveMatchModal, EditMatchModal, MatchItem},
  data: () => ({
    MATCH_RESULTS: MATCH_RESULTS,
    loading: true
  }),
  computed: {
    ...mapGetters(["game"]),
    isAllGamesMatches () {
      return this.$route.name === 'Matches'
    }
  },
  methods: {
    addMatch () {
      this.$root.$emit('onEditMatch', null)
    },
    editMatch (match) {
      this.$root.$emit('onEditMatch', match)
    },
    removeMatch (match) {
      this.$root.$emit('onRemoveMatch', match.id)
    },
    getMatchResultColor (result) {
      return Object.values(MATCH_RESULTS_COLORS)[result]
    },
    timelineItemButtonHoverDirection (matchIndex) {
      // resolve direction of hovering buttons (prevents showing buttons over match card)
      return this.$vuetify.breakpoint.smAndDown ? 'right' :
              matchIndex%2 === (this.isAllGamesMatches ? 1 : 0) ? 'right' : 'left'
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