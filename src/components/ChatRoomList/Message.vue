<template>
<div class="message" v-bind:class="{'to-right' : username === currentUsername}">
  <p>{{ username }}</p>
  <p>{{ text }}</p>
</div>
</template>

<script>
export default {
  name: "Message",
  props: ['text', 'username'],
  data() {
    return {
      currentUsername: localStorage.getItem('username')
    }
  }
}
</script>

<style scoped>
  .message {
    width: 33%;
    text-align: start;
  }

  .to-right {
    margin-left: auto;
  }
</style>