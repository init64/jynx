<template>
  <div class='user-page'>
    Hello {{ user.username }}
    <button @click='exitButtonHandler' class='exit-button'>Выйти из аккаунта</button>
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
      this.$store.state.user = { authorized: false, token: '' };
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
}

</style>