import PropTypes from 'prop-types';

const RoomList = ({
  rooms, joinRoom,
}) => {
  return (
    <div className="roomList">
      <h3>Rooms</h3>
      {Object.keys(rooms).map((room) => {
        const {
          roomName, players, maxPlayers, gameVersion, started,
        } = rooms[room];
        return (
          <div
            key={room}
            className="room"
            onClick={() => joinRoom(roomName)}
            aria-hidden="true"
          >
            <span>{`${roomName} [${players.length}/${maxPlayers}] (${gameVersion})`}</span>
          </div>
        );
      })}
      <style jsx>
        {`
          .roomList {
            display: flex;
            flex-direction: column;
            border: 1px solid black;
            width: 300px;
          }
          .room {
            border: 1px solid black;
            background-color: pink;
          }
        `}
      </style>
    </div>
  );
};

RoomList.propTypes = {
  rooms: PropTypes.shape({
    roomName: PropTypes.string,
    players: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    numberOfPlayers: PropTypes.number,
    started: PropTypes.bool,
  }).isRequired,
  joinRoom: PropTypes.func.isRequired,
};

export default RoomList;
