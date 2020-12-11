<template>
  <div class="container">
    <form @submit.prevent="generateQuestion" id="submission">
      <h1 id="question">
        {{ question }}
      </h1>
      <input
        v-model="response"
        id="response"
        type="text"
      />
    </form>
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
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      response: ''
      // question: ''
      // messages: []
    }
  },
  computed: {
    ...mapState(['question'])
  },
  methods: {
    // sendAnswer () {
    //   this.$socket.emit('newMessage', { answer: this.answer, name: this.name })
    //   this.messages.push({ answer: this.answer, name: this.name })
    //   console.log(this.messages)
    //   this.answer = ''
    // },
    generateQuestion () {
      if (this.response) {
        this.$socket.emit('response', this.response)
      }
    }
  }
  // created () {
  //   this.$socket.on('question', question => {
  //     this.question = question
  //   })
  // }
}
</script>
