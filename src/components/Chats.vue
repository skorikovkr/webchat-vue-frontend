<template>
  <div class="chat-container">
    <chat-rooms-list />
    <message-area />
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