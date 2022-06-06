<template>
  <div class='login-page'>
    <div class='login__container'>
      <span class='logo'>JYNX</span>
      <div>
        <input v-model='tokenInput' class='token-input' placeholder='user token' type='text'>
        <button class='register-button' @click='register'>Нет аккаунта?</button>
      </div>
      <button class='login-button' @click='loginButtonHandler'>Войти</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      tokenInput: '',
    };
  },
  methods: {
    loginButtonHandler() {
      this.login(this.tokenInput);
    }
  },
  watch: {
    user(newValue) {
      if (newValue.authorized) {
        this.router(localStorage.getItem('lastPage') || '/user');
      }
    },
  }
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

  .login__container {
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
}
</style>