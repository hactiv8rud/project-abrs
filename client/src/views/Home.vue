<template>
  <div v-if="!end" class="container">
    <!-- <div>
    <Win></Win>
    <Lose></Lose>
    </div> -->
    <form @submit.prevent="generateResponse" id="submission">
      <img :src="question.image" alt="">
      <p>{{ question.product }}</p>
      <p>Rp {{ question.price }}</p>
      <input
        v-model="response"
        id="response"
        type="text"
        autocomplete="off"
      />
    </form>
    <h1>SCORE</h1>
    <div v-for="(player, i) in sortedPlayers" :key="i">
      {{ player.name }} : {{ player.points }}
    </div>
  </div>
  <!-- <div class="home">
    <h1>Tebak Harga</h1>
    <label for="playername">Player Name</label>
    <input type="text" v-model="name" placeholder="Type your name here" autocomplete="off">
    <form @submit.prevent="sendAnswer">
      <label for="answer">Answer</label>
      <input type="text" v-model="answer" placeholder="type your answer here" autocomplete="off">
      <input type="submit" value="Send">
    </form>

    <p v-for="(msg, i) in messages" :key="i">{{ msg.name }} : {{ msg.answer }}</p>
  </div> -->
  <Win v-else-if="isWinner"></Win>
  <Lose v-else></Lose>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import Win from '@/components/Win'
// import Lose from '@/components/Lose'
import { mapState, mapGetters } from 'vuex'
import Win from '../components/Win'
import Lose from '../components/Lose'

export default {
  name: 'Home',
  data () {
    return {
      response: ''
      // question: ''
      // messages: []
    }
  },
  components: {
    Win,
    Lose
  },
  computed: {
    ...mapState(['question', 'end', 'isWinner']),
    ...mapGetters(['sortedPlayers'])
  },
  methods: {
    // sendAnswer () {
    //   this.$socket.emit('newMessage', { answer: this.answer, name: this.name })
    //   this.messages.push({ answer: this.answer, name: this.name })
    //   console.log(this.messages)
    //   this.answer = ''
    // },
    generateResponse () {
      if (this.response) {
        this.$socket.emit('response', this.response)
      }
      this.response = ''
    }
  },
  created () {
    if (this.$store.state.players.length === 0) {
      this.$router.push('/')
    }
  }
}
</script>

<style>
  img {
    width: 600px;
  }
</style>
