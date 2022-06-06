<template>
  <div class='chat-page'>
    <div class='chat__container'>
      <div class='chat__messages'>
        <Message message='Ты хуйло' :author='{username: user.username, avatar: user.avatar}'/>
      </div>
      <div class='chat__message-input'>
        <input v-model='messageInput' type='text' placeholder='Message' class='chat__input'>
        <button @click='sendButtonHandler' class='chat__message-send-button'>
          <i class='uil uil-message'></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Message from '../components/Message.js';

export default {
  name: "ChatPage",
  components: {Message},
  data() {
    return {
      messageInput: "",
    }
  },
  methods: {
    sendButtonHandler() {
      console.log("Chat send button handler");
    }
  }
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

    .chat__messages {
      height: 91%;
      width: 100%;
    }

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