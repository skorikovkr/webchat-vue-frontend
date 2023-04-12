<template>
  <div class="container">
    <header class="header">
      <div class="hosting">Hosted by <a href="https://somee.com/default.aspx">somee.com</a>!</div>
      <ul class="header-links">
        <li><router-link to="/" class="header-link">WebChat</router-link></li>
        <li><router-link to="/chats" class="header-link">Chats</router-link></li>
        <li><router-link to="/friends" class="header-link">Friends</router-link></li>
        <li><router-link to="/signin" class="header-link" v-bind:class="{invisible: !authorized}">Sign In</router-link></li>
        <li><a href="#" v-on:click="onSignOut" class="header-link" v-bind:class="{invisible: authorized}">Sign out</a></li>
        <li>
          <router-link
              to="/registration"
              class="header-link"
              v-bind:class="{invisible: !authorized}">
            Registration
          </router-link>
        </li>
      </ul>
    </header>
    <main class="main">
      <router-view @updated-localstorage="onLocalStorageChange"/>
    </main>
    <footer>
      <p>Created by <a href="https://github.com/skorikovkr">skorikovkr</a>.</p>
      <p>Backend and database hosted by <a href="https://somee.com/default.aspx">somee.com</a>.</p>
      <p>Frontend hosted by GitHub Pages.</p>
    </footer>
  </div>
</template>

<script>
import config from "../config";

export default {
  data() {
    return {
      authorized: !localStorage.getItem(config.ACCESS_TOKEN_KEY)
    }
  },
  methods: {
    onLocalStorageChange() {
      this.authorized = !localStorage.getItem(config.ACCESS_TOKEN_KEY);
    },
    onSignOut() {
      localStorage.removeItem(config.ACCESS_TOKEN_KEY);
      this.onLocalStorageChange();
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.hosting {
  background-color: #e8e8e8;
  padding: 0.5rem;
  text-align: center;
}

.main {
  max-width: 1000px;
  width: 100%;
  margin: 30px auto auto;
}

.header {
  background: #f9fbff;
}

.header-links {
  display: flex;
  gap: 1rem;
  list-style: none;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  padding: 0.6rem;
}

.header-links li:first-child {
  font-weight: bold;
  margin-right: 1.5rem;
  font-size: 1.2rem;
}

.header-links li:nth-child(4) {
  margin-left: auto;
}

.header-link {
  text-decoration: none;
  color: #7026b4;
}

.header-link:visited {
  color: #7026b4;
}

footer {
  text-align: left;
  margin-top: 50px;
  background-color: #a2a1a1;
  color: #e8e8e8;
  font-size: 0.9rem;
  padding: 1rem;
}

.invisible {
  display: none;
}
</style>
