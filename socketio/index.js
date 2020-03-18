// import gameListeners from './listeners/gameListeners';
// import lobbyListeners from './listeners/lobbyListeners';

const app = require('express')();
const server = require('http').Server(app);
const cors = require('cors');
const io = require('socket.io')(server, {
  pingTimeout: 60000,
});

const port = 8000;

const usernames = {};
const clients = {};
const rooms = {};
const games = {};

const lobby = io.to('/lobby');

io.on('connection', (socket) => {
  // lobbyListeners(lobby, socket, io, rooms, clients, usernames, games);
  // gameListeners(lobby, socket, io, rooms, clients, games);
  console.log('someone connected');

  /**
   * User Disconnect Handler.
   */
  socket.on('disconnect', () => {
    console.log('someone disconnected');
    const player = clients[socket.id];
    if (player) {
      const playerName = player.getUsername();
      delete usernames[playerName];

      if (player.checkIfInRoom()) {
        const roomName = player.getRoom();

        // Remove player from room
        const room = rooms[roomName];
        if (room) {
          room.removePlayer(player);

          if (room.checkIfEmpty()) {
            delete rooms[roomName];
          } else {
            lobby.to(`room-${roomName}`).emit('updateCurrentRoom', {
              room,
            });
          }
          lobby.emit('getRoomList', {
            rooms,
          });
        }

        // Remove player from game
        const currentGame = games[roomName];
        if (currentGame) {
          currentGame.removePlayer(player);

          if (currentGame.checkIfEmpty()) {
            delete games[roomName];
          } else {
            // TODO: handle last player logic
            io.to(`room-${roomName}`).emit('playerLeft', {
              username: playerName,
            });
            // Adjust turn
            if (currentGame.getPlayerTurn() === playerName) {
              currentGame.goToNextTurn();
              io.to(`room-${roomName}`).emit('cardsPlayed', {
                cards: [],
                passed: true,
                username: playerName,
                nextPlayer: currentGame.getPlayerTurn(),
              });
            }
          }
        }
      }
    }

    delete clients[socket.id];
    lobby.emit('getLobbyList', {
      clients,
    });
  });
});

app.use(cors());

app.get('/api/checkUserTaken', (req, res) => {
  const { username } = req.query;
  let found = false;
  let message = '';
  if (username.length < 1) {
    found = true;
    message = 'Username too short. Choose another one.';
  } else if (username.length > 8) {
    found = true;
    message = 'Username too long. Choose another one.';
  } else if (usernames[username]) {
    found = true;
    message = 'Username taken. Choose another one.';
  }
  return res.status(200).json({
    userTaken: found,
    message,
  });
});

app.get('/api/connectAsGuest', (req, res) => {
  let randomInteger = Math.floor(Math.random() * 9999);
  let username = `Guest_${randomInteger}`;
  while (usernames[username]) {
    randomInteger = Math.floor(Math.random() * 9999);
    username = `Guest_${randomInteger}`;
  }
  return res.status(200).json({
    username,
  });
});

server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Listening on port ${port}`);
});
