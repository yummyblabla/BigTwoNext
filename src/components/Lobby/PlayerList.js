import PropTypes from 'prop-types';
import * as Color from '../../constants/colors';

const PlayerList = ({
  players,
}) => {
  return (
    <div className="playerList">
      <h3 className="title">{`Players (${Object.keys(players).length})`}</h3>
      <div className="list">
        {Object.keys(players).map((player) => (
          <div key={players[player].socketId} className="player">
            <span className="playerInfo">
              {`${players[player].username} - ${players[player].state}`}
            </span>
          </div>
        ))}
      </div>

      <style jsx>
        {`
          .playerList {
            display: flex;
            flex-direction: column;
            border: 1px solid black;
            width: 300px;
            background-color: ${Color.DARK_TWO};
            border-radius: 10px;
          }
          .title {
            margin-left: 10px;
            color: ${Color.DARK_FOUR};
          }
          .list {
            overflow-y: auto;
            max-height: 80vh;
          }
          .player {
            border: 1px solid black;
            background-color: ${Color.DARK_ONE};
            margin: 5px;
            padding: 5px;
          }
          .playerInfo {
            color: ${Color.DARK_FOUR};
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
