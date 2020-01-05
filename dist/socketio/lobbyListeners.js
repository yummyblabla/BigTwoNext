"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = lobbyListeners;

var _Constants = require("../modules/Helpers/Constants");

var _Room = _interopRequireDefault(require("../modules/Room"));

var _Player = _interopRequireDefault(require("../modules/Player"));

var _Game = _interopRequireDefault(require("../modules/Game"));

/* eslint-disable no-param-reassign */
function lobbyListeners(lobby, socket, io, rooms, clients, usernames, games) {
  /**
   * User Join Lobby.
   */
  socket.on('userJoinLobby', function (_ref) {
    var username = _ref.username;
    socket.join('/lobby');

    if (username in clients) {
      return;
    }

    usernames[username] = true;
    clients[socket.id] = new _Player["default"](username, socket.id); // Send lobby update of new lobby list

    lobby.emit('getLobbyList', {
      clients: clients
    }); // Send socket room list

    socket.emit('getRoomList', {
      rooms: rooms
    });
  });
  /**
   * Creating Room Handler.
   */

  socket.on('userCreateRoom', function (_ref2) {
    var roomName = _ref2.roomName,
        maxPlayers = _ref2.maxPlayers,
        gameVersion = _ref2.gameVersion;

    if (rooms.hasOwnProperty(roomName)) {
      socket.emit('createRoomError', {
        message: 'Duplicate room name exists.'
      });
      return;
    }

    var player = clients[socket.id];
    rooms[roomName] = new _Room["default"](roomName, maxPlayers, gameVersion, player); // Join socket room

    socket.join("room-".concat(roomName));
    player.joinRoom(roomName); // Send create room success message

    socket.emit('createRoomSuccess', {}); // TODO: may bundle with createRoom success
    // Send join room success message

    socket.emit('joinRoomSuccess', {
      room: rooms[roomName]
    }); // Send lobby update about player update

    lobby.emit('updatePlayerStatus', {
      socketId: socket.id,
      state: _Constants.USER_IN_ROOM_STATE
    }); // Lobby gets new Room List.

    lobby.emit('getRoomList', {
      rooms: rooms
    });
  });
  /**
   * User Disconnect Handler.
   */

  socket.on('disconnect', function () {
    console.log('someone disconnected');
    var player = clients[socket.id];

    if (player && player.checkIfInRoom()) {
      var roomName = player.getRoom();
      var room = rooms[roomName];

      if (room) {
        room.removePlayer(player);

        if (room.checkIfEmpty()) {
          delete rooms[roomName];
          lobby.emit('getRoomList', {
            rooms: rooms
          });
        }

        delete usernames[player.getUsername()];
      }
    }

    delete clients[socket.id];
    lobby.emit('getLobbyList', {
      clients: clients
    });
  });
  /**
   * Handles user attempt to join room.
   */

  socket.on('userJoinRoom', function (_ref3) {
    var roomName = _ref3.roomName;

    if (!rooms.hasOwnProperty(roomName)) {
      socket.emit('joinRoomError', {
        message: 'Room does not exist.'
      });
      return;
    }

    var room = rooms[roomName];
    var player = clients[socket.id];

    if (room.checkIfStarted()) {
      socket.emit('joinRoomError', {
        message: 'Room already started.'
      });
      return;
    }

    if (room.checkIfFull()) {
      socket.emit('joinRoomError', {
        message: 'Room is full.'
      });
      return;
    }

    if (player.checkIfInRoom()) {
      socket.emit('joinRoomError', {
        message: 'You are already in a room.'
      });
    }

    room.addPlayer(player);
    player.joinRoom(roomName); // Join socket room

    socket.join("room-".concat(roomName)); // Send join room success message

    socket.emit('joinRoomSuccess', {
      room: room
    }); // Send lobby update about player in room

    lobby.emit('updatePlayerStatus', {
      socketId: socket.id,
      state: _Constants.USER_IN_ROOM_STATE
    }); // Send lobby update about room update

    lobby.emit('updateRoomStatus', {
      room: room
    }); // Send players in room update about room update
    // TODO: This may be redundant
    // if we can bundle with updateRoomStatus and handle check on clientside

    lobby.to("room-".concat(roomName)).emit('updateCurrentRoom', {
      room: room
    });
  });
  /**
   * Handles user leaving room.
   */

  socket.on('userLeaveRoom', function (_ref4) {
    var roomName = _ref4.roomName;
    var room = rooms[roomName];
    var player = clients[socket.id];
    room.removePlayer(player);

    if (room.checkIfEmpty()) {
      delete rooms[roomName]; // Send lobby update about new list of rooms

      lobby.emit('getRoomList', {
        rooms: rooms
      });
    } else {
      // Send lobby update about room update
      lobby.emit('updateRoomStatus', {
        room: room
      });
    } // Leave socket room


    socket.leave("room-".concat(roomName)); // Send leave room success message

    socket.emit('leaveRoomSuccess', {}); // Send lobby update about player update

    lobby.emit('updatePlayerStatus', {
      socketId: socket.id,
      state: _Constants.USER_LOBBY_STATE
    });
  });
  socket.on('startGame', function (_ref5) {
    var roomName = _ref5.roomName;
    var player = clients[socket.id];
    var room = rooms[roomName];

    if (room.hostName !== player.username) {
      return;
    }

    if (!room.checkCanStart()) {
      socket.emit('startGameError', {
        message: 'Not enough players to start.'
      }); // return;
    }

    games[roomName] = new _Game["default"](roomName, room.getPlayers(), room.getVersion());
    lobby.to("room-".concat(roomName)).emit('startGameSuccess', {});
    lobby["in"]("room-".concat(roomName)).clients(function (error, socketIds) {
      if (error) throw error;
      socketIds.forEach(function (socketId) {
        var currSocket = io.sockets.connected[socketId];
        currSocket.leave('/lobby');
        lobby.emit('updatePlayerStatus', {
          socketId: socketId,
          state: _Constants.USER_IN_GAME_STATE
        });
      });
    });
  });
}