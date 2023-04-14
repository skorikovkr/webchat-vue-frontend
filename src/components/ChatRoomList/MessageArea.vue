<template>
  <div class="message-container">
    <div class="message-area" id="messageArea">
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
  props: { messageHistory : Array, selectedRoom: String },
  data() {
    return {
      messageToSend: ''
    }
  },
  methods: {
    async sendMessage() {
      await connection.invoke("SendMessageToRoom", this.selectedRoom, this.messageToSend);
      this.messageToSend = '';
    },
    addMessageToHistory(message) {
      this.messageHistory.push(message);
    }
  },
  async mounted() {
    messageArea.scrollTop = messageArea.scrollHeight;
    const addMessage = this.addMessageToHistory;
    connection.on("RecieveMessage", function (user, message) {
      let msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt").replace(/>/g, "&gt");
      const newItem = {userName: user, text: msg};
      addMessage(newItem);
      setTimeout(() => {
        messageArea.scrollTop = messageArea.scrollHeight;
      }, 500);
    });
    connection.on("Notify", function (message) {
      console.log(message);
    });
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