<template>
  <div class="message-container">
    <div class="message-area">
      <message v-for="message in messageHistory"
               v-bind:text="message.text"
               v-bind:username="message.userName"
      />
    </div>
    <input id="messageInput" v-model="messageToSend"/>
    <button v-on:click="sendMessage">Send</button>
  </div>
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
      this.messageToSend = '';
    }
  }
}
</script>

<style scoped>

  .message-area {
    width: 100%;
    height: 700px;
    background-color: #f8f8f8;
    margin: 20px;
    border-radius: 10px;
    padding: 20px;
    overflow-y: scroll;
  }

  #messageInput {
    border-radius: 10px;
    border-width: 1px;
  }
</style>