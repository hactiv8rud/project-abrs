<template>
  <div class="home">
    <h1>Tebak Harga</h1>
    <label for="playername">Player Name</label>
    <input type="text" vmodel="name" placeholder="Type your name here" autocomplete="off">
    <form @submit.prevent="sendAnswer">
      <label for="answer">Answer</label>
      <input type="text" v-model="answer" placeholder="type your answer here" autocomplete="off">
      <input type="submit" value="Send">
    </form>

    <p v-for="(msg, i) in messages" :key="i">{{ msg.name }} : {{ msg.answer }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data () {
    return {
      name: '',
      answer: ''
    }
  },
  computed: {
    answers () {
      return this.$store.state.messages
    }
  },
  methods: {
    sendAnswer () {
      this.$socket.emit('newAnswer', { answer: this.answer, name: this.name })
      this.messages.push({ answer: this.answer, name: this.name })
      this.answer = ''
    }
  }
}
</script>
