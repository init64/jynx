import App from './App.js';
import router from './router/index.js';
import store from './store/index.js';
import UIComponents from './components/UI/index.js';

const app = Vue.createApp(App);
const socket = io(location.origin);

app.use(router);
app.use(store);

app.mixin({
  components: { ...UIComponents },
  data() {
    return {
      socket,
      listOfRoutes: router.options.routes,
      theme: 'dark',
    };
  },
  computed: {
    ...Vuex.mapState(['user']),
  },
  methods: {
    router(path) {
      this.$router.push(path);
    },
    loadUser(user) {
      this.$store.state.user = { ...this.$store.state.user, ...user, authorized: true };
      localStorage.setItem('token', user.token);
      localStorage.setItem('userID', user.id);
      // this.router('/user');
    },
    setTheme(theme) {
      this.theme = theme;
      document.querySelector('html').setAttribute('theme', theme);
      localStorage.setItem('theme', theme);
    },
    login(token) {
      if (!token.trim()) return;
      this.socket.emit('user:login', token.trim());
      console.log(token);

      this.socket.on('user:login', user => {
        localStorage.setItem('token', token);
        this.loadUser(user);
      });
    },
    register() {
      this.socket.emit('user:create');

      this.socket.on('user:loadUser', user => {
        this.loadUser(user);
      });
    },
  },
});

app.mount('#app');