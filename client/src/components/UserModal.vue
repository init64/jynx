<template>
  <Modal class='user-modal' :visible='visible' @visible='$emit("visible", $event)'>
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

<style scoped>
.user-modal {
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
}
</style>