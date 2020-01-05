"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _gameListeners = _interopRequireDefault(require("./socketio/gameListeners"));

var _lobbyListeners = _interopRequireDefault(require("./socketio/lobbyListeners"));

var app = require('express')();

var server = require('http').Server(app);

var io = require('socket.io')(server, {
  pingTimeout: 60000
});

var next = require('next');

var dev = process.env.NODE_ENV !== 'production';
var nextApp = next({
  dev: dev
});
var nextAppHandler = nextApp.getRequestHandler();
var port = 3000;
var usernames = {};
var clients = {};
var rooms = {};
var games = {};
var lobby = io.to('/lobby');
io.on('connection', function (socket) {
  (0, _lobbyListeners["default"])(lobby, socket, io, rooms, clients, usernames, games);
  (0, _gameListeners["default"])(lobby, socket, io, rooms, clients, games);
  console.log('someone connected');
});
nextApp.prepare().then(function () {
  app.get('/api/checkUserTaken', function (req, res) {
    var username = req.query.username;
    var found = false;
    var message = '';
    console.log(usernames);

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
      message: message
    });
  });
  app.get('*', function (req, res) {
    return nextAppHandler(req, res);
  });
  server.listen(port, function (err) {
    if (err) throw err;
    console.log("> Listening on port ".concat(port));
  });
});