<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>
      <v-spacer></v-spacer>
      <template v-if="user">
        <div>
          <span class="mr-2">Logged: User</span>
          <div>
            <a class="text-white" @click="logout()">Logout</a>
          </div>
        </div>
        <v-avatar color="red">USER</v-avatar>
      </template>
      <template v-else>
        <a class="text-white" @click="loginDialog = true">Log in</a>
      </template>
    </v-app-bar>

    <v-dialog
      v-model="loginDialog"
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    ></v-dialog>

    <v-content>
      <HelloWorld />
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    HelloWorld
  },

  data: () => ({
    drawer: true,
    loginDialog: false,
    user: false
  }),
  methods: {
    logout() {
      console.log("Will logout");
    },
    logIn() {
      console.log("Will login");
    }
  }
};
</script>
