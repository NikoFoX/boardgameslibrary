<template>
  <div>
    <v-alert elevation="10" class="text-center p-1" color="blue-grey lighten-3">
      <span>{{ game.title }}</span>
      <v-btn color="warning" class="float-right" small>
        <v-icon>far fa-edit</v-icon>
      </v-btn>
    </v-alert>

    <v-card class="mb-5">
      <v-card-text class="text-dark h1">
        <div>Played: {{ game.played }}</div>
        <div>Wins: {{ game.wins }}</div>
        <div>Loses: {{ game.loses }}</div>
      </v-card-text>
      <!-- <v-card-actions>
        <v-btn color="success" @click="openNewGameDialog()">
          <v-icon class="mr-3">fas fa-plus</v-icon>Add new game
        </v-btn>
      </v-card-actions>-->
    </v-card>
    <v-timeline :dense="['xs', 'sm'].includes($vuetify.breakpoint.name)">
      <v-timeline-item fillDot small>
        <template v-slot:icon>
          <v-btn small fab color="success" @click="openNewGameDialog()">
            <i class="fas fa-plus"></i>
          </v-btn>
        </template>
        <v-btn
          :block="['xs'].includes($vuetify.breakpoint.name)"
          color="success"
          @click="openNewGameDialog()"
        >Add new game</v-btn>
      </v-timeline-item>
      <v-timeline-item
        v-for="(match, index) in game.games"
        :key="match.id"
        icon="fas fa-dice"
        large
        fillDot
        color="blue-grey lighten-4"
        :id="'blue-grey-lighten-'+index"
        :icon-color="match.result === 'Won' ? 'success' : 'red'"
      >
        <v-card raised color="blue-grey lighten-4">
          <v-card-title class="py-1">
            <span class="h6">{{ match.played.split(' ')[0] }}</span>
          </v-card-title>
          <v-card-text class="text-dark">
            <v-row justify-space-between class="align-center">
              <v-col v-if="match.team.length > 0" cols="12" sm="4" class="py-1">
                <span>Team: {{ match.team.join(', ') }}</span>
              </v-col>
              <v-col cols="12" sm="4" class="text-center">
                <span>{{ match.points[0] }}</span>
                <v-btn rounded color="primary" x-small class="mx-3 mb-1">vs</v-btn>
                <span>{{ match.points[1] }}</span>
              </v-col>
              <v-col class="pt-0 pb-1">
                <span class="d-flex justify-end">{{ match.opponent.join(', ') }}</span>
              </v-col>
            </v-row>
            <div
              v-if="match.scenario"
              class="d-flex justify-end text-right"
            >Scenario: {{ match.scenario }}</div>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
export default {
  name: "GameDetails",
  props: ["id"],
  data: () => ({
    game: {
      id: 1,
      title: "Arkham Horror 3ed",
      played: 5,
      wins: 3,
      loses: 2,
      rating: "4.45",
      games: [
        {
          id: 10,
          played: "2020-04-12 13:28",
          name: "Arkham Horror 3ed",
          result: "Lost",
          points: [10, 20],
          team: ["Jacob"],
          opponent: ["Game"],
          scenario: "Revenge of Thal'Ak"
        },
        {
          id: 3,
          played: "2020-03-21 16:28",
          name: "Arkham Horror 3ed",
          result: "Lost",
          points: [],
          team: ["Kima", "Adam"],
          opponent: ["Game"],
          scenario: "Coming of Cthulu"
        },
        {
          id: 1,
          played: "2019-12-28 21:28",
          name: "Arkham Horror 3ed",
          result: "Won",
          points: [],
          team: ["Kima", "Radek"],
          opponent: ["Game"],
          scenario: "Dark times in Arkham"
        }
      ]
    }
  }),
  methods: {
    openNewGameDialog() {
      console.log("openNewGameDialog");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>