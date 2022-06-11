<template>
  <div class='message'>
    <div class='message__container'>
      <div @click='openAuthorModal' :style='{backgroundImage: `url(${message.author.avatar})`}'
           class='author__avatar' />
      <div class='message__content'>
        <div class='message__title'>
          <span @click='openAuthorModal' class='author__name'>
            {{ authorName }}
          </span>
          <span class='message__date'>
            {{ messageCreatedDate }}
          </span>
        </div>
        <div class='message__data'>
          <input v-if='messageEditMode'
                 :message-edit='messageEditMode'
                 :value='messageInput'
                 class='message__text'
                 type='text'
                 @input='messageInput = $event.target.value'
                 @keypress='messageEditMode && $event.key === "Enter" && messageEditHandler()'>
          <div v-if='!messageEditMode'
               class='markdown-content message__text'
               v-html='markdown(message.content)'></div>
          <span v-if='message.createdAt !== message.updatedAt' class='message__edited'>(edited)</span>
        </div>
      </div>
    </div>
    <div v-if='message.author.id === user.id' class='message__options'>
      <div class='message__option' @click='!messageEditMode ? messageEditMode = true : messageEditHandler()'>
        <i class='uil uil-pen'></i>
      </div>
      <div class='message__option message__delete-option' @click='deleteMessageHandler()'>
        <i class='uil uil-trash'></i>
      </div>
    </div>
  </div>
</template>

<script>
import rules from './MarkdownRules.js';

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
  watch: {
    'message.content': function(newValue) {
      this.messageInput = newValue;
    },
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
      this.socket.emit('message:delete', this.message.id);
    },
    markdown(text) {
      let markdownText = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      for (let [rule, template] of rules) markdownText = markdownText.replace(rule, template);
      return markdownText;
    },
    getFormatedDate(date) {
      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    },
    openAuthorModal() {
      this.$emit('openAuthorModal', this.message.author.id);
    },
  },
  computed: {
    messageCreatedDate() {
      const messageDate = {
        date: new Date(this.message.createdAt),
        formatedDate: this.getFormatedDate(new Date(this.message.createdAt)),
      };
      const currentDate = {
        date: new Date(),
        formatedDate: this.getFormatedDate(new Date()),
      };

      if (currentDate.formatedDate === messageDate.formatedDate) {
        return `Today at ${messageDate.date.getHours()}:${String(messageDate.date.getMinutes()).padStart(2, '0')}`;
      } else {
        return messageDate.formatedDate;
      }
    },
    authorName() {
      return this.message.author.username[0].toUpperCase() + this.message.author.username.substr(1);
    },
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

  .message__container {
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

    .message__title {
      display: flex;
      align-items: center;

      .author__name {
        font-family: var(--font-header);
        font-size: 17px;
        color: var(--text-primary);
      }

      .message__date {
        margin-left: 7px;
        font-family: var(--font-secondary);
        font-size: 14px;
        color: var(--text-secondary);
      }
    }

    .message__data {
      display: flex;
      align-items: center;

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

      .message__edited {
        margin-left: 4px;
        font-family: var(--font-secondary);
        font-size: 12px;
        color: var(--text-secondary);
      }
    }
  }
}
</style>