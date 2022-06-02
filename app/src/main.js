import App from "./App.js";
import router from "./router/index.js"

const app = Vue.createApp(App);

app.use(router);

app.mount("#app");