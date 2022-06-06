<template>
  <div class='message'>
    <div :style='{backgroundImage: `url(${author.avatar})`}' class='author__avatar'/>
    <div class='message__content'>
      <span class='author__name'>
        {{ author.username }}
      </span>
      <span class='message__text'>
        {{ message }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    author: Object,
    message: String
  }
};
</script>

<style lang='scss' scoped>
.message {
  width: 100%;
  padding: 5px;
  display: flex;
  margin-block: 5px;

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
  }
}
</style>