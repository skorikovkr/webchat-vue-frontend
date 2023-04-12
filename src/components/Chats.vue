<template>
  <div class="chat-container">
    <chat-rooms-list @room-selected="onRoomSelected"/>
    <message-area v-bind:message-history="messageHistory"/>
  </div>
</template>

<script>
import ChatRoomsList from "@/components/ChatRoomList/ChatRoomsList.vue";
import MessageArea from "@/components/ChatRoomList/MessageArea.vue";
export default {
  name: "Chats",
  components: {
    MessageArea,
    ChatRoomsList
  },
  data() {
    return {
      messageHistory: []
    }
  },
  methods: {
    onRoomSelected(messageHistory) {
      this.messageHistory = messageHistory;
    }
  }
}
</script>

<style scoped>
  .chat-container {
    display: flex;
    flex-direction: row;
    justify-content: start;
  }
</style>