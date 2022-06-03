<template>
  <div class='user-page'>
    Hello {{ user.username }}
  </div>
</template>

<script>
export default {
  name: 'UserPage',
  mounted() {
    localStorage.setItem('lastPage', '/user');
  }
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