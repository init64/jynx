<template>
  <Modal
    overWriteClass='true'
    class='user-modal'
    :visible='visible'
    @visible='$emit("visible", $event)'
  >
    <div class='user-modal__color' :style='{backgroundColor: userData.color}' />
    <div class='user-modal__data'>
      <div class='user-modal__avatar' :style='{backgroundImage: `url(${userData.avatar})`}' />
      <span
        class='user-modal__username'>{{ username }}<span>{{ userHashTag }}</span></span>
    </div>
  </Modal>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    userId: String,
  },
  data() {
    return {
      userData: {},
    };
  },
  computed: {
    username() {
      if (this.userData.username.split('#')[1]) {
        let username = this.userData.username.split('#')[0];
        return username[0].toUpperCase() + username.substring(1);
      } else {
        return this.userData.username[0].toUpperCase() + this.userData.username.substring(1);
      }
    },
    userHashTag() {
      if (this.userData.username.split('#')[1]) {
        return '#' + this.userData.username.split('#')[1];
      } else {
        return '';
      }
    },
  },
  watch: {
    visible(newValue) {
      if (newValue) {
        this.socket.emit('user:get', this.userId);

        this.socket.once('user:get', response => {
          if (response.code === 200) {
            this.userData = response.data;
          }
        });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.user-modal {
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  padding: 0;
  margin: 0;
  border-radius: 10px;
  background-color: var(--background-secondary);

  .user-modal__color {
    width: 100%;
    height: 100px;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }

  .user-modal__data {
    width: 100%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding-inline: 15px;
    padding-bottom: 15px;
    display: flex;

    .user-modal__avatar {
      margin-top: -40px;
      height: 100px;
      width: 100px;
      background-position: 50%;
      background-color: var(--background-secondary);
      background-size: cover;
      background-repeat: no-repeat;
      border: 6px solid var(--background-thirty);
      border-radius: 50%;
    }

    .user-modal__username {
      margin: 15px 15px;
      line-height: 100%;
      font-family: var(--font-header);
      font-size: 28px;
      font-weight: 500;

      & span {
        font-family: var(--font-primary);
        color: var(--text-secondary);
        font-weight: 600;
      }
    }
  }
}
</style>