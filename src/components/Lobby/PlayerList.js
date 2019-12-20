import PropTypes from 'prop-types';

const PlayerList = ({
  players,
}) => {
  return (
    <>
      <h3>Players</h3>
      {Object.keys(players).map((player) => {
        return (
          <div key={players[player].socketId}>
            <span>
              {`${players[player].username} - ${players[player].state}`}
            </span>
          </div>
        );
      })}
    </>
  );
};

PlayerList.propTypes = {
  players: PropTypes.shape({}).isRequired,
};

export default PlayerList;
