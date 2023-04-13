<template>
  <div class="chat-container">
    <chat-rooms-list @room-selected="onRoomSelected"/>
    <message-area v-bind:message-history="messageHistory"
      @sending-message="onMessageSent"
    />
  </div>
</template>

<script>
import ChatRoomsList from "@/components/ChatRoomList/ChatRoomsList.vue";
import MessageArea from "@/components/ChatRoomList/MessageArea.vue";
import {connection} from "@/App.vue";

export default {
  name: "Chats",
  components: {
    MessageArea,
    ChatRoomsList
  },
  provide() {
    return {
      room: this.selectedRoom
    }
  },
  data() {
    return {
      messageHistory: [],
      selectedRoom: null
    }
  },
  methods: {
    async onRoomSelected(messageHistory, roomName) {
      this.messageHistory = messageHistory;
      this.selectedRoom = roomName;
      await connection.invoke("ConnectToRoom", roomName);
    },
    async onMessageSent(message) {
      await connection.invoke("SendMessageToRoom", this.selectedRoom, message);
    }
  },
  async mounted() {
    connection.on("RecieveMessage", function (user, message) {
      let msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt").replace(/>/g, "&gt");
      this.messageHistory.push({
        userName: user,
        text: msg
      });
    });
  }
}
</script>

<style scoped>
  .chat-container {
    display: flex;
    flex-direction: row;
    justify-content: start;
    width: 100%;
  }
</style>