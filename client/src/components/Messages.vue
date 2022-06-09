<template>
  <Message v-for='message in messages' :key='message.id' :message='message' />
</template>

<script>
import Message from './Message.js';

export default {
  name: 'Messages',
  components: { Message },
  mounted() {
    this.socket.emit('chat:get-messages');

    this.socket.on('chat:get-messages', response => {
      this.$store.commit('setMessages', response.data);
    });

    this.socket.on('chat:new-message', response => {
      this.$store.commit('pushMessage', response.data);
    });

    this.socket.on('chat:update-message', response => {
      if (response.code === 200) {
        const { id, content } = response.data;
        this.$store.commit('setMessageById', { id, data: { content } });
      }
    });

    this.socket.on('chat:delete-message', response => {
      if (response.code === 200) {
        this.$store.commit('deleteMessage', response.data.id);
      }
    });
  },
};
</script>