import PropTypes from 'prop-types';
import * as Color from '../../constants/colors';

const RoomList = ({
  rooms, joinRoom,
}) => {
  return (
    <div className="roomList">
      <h3 className="title">{`Rooms (${Object.keys(rooms).length})`}</h3>
      <div className="list">
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
              <span className="roomInfo">
                {`${roomName} [${players.length}/${maxPlayers}] (${gameVersion})${started ? '[Started]' : ''}`}
              </span>
            </div>
          );
        })}
      </div>

      <style jsx>
        {`
          .roomList {
            display: flex;
            flex-direction: column;
            border: 1px solid black;
            min-width: 300px;
            width: 300px;
            max-width: 300px;
            background-color: #fff;
          }
          .title {
            margin-left: 10px;
          }
          .list {
            overflow-y: auto;
            max-height: 80vh;
          }
          .room {
            border: 1px solid black;
            background-color: ${Color.LIGHT_PURPLE};
            margin: 5px;
            padding: 5px;
            cursor: pointer;
          }
          .room:hover {
            background-color: ${Color.PURPLE};
          }
          .roomInfo {
            color: ${Color.COMPLEMENT_TEXT};
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
