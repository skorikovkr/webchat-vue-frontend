<template>
  <form class="auth-form">
    <p v-bind:class="{error: error != null}">{{ error }}</p>
    <label for="username">Username:</label>
    <input id="username" v-model="username" required placeholder="Username"/>
    <label for="password">Password:</label>
    <input id="password" type="password" v-model="password" required placeholder="Password"/>
    <label for="password">Confirm password:</label>
    <input id="passwordConfirm" type="password" v-model="confirmPassword" required placeholder="Confirm password"/>
    <button type="submit" v-on:click.prevent="onsubmit">SignIn</button>
  </form>
</template>

<script>
import AuthService from "@/services/AuthService";
import config from "../../config";

export default {
  name: "Registration",
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      error: null
    }
  },
  methods: {
    onsubmit() {
      const service = new AuthService();
      if (this.username === "" || this.password === "" || this.confirmPassword === "") {
        this.error = "Both username and password should be filled.";
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.error = "Password mismatch. Please try again."
        return;
      }
      service.register(this.username, this.password)
          .then(res => {
            if (res.success) {
              this.error = null;
              service.signIn(this.username, this.password)
                  .then(res => {
                    if (res.success) {
                      this.$emit('updated-localstorage');
                      window.location.href = "/chats";
                    } else {
                      this.error = "Error with signing you in. Please try to Sign in again.";
                    }
                  });
            } else {
              this.error = res.data;
            }
          })
    }
  },
  mounted() {
    if (localStorage.getItem(config.ACCESS_TOKEN_KEY)) {
      window.location.href = "chats";
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}

.auth-form {
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 20px;
}

.auth-form input {
  margin-bottom: 10px;
  border-radius: 5px;
  width: 200px;
  height: 1.2rem;
}

.auth-form button {
  width: 80px;
  height: 30px;
  border: #7026b4 solid 2px;
  border-radius: 10px;
  background: #f9fbff;
  font-size: 1rem;
}
</style>