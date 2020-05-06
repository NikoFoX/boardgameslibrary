<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="500px" activator="#icon-1, #button-1">
      <v-card>
        <v-card-title>
          <span class="headline">Add new match</span>
        </v-card-title>
        <v-btn-toggle mandatory v-model="result" tile class="w-100 justify-center">
          <v-btn color="success">Win</v-btn>
          <v-btn color="red">Loss</v-btn>
          <v-btn color="warning">Draw</v-btn>
          <v-btn color="info">Other</v-btn>
        </v-btn-toggle>
        <v-card-text class="mt-3">
          <v-row no-gutters>
            <v-col cols="12" md="6">
              <v-checkbox label="Points" v-model="pointsMatch" hide-details></v-checkbox>
            </v-col>
            <v-col>
              <!-- TODO: Turn off html-like number controls for inc/dec numbers -->
              <v-text-field
                v-if="pointsMatch"
                filled
                type="number"
                v-model="points"
                prepend-inner-icon="fas fa-minus-circle"
                @click:prepend-inner="points -= 1"
                append-icon="fas fa-plus-circle"
                @click:append="points += 1"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="d-flex py-0">
              <v-checkbox :label="!teamMatch ? 'Team' : ''" v-model="teamMatch" hide-details></v-checkbox>
              <v-combobox
                v-if="teamMatch"
                v-model="team"
                label="Team"
                chips
                hide-details
                filled
                deletable-chips
                multiple
                hide-selected
                :items="players"
              ></v-combobox>
            </v-col>
            <v-col cols="12" class="d-flex py-0">
              <v-switch
                label="Opponents"
                hide-details
                v-model="opponentsMatch"
                @change="opponents=[]; addOrRemoveOpponents($event)"
              ></v-switch>
            </v-col>
            <v-col v-if="opponentsMatch">
              <v-row v-for="(opponent, index) in opponents" :key="index">
                <v-col>
                  <v-combobox
                    :label="opponents.length !== (index+1) ? 'Opponent '+(index+1) : 'Next opponent'"
                    chips
                    deletable-chips
                    multiple
                    filled
                    hide-selected
                    hide-details
                    v-model="opponent.team"
                    @change="addOrRemoveOpponentField($event, index)"
                    :items="players"
                  ></v-combobox>
                </v-col>
                <v-col cols="12" md="6" v-if="pointsMatch && opponent.team.length > 0">
                  <v-text-field
                    :label="'Opponent '+(index+1)+' points'"
                    filled
                    type="number"
                    hide-details
                    v-model="opponent.points"
                    prepend-inner-icon="fas fa-minus-circle"
                    @click:prepend-inner="opponent.points -= 1"
                    append-icon="fas fa-plus-circle"
                    @click:append="opponent.points = parseFloat(opponent.points) + 1"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="d-flex">
              <v-checkbox
                :label="!scenarioMatch ? 'Scenario' : ''"
                v-model="scenarioMatch"
                hide-details
              ></v-checkbox>
              <v-combobox
                v-if="scenarioMatch"
                label="Scenario"
                hide-details
                filled
                v-model="scenario"
                :items="scenarios"
              ></v-combobox>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click.native="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "EditMatchModal",
  data: () => ({
    dialog: false,
    teamMatch: false,
    team: [],
    opponentsMatch: true,
    opponents: [{ team: ["Jacob", "Kima"], points: "0" }],
    result: false,
    points: 0,
    pointsMatch: false,
    scenarioMatch: false,
    // Below are computed lists, which came as choosable options from backend
    players: ["Jacob", "Kima", "Adam"],
    scenarios: ["Revenge of Thal'Ak", "Coming of Cthulu"],
    game: null
  }),
  methods: {
    addOrRemoveOpponents(event) {
      if (event) this.addOpponent();
      else this.opponents = [];
    },
    addOrRemoveOpponentField(event, opponentIndex) {
      // add new opponent field if event-added field value has any value (opponent team has players)
      // and also if last item of opponents team is empty (team has no players)
      // otherwise will remove just cleared combo
      if (event.length > 0) {
        if (this.opponents.slice(-1)[0].team.length !== 0) this.addOpponent();
      } else {
        this.opponents.splice(opponentIndex, 1);
      }
    },
    addOpponent() {
      this.opponents.push({ team: [], points: "0" });
    },
    addMatch() {
      // clear points (of player and opponents) if pointsMatch = false; same with scenario
      // remove last opponents team if more than 0 (last item is empty)
      // remove last opponents team if team length === 0 (no players added)
    }
  },
  mounted() {
    if (this.opponents.length >= 1) this.addOpponent();
  }
};
</script>

<style lang="scss" scoped>
</style>