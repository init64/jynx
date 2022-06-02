import App from "./App.js";
import router from "./router/index.js"



const app = Vue.createApp(App);

app.use(router);

app.use(VueRouter);

app.mixin({
    data() {
      return {
          listOfRoutes: router.options.routes.filter(item => !item?.meta?.hide),
          user: {
              authorizated: false
          }
      }
    },
    methods: {
        router(path) {
            this.$router.push(path);
        }
    }
})

app.mount("#app");