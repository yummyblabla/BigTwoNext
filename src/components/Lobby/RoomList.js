import PropTypes from 'prop-types';

const RoomList = ({
  rooms, joinRoom,
}) => {
  return (
    <>
      <h3>Rooms</h3>
      {Object.keys(rooms).map((room) => {
        const { roomName, players, maxPlayers } = rooms[room];
        return (
          <div
            key={room}
            className="room"
            onClick={() => joinRoom(roomName)}
            aria-hidden="true"
          >
            <span>{`${roomName} [${players.length}/${maxPlayers}]`}</span>
          </div>
        );
      })}
      <style jsx>
        {`
          .room {
            border: 1px solid black;
          }
        `}
      </style>
    </>
  );
};

RoomList.propTypes = {
  rooms: PropTypes.shape({
    roomName: PropTypes.string,
    players: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    numberOfPlayers: PropTypes.number,
  }).isRequired,
  joinRoom: PropTypes.func.isRequired,
};

export default RoomList;
