<template>
  <div class="login">
    <v-card raised class="login-card">
      <v-alert
        v-if="errors.loginError"
        type="error"
        transition="scale-transition"
      >{{ errors.loginError }}</v-alert>
      <v-alert
        v-if="errors.loginConnectionError"
        type="error"
        transition="scale-transition"
      >{{ errors.loginConnectionError }}</v-alert>
      <v-text-field
        @input="CLEARERROR('loginError')"
        prefix=" "
        placeholder="Login"
        autofocus
        prepend-inner-icon="fas fa-sign-in-alt"
        v-model="username"
        clearable
        light
      ></v-text-field>
      <v-text-field
        @input="CLEARERROR('loginError')"
        type="password"
        prefix=" "
        prepend-inner-icon="fas fa-lock"
        v-model="password"
        placeholder="Password"
        clearable
        light
      ></v-text-field>
      <v-btn block color="primary" dark @click="_login()">LOGIN</v-btn>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "Login",
  data: () => ({
    username: "",
    password: ""
  }),
  computed: {
    ...mapGetters(["user", "errors"])
  },
  methods: {
    ...mapMutations(["CLEARERROR"]),
    ...mapActions(["login"]),
    _login() {
      let loginData = {
        username: this.username,
        password: this.password
      };
      this.login({
        loginData: loginData,
        onSuccess: () => {
          this.loginDialog = false;
          this.$router.push({ name: "Library" });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;

  &-card {
    margin-top: 30px;
    width: 100%;
    max-width: 400px;
    padding: 10px;
  }
}
</style>
