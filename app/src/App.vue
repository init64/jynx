<template>
  <router-view v-slot="{ Component }">
    <ContextMenu/>
    <Transition>
      <component :is="Component"/>
    </Transition>
  </router-view>
</template>

<script>

import ContextMenu from "./components/ContextMenu.js";

export default {
  name: "app",
  components: {ContextMenu}
}
</script>

<style scoped lang="scss">
#app {
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
}
</style>