<template>
  <v-card>
    <v-app-bar color="dark" dark>
      <v-app-bar-nav-icon color="primary" @click="drawer = true"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <router-link tag="span" :to="{ name: 'Matches' }">Board Games Library</router-link>
    </v-app-bar>
    <v-navigation-drawer
      v-if="userLogged"
      app
      dark
      disable-route-watcher
      class="p-1"
      v-model="drawer"
      ref="drawer"
    >
      <div class="text-center mb-3">
        <!-- <template v-if="drawerOpen()"> -->
        <v-card @click="goToAccount()">
          <v-card-text :class="!drawerOpen() ? 'p-2' : ''">
            <!-- <v-avatar color="red">{{ user.initials }}</v-avatar> -->
            <span v-if="drawerOpen()" class="text-light">{{ user.username }}</span>
          </v-card-text>
        </v-card>
      </div>
      <v-list dark elevation="10">
        <v-list-item-group>
          <v-list-item :to="{ name: 'Matches' }">Matches</v-list-item>
          <v-list-item :to="{ name: 'Library' }">Library</v-list-item>
          <v-list-item @click="showNewGameModal()">Add new game</v-list-item>
        </v-list-item-group>
      </v-list>
      <!-- Footer -->
      <template v-slot:append>
        <v-btn block color="red" @click="logout()" dark>Logout</v-btn>
      </template>
    </v-navigation-drawer>
    <new-game-modal></new-game-modal>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import newGameModal from "@/components/NewGameModal";
export default {
  name: "MainMenu",
  components: { newGameModal },
  data: () => ({
    drawer: false,
    newGameDialog: false,
    newGameTitle: "",
  }),
  computed: {
    ...mapGetters(["errors"]),
    ...mapGetters('auth', ['userLogged', 'user'])
  },
  methods: {
    ...mapActions(["addGame"]),
    ...mapActions('auth', ['logout']),
    drawerOpen() {
      return this.$refs.drawer && !this.$refs.drawer.isMiniVariant;
    },
    goToAccount() {
      this.$router.push({ name: "Account" });
    },
    showNewGameModal() {
      this.drawer = false;
      this.$router.push({ name: "Library" });
      this.$eventBus.$emit("showNewGameModal");
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 5px;
}
</style>
