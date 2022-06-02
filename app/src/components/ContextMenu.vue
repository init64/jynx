<template>
  <div class="context-menu">
    <div class="user-avatar" :style="{backgroundImage: `url(${$store.state.user.avatar})`}"/>
    <ul class="buttons">
      <li v-if="!$store.state.user.authorized" :active="$route.path === '/login'" @click="router('/login')">
        <i class="uil uil-user"></i>
      </li>
      <ul v-if="$store.state.user.authorized">
        <li :active="$route.path === '/user'" @click="router('/user')">
          <i class="uil uil-user"></i>
        </li>
        <li :active="$route.path === '/chat'" @click="router('/chat')">
          <i class="uil uil-chat"></i>
        </li>
      </ul>
      <li :active="$route.path === '/settings'" @click="router('/settings')">
        <i class="uil uil-setting"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ContextMenu"
}
</script>

<style scoped lang="scss">
.context-menu {
  height: 100%;
  width: 5%;
  min-width: 60px;
  border-right: 1px solid var(--background-secondary);
  display: flex;
  align-items: center;
  flex-direction: column;
}

.user-avatar {
  margin-top: 8px;
  width: 48px;
  height: 48px;
  border: 3px solid var(--background-secondary);
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50%;
}

.buttons {
  margin-top: 13px;

  li {
    cursor: pointer;
    margin-top: 7px;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background: var(--background-secondary);
    transition: 0.2s;
    user-select: none;
  }

  li[active="true"] {
    color: var(--background-secondary);
    background-color: var(--text-primary);
  }
}
</style>