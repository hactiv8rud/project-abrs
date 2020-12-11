const express = require('express');
const { get } = require('https');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3000

let usedQuestions = [] 

const rawQuestions = [
  {             
      "product": "watch",
      "image": "https://www.pngpix.com/wp-content/uploads/2016/03/Watch-PNG-image.png",
      "price": "9?75000",
      "answer": ""
    },
    {             
      "product": "shoes",
      "image": "https://images-na.ssl-images-amazon.com/images/I/81QnGdrGwsL._UL1500_.jpg",
      "price": "21?000",
      "answer": ""
  },
  {             
    "product": "smartphone",
    "image": "https://pngimg.com/uploads/smartphone/smartphone_PNG8536.png",
    "price": "3?00000",
    "answer": ""
  },
  {             
    "product": "guitar",
      "image": "https://cdn.pixabay.com/photo/2014/04/02/10/55/guitar-304933_1280.png",
      "price": "1?00000",
      "answer": ""
    },
    {             
      "product": "jewellery",
      "image": "https://www.pngkey.com/png/full/153-1538233_free-png-gold-jewelry-png-images-transparent-jewellery.png",
      "price": "45?0000",
      "answer": ""
  },
  {             
      "product": "headphone",
      "image": "https://pngimg.com/uploads/headphones/headphones_PNG7640.png",
      "price": "55?000",
      "answer": ""
  },
  {             
      "product": "bag",
      "image": "https://www.pngpix.com/wp-content/uploads/2016/07/PNGPIX-COM-Travel-Bag-PNG-Transparent-Image.png",
      "price": "35?000",
      "answer": ""
  },
  {             
      "product": "laptop",
      "image": "https://www.pngpix.com/wp-content/uploads/2016/04/Laptop-PNG-Image2.png",
      "price": "10990?00",
      "answer": ""
  },
  {             
      "product": "jersey",
      "image": "https://i5.walmartimages.com/asr/6888e434-5844-448d-9b8e-86a91b14d6a7_1.bb3869d3d6aa0e316237574722facfd0.png?odnWidth=450&odnHeight=450&odnBg=ffffff",
      "price": "55?000",
      "answer": ""
  },
  {             
      "product": "rugby",
      "image": "https://assets.stickpng.com/images/580b585b2edbce24c47b2b6d.png",
      "price": "19??000",
      "answer": ""
  }
]



const messages = [
  {
    name: 'Admin',
    message: 'Welcome to Wasap'
  }
]

let players = []

let question = generateQuestion()

// function createQuestion() {
//   const num1 = getRandomNumber()
//   const num2 = getRandomNumber()
//   const op = '*'
//   const bingoBanget =  `${num1} ${op} ${num2}`
//   return {
//     q: `${num1} ${op} ${num2}`,
//     a: eval(bingoBanget)
//   }
// }


function generateQuestion() {
  // generateAnswer()
  let random;
  do {
    random = Math.floor(Math.random() * rawQuestions.length)
    usedQuestions.push(random)
    let obj = rawQuestions[random]
    return obj
  }
  while (!usedQuestions.includes(random));
  
}

function generateAnswer() {
  rawQuestions.map(question => {
    console.log(question, '<<<<<<<<<<');
    question.answer = ''
    // let temp = question.price
    for (let i = 0; i < question.price.length; i++) {
      // let newAnswer = ''
      if (question.price[i] !== '?') {
        question.answer += question.price[i]
      } else {
        question.answer += Math.floor(Math.random() * 10)
      }
      
    }
  })
  console.log(rawQuestions);
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10)
}

generateAnswer()

io.on('connect', function(socket) {
  console.log('Socket.io client connected');
  socket.emit('init', messages);
  socket.on('user_joined', (name) => {
    const player = {
      id: socket.id,
      name,
      points: 0
    }

    // generateAnswer()
    players.push(player)

    // console.log(players);
    // console.log(question.q);
    console.log(name, 'is now connected');
    // question = createQuestion()
    
    io.emit('QUESTION', question)
    io.emit('SCORE', players)
    socket.emit('TOHOME')
    console.log(question, 'xxxxxxxxxxxxxxxxxx')
  })

  socket.on('disconnect', payload => {
    players = players.filter(element => {
      if (element.id !== socket.id) {
        return element
      }
    })
  }) 

  // socket.on('newMessage', function(payload) {
  //   console.log(payload);
  //   messages.push(payload);
  //   socket.broadcast.emit('SERVER_MESSAGE', payload);
  // })
  socket.on('response', response => {
    // if (response === ) {
      
      // }
      // socket.emit('QUESTION', rawQuestions[0])
      // console.log(rawQuestions);
      
      // console.log(+response, '<<<<');
      // console.log(question.a);
      // console.log(question.answer);

      if (response === question.answer) {
        question = generateQuestion()
        io.emit('QUESTION', question)
        console.log(question, 'xxxxxxxxxxxxxxxxxxxxxxxx')
        // console.log(usedQuestions.length);
      // question = createQuestion()
    
      increasePoints(socket.id)
      // console.log(players);
      io.emit('SCORE', players)
      
      if (usedQuestions.length === 3) {
        usedQuestions.length = 0
        // players.sort((a, b) => b.points - a.points)
        console.log(players, "ppppppppppppppp");
        // const winner = players[0]
        io.emit('END', true)
        for (let i = 0; i < players.length; i++) {
          if (i === 0) {
            io.to(players[i].id).emit("IS_WINNER", true)
          } else {
            io.to(players[i].id).emit("IS_WINNER", false)
          }
        }
        players.length = 0
      }

    }
  })

  // socket.on('login', _ => {
  //   socket.emit("login")
  //   // io.emit('QUESTION', question)
  //   // io.emit('SCORE', players)

  // })

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