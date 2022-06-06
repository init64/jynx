<template>
  <div class='user-page'>
    <div class='user__container'>
      <div class='user__avatar' :style='{backgroundImage: `url(${user.avatar})`}' />
      <div class='user__name'>
        {{ user.username }}
      </div>
      <button @click='exitButtonHandler'>Exit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserPage',
  mounted() {
    localStorage.setItem('lastPage', '/user');
  },
  methods: {
    exitButtonHandler() {
      this.$store.commit('setUser', { authorized: false, token: '' });
      localStorage.removeItem('token');
      localStorage.removeItem('userID');
      this.router('/login');
    },
  },
};
</script>

<style lang='scss' scoped>

.user-page {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .user__container {
    height: 100%;
    width: 50%;
    border: 1px solid white;
    display: flex;
    align-items: center;
    flex-direction: column;

    .user__avatar {
      height: 100px;
      width: 100px;
      background-position: 50%;
      background-size: cover;
      background-repeat: no-repeat;
      border: 3px solid var(--background-secondary);
      border-radius: 50%;
    }
  }
}

</style>