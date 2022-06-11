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
    updateUser(state, payload) {
      state.user = { ...state.user, ...payload };
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
    deleteMessage(state, payload) {
      state.messages = state.messages.filter(obj => obj.id !== payload);
    },
    editAuthorOfMessages(state, payload) {
      state.messages = state.messages.map(message => {
        if (message.author.id === payload.author.id) {
          message.author = payload.author
        }
      })
    }
  },
});