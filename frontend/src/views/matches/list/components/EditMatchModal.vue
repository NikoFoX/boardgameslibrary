<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="dialog"
      dark
      persistent
      scrollable
      :fullscreen="$vuetify.breakpoint.smAndDown"
      max-width="700px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Add new match</span>
        </v-card-title>
        <v-btn-toggle mandatory v-model="form.result" tile class="w-100 justify-center">
          <v-btn
            :outlined="form.result !== MATCH_RESULTS.WIN"
            color="success"
            :value="MATCH_RESULTS.WIN"
          >Win</v-btn>
          <v-btn
            :outlined="form.result !== MATCH_RESULTS.LOSS"
            color="red"
            :value="MATCH_RESULTS.LOSS"
          >Loss</v-btn>
          <v-btn
            :outlined="form.result !== MATCH_RESULTS.DRAW"
            color="warning"
            :value="MATCH_RESULTS.DRAW"
          >Draw</v-btn>
          <v-btn
            :outlined="form.result !== MATCH_RESULTS.OTHER"
            color="info"
            :value="MATCH_RESULTS.OTHER"
          >Other</v-btn>
        </v-btn-toggle>
        <v-card-text class="mt-3">
          <v-row no-gutters>
            <v-col cols="12" md="6" class="mb-2">
              <v-checkbox label="Points" v-model="pointsMatch" hide-details></v-checkbox>
            </v-col>
            <v-col>
              <!-- TODO: Turn off html-like number controls for inc/dec numbers -->
              <v-text-field
                v-if="pointsMatch"
                type="number"
                v-model="form.points"
                prepend-icon="fas fa-minus-circle"
                @blur="form.points = adjustPoints(form.points)"
                @click:prepend="form.points = decreasePoints(form.points)"
                append-outer-icon="fas fa-plus-circle"
                @click:append-outer="form.points = increasePoints(form.points)"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="d-flex py-0 mb-2">
              <v-checkbox :label="!teamMatch ? 'Team' : ''" v-model="teamMatch" hide-details></v-checkbox>
              <v-combobox
                v-if="teamMatch"
                v-model="$v.form.team.$model"
                label="Team"
                chips
                hide-details
                deletable-chips
                multiple
                hide-selected
                :items="players"
                :error="$v.form.team.$error"
                @input="$v.form.team.$touch()"
                @blur="$v.form.team.$touch()"
              ></v-combobox>
            </v-col>
            <v-col cols="12" class="d-flex mb-3">
              <v-checkbox
                :label="!scenarioMatch ? 'Scenario' : ''"
                v-model="scenarioMatch"
                hide-details
              ></v-checkbox>
              <v-combobox
                v-if="scenarioMatch"
                label="Scenario"
                hide-details
                v-model="form.scenario"
                :items="scenarios"
              ></v-combobox>
            </v-col>
            <v-col cols="12">
              <v-row v-for="(opponent, index) in form.opponents" :key="index">
                <v-col>
                  <v-row>
                    <v-col>
                      <v-combobox
                        :label="'Opponent ' + (index + 1)"
                        chips
                        deletable-chips
                        multiple
                        hide-selected
                        hide-details
                        v-model="opponent.team"
                        :items="players"
                      ></v-combobox>
                    </v-col>
                    <v-col cols="12" md="6" v-if="pointsMatch && opponent.team.length > 0">
                      <v-text-field
                        :label="'Opponent ' + (index + 1) + ' points'"
                        type="number"
                        hide-details
                        v-model="opponent.points"
                        @blur="opponent.points = adjustPoints(opponent.points)"
                        prepend-icon="fas fa-minus-circle"
                        @click:prepend="
													opponent.points = decreasePoints(opponent.points)
												"
                        append-outer-icon="fas fa-plus-circle"
                        @click:append-outer="
													opponent.points = increasePoints(opponent.points)
												"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="2" class="d-flex align-center">
                  <v-btn color="error" rounded icon @click="removeOpponent(index)">
                    <span class="fas fa-times-circle h4 pt-2"></span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col>
              <v-btn color="primary" @click="addOpponent()">
                <span class="fas fa-plus mr-3"></span>Add opponent
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click.native="hide()">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.native="_saveMatch()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { MATCH_RESULTS } from "@/common/constants";
import Decimal from "decimal.js";
// import { validationMixin } from 'vuelidate'
import { required } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  name: "EditMatchModal",
  // mixins: [validationMixin],
  data: () => ({
    MATCH_RESULTS: MATCH_RESULTS,
    dialog: false,
    form: {
      result: "",
      team: [],
      opponents: [],
      points: "0.00",
      scenario: "",
    },
    teamMatch: false,
    pointsMatch: false,
    scenarioMatch: false,
    // Below are computed lists, which came as choosable options from backend
    players: ["Jacob", "Kima", "Adam"],
    scenarios: ["Revenge of Thal'Ak", "Coming of Cthulu"],
    game: null,
  }),
  validations() {
    return {
      form: {
        team: {
          ...this.validateTeam(),
        },
      },
    };
  },
  methods: {
    ...mapActions(["saveMatch"]),
    validateTeam() {
      let rules = [];
      if (this.teamMatch) rules.push(required);
      return rules;
    },
    validateOpponents() {
      let rules = [];
      if (this.form.opponents.some((opponent) => opponent.team.length === 0))
        rules.push(required);
      return rules;
    },
    hide() {
      this.dialog = false
    },
    addOrRemoveOpponents(event) {
      if (event) this.addOpponent();
      else this.form.opponents = [];
    },
    addOpponent() {
      this.form.opponents.push({ team: [], points: "0.00" });
    },
    removeOpponent(opponentIndex) {
      this.form.opponents.splice(opponentIndex, 1);
    },
    adjustPoints(points) {
      if (!points) points = "0";
      return new Decimal(points).toFixed(2);
    },
    increasePoints(points) {
      if (!points) points = 0;
      return new Decimal(points).add(1).toFixed(2);
    },
    decreasePoints(points) {
      if (!points) points = 0;
      return new Decimal(points).minus(1).toFixed(2);
    },
    _saveMatch() {
      // remove opponents from form if team empty
      this.form.opponents = this.form.opponents.filter(
        (opponent) => opponent.team.length !== 0
      );

      let form = { ...this.form };

      // remove opponents if no opponents added;
      if (form.opponents.length === 0) delete form.opponents;

      // clear points (of player and opponents) if pointsMatch = false; same with scenario; same with team
      if (!this.pointsMatch) {
        delete form.points;
        if (form.opponents) {
          form.opponents = form.opponents.map((opponent) => {
            delete opponent.points;
            return opponent;
          });
        }
      }
      if (!this.teamMatch) delete form.team;
      if (!this.scenarioMatch) delete form.scenario;
      this.$v.$touch()
      console.log(this.$v);
      if (this.$v.$invalid) {
        console.log("problem");
      } else {
        console.log("submit");
      }
      console.log(form);
      this.saveMatch(form);
      this.hide()
    },
  },
  mounted() {
    if (this.form.opponents.length >= 1) this.addOpponent();
    this.$root.$on('onEditMatch', (match) => {
      this.dialog = true
      if (match) this.form = {...match}
    })
  },
};
</script>

<style lang="scss" scoped></style>
