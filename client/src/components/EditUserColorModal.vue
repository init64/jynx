<template>
  <Modal class='user-modal__edit-avatar' :visible='visible' @visible='$emit("visible", $event)'>
        <span class='edit-avatar__title'>
      Change your color
    </span>
    <span class='edit-avatar__description'>
      Enter a new color (in hex)
    </span>
    <div class='edit-avatar__container'>
      <input v-model='colorInput' placeholder='Color' type='text' class='edit-avatar__input'>
    </div>
    <div class='edit-avatar__buttons'>
      <button @click='$emit("visible", false)' class='edit-avatar__cancel-button'>Cancel</button>
      <button @click='editUserColorHandler' class='edit-avatar__done-button'>Done</button>
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
      colorInput: ""
    }
  },
  methods: {
    editUserColorHandler() {
      if (this.colorInput && this.colorInput !== this.user.color) {
        this.socket.emit("user:update", this.user.id, {color: this.colorInput})

        this.socket.on("user:update", response => {
          this.$store.commit("updateUser", response.data)
        })

        this.socket.on("user:update:error", response => {
          console.log(response);
        })
      }

      this.$emit("visible", false)
    }
  }
};
</script>

<style lang='scss' scoped>
.user-modal__edit-avatar {
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 500px;
  width: 100%;

  .edit-avatar__title {
    font-family: var(--font-header);
    font-size: 25px;
    font-weight: 600;
  }

  .edit-avatar__description {
    margin-top: 20px;
    font-family: var(--font-secondary);
    font-size: 15px;
    font-weight: 400;
    color: var(--text-secondary)
  }

  .edit-avatar__container {
    width: 100%;
    margin-top: 30px;

    .edit-avatar__input {
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

  .edit-avatar__buttons {
    margin-top: 40px;
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: right;
    align-items: center;

    .edit-avatar__done-button {
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

    .edit-avatar__cancel-button {
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