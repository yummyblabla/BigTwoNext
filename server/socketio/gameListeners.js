/* eslint-disable no-param-reassign */

import Game from '../../modules/Game';

export default function gameListeners(lobby, socket, rooms, clients, games) {


  socket.on('creategame', ({}) => {
    games['game'] = new Game();
    console.log(games);
  });

  socket.on('getGame', ({ roomName }) => {
    socket.emit('setGame', {
      game: games[roomName],
    });
  });

  socket.on('getCards', ({}) => {
    console.log('hi')
  })
}
