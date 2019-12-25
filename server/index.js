import gameListeners from './socketio/gameListeners';
import lobbyListeners from './socketio/lobbyListeners';
import Game from '../modules/Game';

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  pingTimeout: 60000,
});
const next = require('next');


const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextAppHandler = nextApp.getRequestHandler();

const port = 3000;

const clients = {};
const rooms = {};
const games = { game: new Game() };

const lobby = io.to('/lobby');

io.on('connection', (socket) => {
  socket.join('/lobby');
  lobbyListeners(lobby, socket, io, rooms, clients, games);
  gameListeners(lobby, socket, rooms, clients, games);
  console.log('someone connected');
});

nextApp.prepare().then(() => {
  app.get('*', (req, res) => nextAppHandler(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Listening on port ${port}`);
  });
});
