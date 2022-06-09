<template>
  <Modal :onHide='onModalHide' :visible='visible' class='user-modal__edit-color' @visible='$emit("visible", $event)'>
    <span class='edit-color__title'>
      Change your color
    </span>
    <span class='edit-color__description'>
      Enter a new color (in hex)
    </span>
    <div class='edit-color__container'>
      <input v-model='colorInput' class='edit-color__input' placeholder='Color' type='text'>
    </div>
    <div class='edit-color__buttons'>
      <button class='edit-color__cancel-button' @click='() => {onModalHide(); $emit("visible", false)}'>Cancel</button>
      <button class='edit-color__done-button' @click='editUserColorHandler'>Done</button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: 'EditUserColorModal',
  props: {
    visible: Boolean,
  },
  data() {
    return {
      colorInput: '',
    };
  },
  methods: {
    editUserColorHandler() {
      if (this.colorInput && this.colorInput !== this.user.color) {
        this.socket.emit('user:update', this.user.id, { color: this.colorInput });

        this.socket.on('user:update', response => {
          this.$store.commit('updateUser', response.data);
        });

        this.socket.on('user:update:error', response => {
          console.log(response);
        });
      }

      this.onModalHide();
      this.$emit('visible', false);
    },
    onModalHide() {
      this.colorInput = '';
    },
  },
};
</script>

<style lang='scss' scoped>
.user-modal__edit-color {
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 500px;
  width: 100%;

  .edit-color__title {
    font-family: var(--font-header);
    font-size: 25px;
    font-weight: 600;
  }

  .edit-color__description {
    margin-top: 20px;
    font-family: var(--font-secondary);
    font-size: 15px;
    font-weight: 400;
    color: var(--text-secondary)
  }

  .edit-color__container {
    width: 100%;
    margin-top: 30px;

    .edit-color__input {
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

  .edit-color__buttons {
    margin-top: 40px;
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: right;
    align-items: center;

    .edit-color__done-button {
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

    .edit-color__cancel-button {
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