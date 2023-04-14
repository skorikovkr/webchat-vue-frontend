<template>
  <div class="rooms-list">
    <span>Your chats:</span>
    <ul>
      <chat-room-list-item
          v-for="room in rooms"
          v-bind:chat="room"
          @room-clicked="onRoomClick"
      />
    </ul>
  </div>
</template>

<script>
import ChatRoomListItem from "@/components/ChatRoomList/ChatRoomListItem.vue";
import ChatService from "@/services/ChatService";
import {connection} from "@/App.vue";

export default {
  name: "ChatRoomsList",
  components: {ChatRoomListItem},
  data() {
    return {
      rooms: [],
      selectedRoom: null
    }
  },
  methods: {
    async onRoomClick(roomName) {
      const service = new ChatService();
      await connection.invoke("ConnectToRoom", roomName);
      service.getChatHistory(roomName).then(res => {
        if (res.success) {
          this.selectedRoom = roomName;
          this.$emit('room-selected', res.data, this.selectedRoom);
        } else {
          this.error = res.data;
        }
      });
    }
  },

  mounted() {
    const service = new ChatService();
    service.getChatRooms().then(res => {
      if (res.success) {
        this.rooms = res.data;
      } else {
        this.error = res.data;
      }
    });
  }
}
</script>

<style scoped>
  .rooms-list {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-left: 20px;
    margin-right: 20px;
  }

  ul {
    margin-top: 10px;
    list-style: none;
    width: 100%;
  }
</style>