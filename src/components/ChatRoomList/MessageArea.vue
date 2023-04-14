<template>
  <div class="message-container">
    <div class="message-area" id="messageArea">
      <message v-for="message in messageHistory"
               v-bind:text="message.text"
               v-bind:username="message.userName"
      />
    </div>
    <form id="messageSendingForm">
      <input id="messageInput" v-model="messageToSend" autocomplete="off"/>
      <button v-on:click.prevent="sendMessage" id="sendMessageButton">Send</button>
    </form>
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
      await connection.invoke("SendMessageToRoom", this.selectedRoom, this.messageToSend.replace('/(?:\\r\\n|\\r|\\n)/g', ''));
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
  .message-container {
    width: 60%;
    min-width: 60%;
    margin-left: 20px;
  }

  .message-area {
    height: 60vh;
    background-color: #f8f8f8;

    border-radius: 10px;
    padding: 20px;
    overflow-y: scroll;
    width: 100%;
    margin-bottom: 20px;
  }

  #messageInput {
    border-radius: 10px;
    border-width: 1px;
    height: 1.5rem;
    margin-right: 1rem;
    padding-left: 1rem;
  }

  #sendMessageButton {
    height: 1.5rem;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    background-color: white;
    border-color: #7026b4;
    border-width: 2px;
    border-radius: 10px;
    cursor: pointer;
  }

  #messageSendingForm {
    display: flex;
    justify-content: right;
    width: 100%;
  }
</style>