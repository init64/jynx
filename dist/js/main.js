import App from './App.js';
import router from './router/index.js';
import store from './store/index.js';

const app = Vue.createApp(App);
const socket = io(location.origin);

app.use(router);
app.use(store);

app.mixin({
  data() {
    return {
      socket,
      listOfRoutes: router.options.routes,
      theme: 'dark',
      autoLogin: false,
    };
  },
  methods: {
    router(path) {
      this.$router.push(path);
    },
    loadUser(user) {
      console.log('LOADING USER', user);
      this.$store.state.user = { ...this.$store.state.user, ...user, authorized: true };
      localStorage.setItem('token', user.token);
      localStorage.setItem('userID', user.id);
      this.router('/user');
    },
    setTheme(theme) {
      this.theme = theme;
      document.querySelector('html').setAttribute('theme', theme);
      localStorage.setItem('theme', theme);
    },
  },
  mounted() {
    if (localStorage.getItem('theme')) {
      this.setTheme(localStorage.getItem('theme'));
    }

    if (localStorage.getItem('autoLogin')) {
      this.autoLogin = localStorage.getItem('autoLogin') === 'true';
    }
  },
});

app.mount('#app');