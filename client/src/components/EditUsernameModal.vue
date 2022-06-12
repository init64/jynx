<template>
  <Modal
    :onHide='onModalHide'
    :visible='visible'
    class='user-modal__edit-username'
    @visible='$emit("visible", $event)'>
    <span class='edit-username__title'>
      Change your username
    </span>
    <span class='edit-username__description'>
      Enter a new username
    </span>
    <div class='edit-username__container'>
      <!--      <Input/>-->
      <input v-model='usernameInput' class='edit-username__input' placeholder='Username' type='text'>
    </div>
    <div class='edit-username__buttons'>
      <button class='edit-username__cancel-button' @click='() => {onModalHide(); $emit("visible", false)}'>Cancel
      </button>
      <button class='edit-username__done-button' @click='editUsernameHandler'>Done</button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: 'EditUsernameModal',
  props: {
    visible: Boolean,
  },
  data() {
    return {
      usernameInput: '',
    };
  },
  methods: {
    editUsernameHandler() {
      if (this.usernameInput && this.usernameInput !== this.user.username) {
        this.socket.emit('user:update', this.user.id, { username: this.usernameInput });

        this.socket.on('user:update', response => {
          if (response.code === 200) {
            this.$store.commit('user/updateUser', response.data);
          }
        });
      }

      this.onModalHide();
      this.$emit('visible', false);
    },
    onModalHide() {
      this.usernameInput = '';
    },
  },
};
</script>

<style lang='scss' scoped>
.user-modal__edit-username {
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 500px;
  width: 100%;

  .edit-username__title {
    font-family: var(--font-header);
    font-size: 25px;
    font-weight: 600;
  }

  .edit-username__description {
    margin-top: 20px;
    font-family: var(--font-secondary);
    font-size: 15px;
    font-weight: 400;
    color: var(--text-secondary)
  }

  .edit-username__container {
    width: 100%;
    margin-top: 30px;

    .edit-username__input {
      width: 100%;
      padding: 10px;
      border-radius: 5px;
      background-color: var(--background-thirty);
      color: var(--text-primary);
      border: none;
      font-family: var(--font-header);
      font-size: 14px;
      font-weight: 500;
    }
  }

  .edit-username__buttons {
    margin-top: 40px;
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: right;
    align-items: center;

    .edit-username__done-button {
      background-color: var(--background-thirty);
      color: var(--text-primary);
      font-family: var(--font-primary);
      font-weight: 600;
      padding-inline: 20px;
      padding-block: 13px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      margin-left: 5px;
    }

    .edit-username__cancel-button {
      margin-right: 5px;
      background: none;
      color: var(--text-primary);
      font-family: var(--font-primary);
      font-weight: 500;
      padding-inline: 10px;
      padding-block: 6px;
      border: none;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>