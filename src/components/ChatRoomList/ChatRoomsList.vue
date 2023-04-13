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
export default {
  name: "ChatRoomsList",
  components: {ChatRoomListItem},
  data() {
    return {
      rooms: [],
      selectedRoom: null
    }
  },
  provide() {
    return {
      'selectedRoom': this.selectedRoom
    }
  },
  methods: {
    onRoomClick(roomName) {
      const service = new ChatService();
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
    width: 33%;
  }

  ul {
    margin-left: 20px;
    list-style: none;
  }
</style>