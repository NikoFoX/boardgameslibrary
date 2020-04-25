<template>
  <div>
    <v-card>
      <v-card-title primary-title>Recently played games</v-card-title>
      <v-expansion-panels popout>
        <v-expansion-panel v-for="(game, i) in gamesPlayed" :key="i">
          <v-expansion-panel-header>
            <span>
              <v-chip
                x-small
                :color="game.result === 'Won' ? 'success' : 'red darken-1'"
                text-color="primary"
              >{{ game.result }}</v-chip>
              {{ game.name }}
            </span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row no-gutters v-if="game.points.length > 0">
              <v-col class="text-center">{{ game.points[0] }} : {{ game.points[1] }}</v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
                <span v-if="game.team.length > 0">Team: {{ game.team.join(', ') }}</span>
              </v-col>
              <v-col>
                <span class="float-right">
                  <v-badge left color="primary" class="mr-5">
                    <span slot="badge">VS</span>
                  </v-badge>
                  {{ game.opponent.join(', ') }}
                </span>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    gamesPlayed: [
      {
        id: 1,
        name: "Pandemic Legacy",
        result: "Won",
        points: [],
        team: ["Kima"],
        opponent: ["Game"],
        scenario: "March"
      },
      {
        id: 2,
        name: "Neuroshima Hex",
        result: "Lost",
        points: [30, 20],
        team: [],
        opponent: ["Jacob"],
        scenario: ""
      },
      {
        id: 3,
        name: "Arkham Horror",
        result: "Lost",
        points: [],
        team: ["Kima", "Adam"],
        opponent: ["Game"],
        scenario: "Coming of Cthulu"
      }
    ]
  })
};
</script>

<style lang="scss" scoped>
</style>
