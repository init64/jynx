<template>
  <div class='login-page'>
    <div class='login-container'>
      <span class='logo'>JYNX</span>
      <div>
        <input v-model='this.user.token' class='token-input' placeholder='user token' type='text'>
        <button class='register-button' @click='register'>Нет аккаунта?</button>
      </div>
      <button class='login-button' @click='login()'>Войти</button>
    </div>
  </div>
</template>

<script>
import SettingsPage from './Settings.js';

export default {
  name: 'LoginPage',
  computed: Vuex.mapState(['user']),
  watch: {
    user(newValue) {
      if (newValue.authorized) {
        this.addRoute({path: "/set", name: "SettingsSECPAge", component: SettingsPage})
        this.router("/set")
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.login-container {
  //background: #fff;
  //border: 1px solid white;
  text-align: left;
  min-width: 400px;
  display: flex;
  align-items: center;
  flex-direction: column;

  div {
    display: flex;
    flex-direction: column;
  }

  .logo {
    user-select: none;
    line-height: 100%;
    font-size: 40px;
    font-weight: 600;
    font-family: var(--font-header);
  }

  .token-input {
    margin-top: 30px;
    border: 3px solid var(--background-secondary);
    background: none;
    padding: 10px;
    border-radius: 2px;
    font-family: var(--font-header);
    color: var(--text-primary);
  }

  .register-button {
    margin-top: 4px;
    width: max-content;
    background: none;
    border: none;
    opacity: 0.7;
    cursor: pointer;
    color: var(--text-primary);

    &::placeholder {
      font-weight: 500;
    }
  }

  .login-button {
    cursor: pointer;
    width: max-content;
    margin-top: 30px;
    padding-inline: 25px;
    padding-block: 10px;
    border-radius: 2px;
    background-color: var(--background-secondary);
    border: none;
    color: var(--text-primary)
  }
}
</style>