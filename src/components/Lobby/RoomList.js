import PropTypes from 'prop-types';
import variables from '../../styles.scss';

const RoomList = ({
  rooms, joinRoom,
}) => {
  return (
    <div className="flex-column border-black background-dark-two border-radius-10 roomList">
      <h3 className="padding-left-20 color-dark-four">{`Rooms (${Object.keys(rooms).length})`}</h3>
      <div className="list overflow-y">
        {Object.keys(rooms).map((room) => {
          const {
            roomName, players, maxPlayers, gameVersion, started,
          } = rooms[room];
          return (
            <div
              key={room}
              className="border-black margin-5 padding-5 background-dark-one room"
              onClick={() => joinRoom(roomName)}
              aria-hidden="true"
            >
              <span className="color-dark-four">
                {`${roomName} [${players.length}/${maxPlayers}] (${gameVersion})${started ? '[Started]' : ''}`}
              </span>
            </div>
          );
        })}
      </div>

      <style jsx>
        {`
          .roomList {
            min-width: 300px;
            width: 300px;
            max-width: 300px;
          }
          .list {
            max-height: 80vh;
          }
          .room {
            background-color: ${variables.dark_one_color};
            cursor: pointer;
          }
          .room:hover {
            background-color: ${variables.dark_three_color};
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
