<template>
    <v-card elevation="15" :flat="!isGameDetails" :color="isGameDetails ? 'blue-grey lighten-4' : ''">
      <v-card-title v-if="match.gameTitle" class="py-1 pl-2 pr-2">
        {{ match.gameTitle.title }}
      </v-card-title>
      <v-card-text class="text-dark">
        <v-row>
        <!-- <span class="h6">{{ match.played.split(' ')[0] }}</span> -->
        <span class="h6">{{ match.played.split('T')[0] }}</span>
        <v-chip color="warning" class="ml-auto text-dark" small v-if="match.points">
          <i class="fas fa-star mr-2"></i>
          <span class="mr-2">{{ match.points }}</span>
        </v-chip>
        </v-row>
        <v-row justify-space-between class="align-center">
          <v-col v-if="match.team.length > 0" cols="12" class="py-1">
            <span>Team: {{ match.team.join(', ') }}</span>
          </v-col>
          <v-col v-if="match.opponents.length > 0" cols="12" class="text-center pt-0 pb-1">
            <v-chip color="primary" small class="versus-chip">vs</v-chip>
          </v-col>
          <v-col
            cols="12"
            class="pt-0 pb-1 pl-2 pr-1 d-flex justify-end"
            v-for="(opponent, opponentIndex) in match.opponents"
            :key="opponentIndex"
          >
            <span>{{ opponent.team.join(', ') }}</span>
            <v-chip v-if="opponent.points" color="red" small class="ml-3 mb-1 overflow-visible">
              <i class="fas fa-star mr-2"></i>
              <span class="mr-2">{{ opponent.points }}</span>
            </v-chip>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <span style="font-size: 0.875em" v-if="match.scenario">Scenario: {{ match.scenario }}</span>
      </v-card-actions>
    </v-card>
</template>

<script>
  export default {
    name: 'MatchItem',
    props: [ 'match' ],
    computed: {
      isGameDetails () {
        return this.$route.name === 'GameDetails'
      }
    }
  }
</script>

<style scoped>

</style>