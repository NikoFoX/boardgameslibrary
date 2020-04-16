<template>
  <v-navigation-drawer
    v-if="userLogged"
    app
    dark
    permanent
    mini-variant-width="100"
    mini-variant
    expand-on-hover
    disable-route-watcher
    class="p-1"
    v-model="drawer"
    ref="drawer"
  >
    <div class="red mb-3">
      Board
      Games
      Library
    </div>
    <div class="text-center mb-3">
      <template v-if="drawerOpen()">
        <v-card @click="goToAccount()">
          <v-card-text :class="!drawerOpen() ? 'p-2' : ''">
            <v-avatar color="red">{{ user.initials }}</v-avatar>
            <span v-if="drawerOpen()" class="text-light ml-2">{{ user.name + ' ' + user.lastName }}</span>
          </v-card-text>
        </v-card>
      </template>
      <template v-else>
        <v-avatar color="red">{{ user.initials }}</v-avatar>
      </template>
    </div>

    <v-btn block color="success">text</v-btn>
    <template v-slot:append>
      <v-btn block color="red" @click="logout()" dark>Logout</v-btn>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MainMenu",
  data: () => ({
    drawer: false
  }),
  computed: {
    ...mapGetters(["user", "errors", "userLogged"])
  },
  methods: {
    ...mapActions(["logout"]),
    drawerOpen() {
      return this.$refs.drawer && !this.$refs.drawer.isMiniVariant;
    },
    goToAccount() {
      this.$router.push({ name: "Account" });
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 5px;
}
</style>
