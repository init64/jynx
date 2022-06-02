<template>
  <router-view v-slot='{ Component }'>
    <ContextMenu />
    <component :is='Component' class='router-view' />
  </router-view>
</template>

<script>

// TODO
// Добавить нормальную анимацию перехода роутов

import ContextMenu from './components/ContextMenu.js';

export default {
  name: 'app',
  components: { ContextMenu },
  mounted() {
    window.addEventListener('contextmenu', e => {
      e.preventDefault();
    });
  },
};
</script>

<style lang='scss' scoped>
#app {
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
}

.router-view {
  height: 100%;
  width: 100%;
}
</style>