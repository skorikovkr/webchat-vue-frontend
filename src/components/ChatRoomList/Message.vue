<template>
<div class="message" v-bind:class="{'to-right' : username === currentUsername}">
  <span class="username">{{ username }}</span>
  <span class="text">{{ text }}</span>
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
    padding: 0.4rem 0.8rem 0.4rem 0.8rem;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    -webkit-box-shadow: -12px -6px 22px -7px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: -12px -6px 22px -7px rgba(34, 60, 80, 0.2);
    box-shadow: -12px -6px 22px -7px rgba(34, 60, 80, 0.2);
    margin-top: 1rem;
  }

  .to-right {
    margin-left: auto;
  }

  .username {
    color: #7026b4;
    margin-bottom: 0.2rem;
  }
</style>