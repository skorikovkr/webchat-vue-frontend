<template>
  <div class="message-area">
    <message v-for="message in messageHistory"
             v-bind:text="message.text"
             v-bind:username="message.userName"
    />
  </div>
  <input id="messageInput" v-model="messageToSend"/>
  <button v-on:click="sendMessage">Send</button>
</template>

<script>
import Message from "@/components/ChatRoomList/Message.vue";
import { connection } from "@/App.vue";

export default {
  name: "MessageArea",
  components: {Message},
  emits: ["sending-message"],
  props: ['messageHistory'],
  data() {
    return {
      messageToSend: ''
    }
  },
  methods: {
    async sendMessage() {
      this.$emit("sending-message", this.messageToSend);
    }
  }
}
</script>

<style scoped>
  .message-area {
    width: 100%;
    background-color: #f8f8f8;
    margin: 20px;
    border-radius: 10px;
    justify-content: left;
    padding: 20px;
  }
</style>