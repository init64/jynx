<template>
  <div class='message'>
    <div class='message__data'>
      <div :style='{backgroundImage: `url(${message.author.avatar})`}' class='author__avatar' />
      <div class='message__content'>
        <span class='author__name'>
          {{ message.author.username }}
        </span>
        <input type='text'
               @keypress='messageEditMode && $event.key === "Enter" && messageEditHandler()'
               @input='messageInput = $event.target.value'
               class='message__text'
               :value='messageEditMode ? messageInput : message.content' :message-edit='messageEditMode'
               :disabled='!messageEditMode'>
      </div>
    </div>
    <div v-if='message.author.id === user.id' class='message__options'>
      <div @click='!messageEditMode ? messageEditMode = true : messageEditHandler()' class='message__option'>
        <i class='uil uil-pen'></i>
      </div>
      <div @click='deleteMessageHandler()' class='message__option message__delete-option'>
        <i class='uil uil-trash'></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: Object,
  },
  data() {
    return {
      messageEditMode: false,
      messageInput: this.message.content,
    };
  },
  methods: {
    messageEditHandler() {
      if (this.messageInput !== this.message.content) {
        this.socket.emit('message:update', this.message.id, this.messageInput);
      }
      this.messageInput = this.message.content;
      this.messageEditMode = false;
    },
    deleteMessageHandler() {
      this.socket.emit("message:delete", this.message.id)
    }
  },
};
</script>

<style lang='scss' scoped>
.message {
  width: 100%;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  margin-block: 5px;
  border-radius: 5px;

  .message__data {
    display: flex;
  }

  .message__options {
    margin-right: 20px;
    margin-block: auto;
    display: none;
    align-items: center;
    height: max-content;
    width: max-content;
    border-radius: 6px;
    padding: 3px;
    background-color: var(--background-thirty);


    .message__delete-option {
      color: var(--text-red);
    }

    .message__option {
      padding: 6px;
      //border-radius: 6px;
      padding-inline: 8px;
      //background-color: var(--background-thirty);
      font-size: 15px;
    }
  }

  &:hover {
    background-color: var(--background-secondary);

    //.author__avatar {
    //  border: 3px solid var(--background-primary);
    //}

    .message__options {
      display: flex;
    }
  }

  .author__avatar {
    width: 44px;
    height: 44px;
    border: 3px solid var(--background-secondary);
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 50%;
  }

  .message__content {
    margin-inline: 10px;
    display: flex;
    flex-direction: column;

    .message__text {
      margin-top: 5px;
      background: none;
      border: none;
      color: var(--text-primary);
      font-family: var(--font-primary);
    }

    .message__text[message-edit="true"] {
      background-color: var(--background-thirty);
      border-radius: 5px;
      padding: 10px;
    }
  }
}
</style>