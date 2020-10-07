<template>
    <MatchList :matches="matches"></MatchList>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import MatchList from './components/MatchList'

export default {
  name: 'Matches',
  components: { MatchList },
  computed: {
    ...mapGetters(['matches']),
  },
  methods: {
    ...mapActions(["getMatches"]),
  },
  mounted () {
    this.getMatches()
  }
}
</script>

<style scoped>

</style>