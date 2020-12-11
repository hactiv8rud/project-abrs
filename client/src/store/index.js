import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages: [],
    question: {},
    players: [],
    end: false,
    winner: {}
  },
  mutations: {
    SOCKET_init (state, payload) {
      state.messages.push(payload)
    },
    SOCKET_SERVER_MESSAGE (state, payload) {
      // console.log(payload)
      state.messages.push(payload)
    },
    SOCKET_QUESTION (state, payload) {
      // console.log(payload)
      state.question = payload
      console.log(state.question)
    },
    SOCKET_SCORE (state, payload) {
      // console.log(payload)
      state.players = payload
      // console.log(state.question)
    },
    SOCKET_END (state, payload) {
      console.log(payload)
      // state.winner = true
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    sortedPlayers (state) {
      return state.players.sort((a, b) => b.points - a.points)
    }
  }
})
