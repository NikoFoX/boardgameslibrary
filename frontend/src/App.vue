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
        <v-dialog v-model="loginDialog" max-width="500px" hide-overlay>
          <template v-slot:activator="{ on }">
            <a class="text-white login" v-on="on">Log in</a>
          </template>
          <v-container grid-list-xs>
            <v-text-field
              prefix=" "
              placeholder="Login"
              autofocus
              prepend-inner-icon="fas fa-sign-in-alt"
              v-model="username"
              clearable
              light
            ></v-text-field>
            <v-text-field
              prepend-inner-icon="fas fa-lock"
              v-model="password"
              placeholder="Password"
              clearable
              light
            ></v-text-field>
            <v-btn block color="primary" dark>LOGIN</v-btn>
          </v-container>
        </v-dialog>
      </template>
    </v-app-bar>

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
    user: false,
    username: "",
    password: ""
  }),
  methods: {
    logout() {
      console.log("Will logout");
    },
    logIn() {
      console.log("Will login");
      console.log();
    }
  }
};
</script>

<style lang="scss">
.login {
  font-weight: bold;
  text-decoration: underline !important;
}
</style>