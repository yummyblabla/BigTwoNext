import PropTypes from 'prop-types';

const RoomList = ({
  rooms,
}) => {
  return (
    <>
      <h3>Rooms</h3>
      {Object.keys(rooms).map((room) => {
        return (
          <div>
            {rooms[room].roomName}
          </div>
        );
      })}
    </>
  );
};

RoomList.propTypes = {
  rooms: PropTypes.shape({}).isRequired,
};

export default RoomList;
