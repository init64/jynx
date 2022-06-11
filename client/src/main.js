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
    ...Vuex.mapState(['user', 'messages']),
  },
  methods: {
    router(path) {
      this.$router.push(path);
    },
    loadUser(user) {
      this.$store.commit('setUser', { ...this.user, ...user, authorized: true });
      localStorage.setItem('token', user.token);
      localStorage.setItem('userID', user.id);
    },
    setTheme(theme) {
      this.theme = theme;
      document.querySelector('html').setAttribute('theme', theme);
      localStorage.setItem('theme', theme);
    },
    login(token) {
      if (!token.trim()) {
        return;
      }

      this.socket.emit('user:login', token.trim());
      this.socket.on('user:login', response => {
        if (response.code === 200) {
          this.loadUser(response.data);
        }
      });
    },
    register() {
      this.socket.emit('user:create');
      this.socket.on('user:create', response => {
        if (response.code === 201) {
          this.loadUser(response.data);
        }
      });
    },
  },
});

app.mount('#app');