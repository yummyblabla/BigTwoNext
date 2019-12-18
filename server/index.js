import gameListeners from './socketio/gameListeners';
import lobbyListeners from './socketio/lobbyListeners';

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');


const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextAppHandler = nextApp.getRequestHandler();


const port = 3000;

const clients = {};
const rooms = {};

const lobby = io.of('/lobby');
const game = io.of('/game');

lobby.on('connection', (socket) => {
  lobbyListeners(lobby, socket, rooms, clients);
  console.log('someone connected');
});

game.on('connection', (socket) => {
  console.log(socket.id);
  socket.emit('test', {
    message: 'hi',
  });
  gameListeners(socket);
  // console.log(io.sockets.clients());
  // console.log(io.sockets.adapter.rooms);
});

io.on('connection', (socket) => {
  console.log(lobby.adapter.rooms);
});

nextApp.prepare().then(() => {
  app.get('*', (req, res) => nextAppHandler(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Listening on port ${port}`);
  });
});
