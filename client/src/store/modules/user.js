export default {
  namespaced: true,
  state: () => ({
    user: {
      authorized: false,
      token: '',
    }
  }),
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    updateUser(state, payload) {
      state.user = { ...state.user, ...payload };
    },
  },
};