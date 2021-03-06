const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const io = require('socket.io')(http);
const path = require('path');
const { newGame, gameHandler } = require('./gameService/gameHandlers.js')

// app.get('/', (req, res) => {
//   res.sendFile('/Users/grample/Desktop/repos/Social-Game-Night/client/public/chat.html');
// });

app.use(express.static(path.join(__dirname, '..', 'client', 'public')));
var count = 0;
var connectedUsers = [];

io.on('connection', (socket) => {
  // console.log('user connected');
  if (count === 0) {
    console.log('Host is set')
    count += 1;
    setTimeout(() => {
      io.emit('set host')
    }, 1000)
  }

  socket.on('chat message', (msg, room) => {
    console.log('emitting message', msg)
    // io.to(room).emit('chat message', msg);
    io.emit('chat message', msg);
  });
  //when the server gets a 'game action' message, it will send the given obj to be processed by a game logic handler in the handlers file
  //it will always only return a game object

  socket.on('game action', (msg) => {
    msg2 = JSON.parse(msg);
    if (msg2.action === 'judge selection') {

      if (msg2.game.gameState.judgeIndex === msg2.game.users.length + 1) {
        io.emit('game over');
      } else {
        console.log('emitting next round')
        io.emit('next round', '');
      }
    }
    io.emit('game action', JSON.stringify(gameHandler(msg)))
  })

  socket.on('new game', (msg) => {
    console.log('new game');
    io.emit('new game', JSON.stringify(newGame(msg)))
  })

  socket.on('next round', () => {
    console.log('i heard theres a new round - index')
    io.emit('next round', '');
  })

  socket.on('join game', (msg) => {
    console.log('A player is joining the game...', msg);
    msg = JSON.parse(msg);
    connectedUsers.push(msg.user);
    console.log('Connected users have been updated... ', connectedUsers);
    io.emit('update connected users', JSON.stringify(connectedUsers));
    io.emit('join game');
  })

  socket.on('disconnect', (msg) => {
    console.log('user disconnected, requesting current users...');
    connectedUsers = [];
    io.emit('player disconnected');
    io.emit('request current users');
  });

  socket.on('rebuild current users', (msg)=>{
    msg = JSON.parse(msg);
    console.log('msg', msg);
    var flag = true;
    if (msg !== null) {
      connectedUsers.forEach((user, index)=>{
        if (user !== null) {
          if (user.UID === msg.UID) {
            flag=false
          }
        }
      });
      if (flag) {
        connectedUsers.push(msg)
        io.emit('update connected users2', JSON.stringify(connectedUsers))
        io.emit('host change', JSON.stringify(connectedUsers[0]))
      }
    }
  })

  // socket.on('update connected users', (msg)=>{
  //   console.log('Updating connected users...', msg)
  //   io.emit('update connected users', msg)
  // })

  // socket.on('join game', (msg) => {
  //   //see who joined
  //   //add the person to connected users array
  //   //io emit connected users
  // })

  //to join a new room, we will need to have a username and room
  //user can come from the react context and the room will have to be explicitly declared in a text box or something.
  socket.on('joinRoom', ({ user, room }) => {
    socket.join(room);
    socket.broadcast.to(room).emit('chat message', { user: user, text: `${user} has joined the party` })
  })
});

// This will emit the event to all connected sockets
// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

http.listen(3001, () => {
  console.log('listening on *:3001');
});
