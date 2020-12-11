import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages: [],
    question: {},
    players: [],
    end: false,
    isWinner: false
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
      state.end = payload
    },
    SOCKET_IS_WINNER (state, payload) {
      console.log(payload)
      state.isWinner = payload
    },
    SOCKET_TOHOME () {
      router.push('/home')
      console.log('hit......')
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
