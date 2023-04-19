<template>
  <div class="chat-container">
    <chat-rooms-list @room-selected="onRoomSelected"/>
    <message-area v-bind:messageHistory="messageHistory" v-bind:selectedRoom="selectedRoom"/>
  </div>
</template>

<script>
import ChatRoomsList from "@/components/ChatRoomList/ChatRoomsList.vue";
import MessageArea from "@/components/ChatRoomList/MessageArea.vue";
import {connection} from "@/App.vue";
import AuthService from "@/services/AuthService";

export default {
  name: "Chats",
  components: {
    MessageArea,
    ChatRoomsList
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
    }
  },
  created() {
    if (!AuthService.isTokenValid) {
      this.$router.push("SignIn");
    }
  }
}
</script>

<style scoped>
  .chat-container {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
</style>