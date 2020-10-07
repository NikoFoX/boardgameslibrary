<template>
    <v-dialog v-model="dialog" max-width="350">
        <v-card>
            <v-card-title>Do you want to remove match?</v-card-title>
            <v-card-actions>
                <v-btn color="red" @click="remove()">Yes</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="hide()">No</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "RemoveMatchModal",
  data () {
    return {
      dialog: false,
      matchId: null
    }
  },
  methods: {
    ...mapActions(['removeMatch']),
    show () {
      this.dialog = true
    },
    hide () {
      this.dialog = false
      this.matchId = null
    },
    remove () {
      this.removeMatch(this.matchId)
      this.hide()
    }
  },
  mounted () {
    this.$root.$on('onRemoveMatch', (matchId) => {
      this.matchId = matchId
      this.show()
    })
  }
}
</script>

<style scoped>

</style>