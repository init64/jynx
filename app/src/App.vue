<template>
  <div class='app'>
    <router-view v-slot='{ Component }'>
      <ContextMenu />
      <div class='page'>
        <component :is='Component' />
      </div>
    </router-view>
  </div>
</template>

<script>

// TODO
// Добавить нормальную анимацию перехода роутов

import ContextMenu from './components/ContextMenu.js';

export default {
  name: 'app',
  components: { ContextMenu },
  mounted() {
    if (localStorage.getItem('theme')) {
      this.setTheme(localStorage.getItem('theme'));
    }

    if (this.autoLogin) {
      this.login(localStorage.getItem('token'));
    }

    window.addEventListener('contextmenu', e => {
      e.preventDefault();
    });
  },
};
</script>

<style lang='scss' scoped>
.app {
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
}

.page {
  height: 100%;
  width: 100%;
}
</style>