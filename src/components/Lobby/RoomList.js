import PropTypes from 'prop-types';

const RoomList = ({
  rooms,
}) => {
  return (
    <>
      <h3>Rooms</h3>
      {Object.keys(rooms).map((room) => {
        const { roomName, players, numberOfPlayers } = rooms[room];
        return (
          <div key={room} className="room" onClick={() => {}} aria-hidden="true">
            <span>{`${roomName} [${players.length}/${numberOfPlayers}]`}</span>
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
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      roomName: PropTypes.string,
      players: PropTypes.arrayOf(
        PropTypes.shape({}),
      ),
      numberOfPlayers: PropTypes.number,
    }),
  ).isRequired,
};

export default RoomList;
