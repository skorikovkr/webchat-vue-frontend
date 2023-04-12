<template>
  <div class="message-area">
    <message v-for="message in messageHistory"
             v-bind:text="message.text"
             v-bind:username="message.userName"
    />
  </div>
</template>

<script>
import Message from "@/components/ChatRoomList/Message.vue";

export default {
  name: "MessageArea",
  components: {Message},
  props: ['messageHistory']
}
</script>

<style scoped>
  .message-area {
    width: 100%;
    background-color: #f8f8f8;
    margin: 20px;
    border-radius: 10px;
    justify-content: left;
  }
</style>