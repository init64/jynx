<template>
  <div ref='chatMessages' class='chat__messages'>
    <Message
      @openAuthorModal='$emit("openAuthorModal", $event)'
      v-for='message in messages'
      :key='message.id'
      :message='message'
    />
  </div>
</template>

<script>
import Message from './Message.js';

export default {
  name: 'Messages',
  components: { Message },
  mounted() {
    // TODO
    // Сделать функцию scrollToBottom

    this.socket.emit('chat:get-messages');

    this.socket.on('chat:get-messages', response => {
      if (response.code === 200) {
        this.$store.commit('setMessages', response.data);
      }
    });

    this.socket.on('chat:new-message', response => {
      if (response.code === 200) {
        this.$store.commit('pushMessage', response.data);
      }
    });

    this.socket.on('chat:update-message', response => {
      if (response.code === 200) {
        const {
          id,
          content,
          updatedAt,
        } = response.data;
        this.$store.commit('setMessage', { id, content, updatedAt });
      }
    });

    this.socket.on('chat:delete-message', response => {
      if (response.code === 200) {
        this.$store.commit('deleteMessage', response.data.id);
      }
    });

    this.socket.on('user:update', response => {
      if (response.code === 200) {
        this.$store.commit('editAuthorOfMessages', response.data);
      }
    });
  },
};
</script>

<style lang='scss' scoped>
.chat__messages {
  overflow-y: scroll;
  height: 91%;
  width: 100%;
}
</style>