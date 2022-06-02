<template>
  <router-view v-slot="{ Component }">
    <ContextMenu/>
    <Transition>
      <component class="router-view" :is="Component"/>
    </Transition>
  </router-view>
</template>

<script>

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