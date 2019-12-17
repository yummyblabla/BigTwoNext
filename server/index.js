const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');

const gameListeners = require('./socketio/gameListeners');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextAppHandler = nextApp.getRequestHandler();


const port = 3000;

io.on('connection', (socket) => {
  console.log(socket.id);
  socket.emit('hello', {
    message: 'hi',
  });

  gameListeners.gameListeners(socket);
});

nextApp.prepare().then(() => {
  app.get('*', (req, res) => nextAppHandler(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Listening on port ${port}`);
  });
});
