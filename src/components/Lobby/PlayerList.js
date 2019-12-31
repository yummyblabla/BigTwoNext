import PropTypes from 'prop-types';

const PlayerList = ({
  players,
}) => {
  return (
    <div className="playerList">
      <h3>Players</h3>
      {Object.keys(players).map((player) => (
        <div key={players[player].socketId}>
          <span>
            {`${players[player].username} - ${players[player].state}`}
          </span>
        </div>
      ))}
      <style jsx>
        {`
          .playerList {
            display: flex;
            flex-direction: column;
            border: 1px solid black;
            width: 300px;
          }
        `}
      </style>
    </div>
  );
};

PlayerList.propTypes = {
  players: PropTypes.shape({}).isRequired,
};

export default PlayerList;
