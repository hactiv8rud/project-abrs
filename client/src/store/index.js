import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages: []
  },
  mutations: {
    SOCKET_init (state, payload) {
      state.messages = payload
    },
    SOCKET_SERVER_MESSAGE (state, payload) {
      state.messages.push(payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
