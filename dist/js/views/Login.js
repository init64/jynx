
export default {
		template: "<div class='login-page'> <div class='container'> <span class='logo'>JYNX</span> <div> <input v-model='$store.state.user.token' class='token-input' placeholder='user token' type='text'> <button class='register-button' @click='createUser'>Нет аккаунта?</button> </div> <button class='login-button' @click='login'>Войти</button> </div> </div>",
		beforeCreate() {
			loadCss({ content: ".login-page{display:flex;align-items:center;justify-content:center;flex-direction:column;width:100%;height:100%}.container{text-align:left;min-width:400px;display:flex;align-items:center;flex-direction:column}.container div{display:flex;flex-direction:column}.container .logo{user-select:none;line-height:100%;font-size:40px;font-weight:600;font-family:var(--font-header)}.container .token-input{margin-top:30px;border:3px solid var(--background-secondary);background:none;padding:10px;border-radius:2px;font-family:var(--font-header);color:var(--text-primary)}.container .register-button{margin-top:4px;width:max-content;background:none;border:none;opacity:0.7;cursor:pointer;color:var(--text-primary)}.container .register-button::placeholder{font-weight:500}.container .login-button{cursor:pointer;width:max-content;margin-top:30px;padding-inline:25px;padding-block:10px;border-radius:2px;background-color:var(--background-secondary);border:none;color:var(--text-primary)}" });
		},
  name: 'LoginPage',
  data() {
    return {
      tokenInput: this.$store.state.user.token,
    };
  },
  methods: {
    createUser() {
      this.socket.emit('user:create');

      this.socket.on('user:loadUser', user => {
        this.loadUser(user);
      });
    },
    login() {
      console.log('Login button handler');
      let { token } = this.$store.state.user;
      if (!token.trim()) return;
      this.socket.emit('user:login', token.trim());

      this.socket.on('user:login', user => {
        console.log('LOGIN USER');
        this.loadUser(user);
      });
    },
  },
};
