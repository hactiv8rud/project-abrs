import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages: [],
    question: ''
  },
  mutations: {
    SOCKET_init (state, payload) {
      state.messages.push(payload)
    },
    SOCKET_SERVER_MESSAGE (state, payload) {
      console.log(payload)
      state.messages.push(payload)
    },
    SOCKET_QUESTION (state, payload) {
      console.log(payload)
      state.question = payload
      console.log(state.question)
    }
  },
  actions: {
  },
  modules: {
  }
})
