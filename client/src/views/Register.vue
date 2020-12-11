<template>
  <section id ="register-page" class="container custom-bg">
        <div class="row justify-content-center mt-5">
            <div class="col-4">
                <div class="shadow-lg p-5 mb-5 bg-white rounded">
                    <div class="mb-5">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ--PcIPuAiSJnzvYl0nvbuptU8lGQBa4Z79Q&usqp=CAU" alt="login" class="img-fluid">
                    </div>
                    <h4 class="mb-4"><b>Enter your name to play</b></h4>
                    <form @submit.prevent="getIn">
                        <div class="form-group">
                          <input v-model="name" type="text" class="form-control" placeholder="Enter your name here">
                        </div><br>
                        <button type="submit" class="btn btn-primary btn-block">Let's play!</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      socket: undefined
    }
  },
  methods: {
    getIn () {
      if (this.name) {
        // this.socket = window.io()
        this.$socket.emit('user_joined', this.name)
        this.$router.push('/home')
      }
    }
  }
}
</script>

<style>

</style>
