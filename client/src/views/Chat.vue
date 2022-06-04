<template>
  <div class='chat-page'>
    Chat page
  </div>
</template>

<script>
export default {
  name: 'ChatPage',
  mounted() {
    localStorage.setItem("lastPage", "/chat")
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
  flex-direction: column;
}
</style>