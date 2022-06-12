<template>
  <div v-if='user.authorized' class='chat-page'>
    <div class='chat__container'>
      <Messages @openAuthorModal='openAuthorModal' />
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
  <UserModal :visible='authorModal' @visible='authorModal = false' :userId='authorIdModal' />
</template>

<script>
import Messages from '../components/Messages.js';
import UserModal from '../components/UserModal.js';

export default {
  name: 'ChatPage',
  components: { UserModal, Messages },
  data() {
    return {
      authorModal: false,
      authorIdModal: localStorage.getItem('userID') || '',
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
    openAuthorModal(userId) {
      this.authorIdModal = userId;
      this.authorModal = true;
    },
  },
  mounted() {
    if (this.user.authorized) {
      localStorage.setItem('lastPage', '/chat');
    }

    Notification.requestPermission()
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