<template>
  <li class="chat" v-on:click="roomOnClick">{{ chat.displayName }}</li>
</template>

<script>
export default {
  name: "ChatRoomListItem",
  props: ['chat'],
  methods: {
    roomOnClick() {
      this.$emit('room-clicked', this.chat.name);
    }
  }
}
</script>

<style scoped>
  .chat {
    background-color: aliceblue;
    padding: 0.5rem;
    border-radius: 10px;
    margin-top: 5px;
    cursor: pointer;
  }
</style>