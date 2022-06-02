import user from "./modules/user.js";
import routes from "./modules/routes.js";

const store = Vuex.createStore({
    modules: {
        user,
    }
})

export default store;