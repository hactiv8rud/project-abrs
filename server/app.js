const express = require('express');
const { get } = require('https');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3000

const messages = [
  {
    name: 'Admin',
    message: 'Welcome to Wasap'
  }
]

let players = []

let question = createQuestion()

function createQuestion() {
  const num1 = getRandomNumber()
  const num2 = getRandomNumber()
  const op = '*'
  const bingoBanget =  `${num1} ${op} ${num2}`
  return {
    q: `${num1} ${op} ${num2}`,
    a: eval(bingoBanget)
  }
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10)
}

io.on('connect', function(socket) {
  console.log('Socket.io client connected');
  socket.emit('init', messages);
  socket.on('user_joined', (name) => {
    const player = {
      id: socket.id,
      name,
      points: 0
    }

    players.push(player)

    console.log(players);
    console.log(question.q);
    console.log(name, 'is now connected');
    question = createQuestion()
    socket.emit('QUESTION', question.q )
  })

  // socket.on('newMessage', function(payload) {
  //   console.log(payload);
  //   messages.push(payload);
  //   socket.broadcast.emit('SERVER_MESSAGE', payload);
  // })

  socket.on('response', response => {
    socket.emit('QUESTION', question.q )
    console.log(question);
    console.log(+response, '<<<<');
    console.log(question.a);
    if (+response === question.a) {
      question = createQuestion()
      console.log('masuk');
      increasePoints(socket.id)
    }
  })
});

function increasePoints(id) {
  players = players.map(player => {
    if (player.id === id) {
      return {
        ...player,
        points: player.points + 1
      }
    } else {
      return player
    }
  })
}

server.listen(PORT, () => {
  console.log('Listening on port: ' + PORT)
});