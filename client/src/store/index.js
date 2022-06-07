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
    setMessageById(state, payload) {
      state.messages[state.messages.findIndex(obj => obj.id === payload.id)] = {
        ...state.messages[state.messages.findIndex(obj => obj.id === payload.id)],
        ...payload.data,
      };
    },
    deleteMessage(state, messageId) {
      state.messages = state.messages.filter(obj => obj.id !== messageId);
    },
  },
});