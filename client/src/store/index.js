import user from './modules/user.js';

const store = Vuex.createStore({
  modules: {
    user,
  },
});

export default store;