<template>
  <router-view v-slot="{ Component }">
    <ContextMenu/>
    <component class="router-view" :is="Component"/>
  </router-view>
</template>

<script>

// TODO
// Добавить нормальную анимацию перехода роутов

import ContextMenu from "./components/ContextMenu.js";

export default {
  name: "app",
  components: {ContextMenu},
  mounted() {
    window.addEventListener('contextmenu', e => {
      e.preventDefault();
    });
  }
}
</script>

<style scoped lang="scss">
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