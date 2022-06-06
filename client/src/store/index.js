export default Vuex.createStore({
  state: () => ({
    user: {
      authorized: false,
      token: '',
    },
    messages: [],
  }),
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setMessages(state, payload) {
      state.messages = payload;
    },
    pushMessage(state, payload) {
      state.messages.push(payload);
    },
  },
});