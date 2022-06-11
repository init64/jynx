<template>
  <div class='chat-page'>
    <div class='chat__container'>
      <Messages />
      <div class='chat__message-input'>
        <input v-model='messageInput'
               class='chat__input'
               placeholder='Message'
               type='text'
               @keypress='$event.key === "Enter" && sendButtonHandler()' />
        <button class='chat__message-send-button'
                @click='sendButtonHandler'>
          <i class='uil uil-message'></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Messages from '../components/Messages.js';

export default {
  name: 'ChatPage',
  components: { Messages },
  data() {
    return {
      messageInput: '',
    };
  },
  methods: {
    sendButtonHandler() {
      if (this.messageInput) {
        this.socket.emit('chat:send-message', this.messageInput);
        this.messageInput = '';
      }
    },
  },
  mounted() {
    if (this.user.authorized) {
      localStorage.setItem('lastPage', '/chat');
    }
  },
};
</script>

<style lang='scss' scoped>
.chat-page {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .chat__container {
    height: 100%;
    width: 70%;

    .chat__message-input {
      display: flex;
      width: 100%;
      height: 6%;
      align-items: center;
      background-color: var(--background-secondary);
      border-radius: 6px;

      .chat__input {
        font-family: var(--font-header);
        height: 100%;
        width: 100%;
        background-color: var(--background-secondary);
        border-radius: 6px;
        padding: 10px;
        color: var(--text-primary);
        border: none;
      }

      .chat__message-send-button {
        background-color: var(--background-secondary);
        color: var(--text-primary);
        border: none;
        padding: 10px;
        margin-inline: 5px;
        border-radius: 10px;
        margin-block: auto;
        transition: 0.2s background-color;

        &:hover {
          background-color: var(--background-button-hover);
        }
      }
    }
  }
}
</style>