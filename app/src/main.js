import App from "./App.js";
import router from "./router/index.js";
import store from "./store/index.js";

const app = Vue.createApp(App);

app.use(router);
app.use(store);

app.mixin({
    data() {
      return {
          listOfRoutes: router.options.routes
      }
    },
    methods: {
        router(path) {
            this.$router.push(path);
        }
    }
})

app.mount("#app");