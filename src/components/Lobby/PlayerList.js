import PropTypes from 'prop-types';

const PlayerList = ({
  players,
}) => {
  return (
    <div className="background-dark-two border-radius-10 border-black flex-column playerList">
      <h3 className="padding-left-20 color-dark-four">{`Players (${Object.keys(players).length})`}</h3>
      <div className="overflow-y list">
        {Object.keys(players).map((player) => (
          <div
            key={players[player].socketId}
            className="border-black background-dark-one margin-5 padding-5 player"
          >
            <span className="color-dark-four">
              {`${players[player].username} - ${players[player].state}`}
            </span>
          </div>
        ))}
      </div>

      <style jsx>
        {`
          .playerList {
            width: 300px;
          }
          .list {
            max-height: 80vh;
          }
          .player {
            cursor: pointer;
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
