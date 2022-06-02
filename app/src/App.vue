<template>
  <router-view v-slot="{ Component }">
      <Transition>
        <component :is="Component"/>
      </Transition>
  </router-view>
</template>

<script>

export default {
  name: "app"
}
</script>

<style scoped>

</style>