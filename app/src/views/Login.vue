<template>
  <div class="login-page">
    <div class="container">
      <span class="logo">JYNX</span>
      <div>
        <input v-model="$store.state.user.token" type="text" class="token-input" placeholder="user token">
        <button @click="createUser" class="register-button">Нет аккаунта?</button>
      </div>
      <button @click="login" class="login-button">Войти</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      tokenInput: this.$store.state.user.token
    }
  },
  methods: {
    createUser() {
      this.socket.emit('user:create');

      this.socket.on('user:loadUser', user => {
        this.loadUser(user)
      });
    },
    login() {
      console.log("Login button handler")
      let {token} = this.$store.state.user
      if (!token.trim()) return;
      this.socket.emit('user:login', token.trim());

      this.socket.on('user:login', user => {
        console.log("LOGIN USER")
        this.loadUser(user);
      });
    }
  }
}
</script>

<style scoped lang="scss">
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.container {
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