<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <router-link to="/">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </router-link>
    </div>
    <v-spacer></v-spacer>
    <span class="title">Board Game Library</span>
    <v-spacer></v-spacer>
    <template v-if="userLogged">
      <div>
        <span class="mr-2">
          <router-link
            class="text-light"
            :to="{ name: 'Account' }"
          >Logged: {{ user.name + ' ' + user.lastName }}</router-link>
        </span>

        <div>
          <a class="text-white" @click="logout()">Logout</a>
        </div>
      </div>
      <v-avatar color="red">{{ user.initials }}</v-avatar>
    </template>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MainMenu",
  data: () => ({}),
  computed: {
    ...mapGetters(["user", "errors", "userLogged"])
  },
  methods: {
    ...mapActions(["logout"])
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 5px;
}
</style>
