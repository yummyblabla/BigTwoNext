import PropTypes from 'prop-types';

const Scoreboard = ({ score }) => {
  const usernames = Object.keys(score);
  return (
    <div className="scoreboard">
      <h3>Scoreboard</h3>
      <div className="playersList">
        {usernames.map((username) => (
          <div key={username} className="player">
            <h4>{username}</h4>
            <div className="scores">
              {score[username].map((s, index) => (
                <span key={`${s}-${index}`}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <style jsx>
        {`
          .scoreboard {
            display: flex;
            flex-direction: column;
            padding: 0 10px;
            border: 1px solid black;
          }
          .playersList {
            display: flex;
            flex-direction: row;
          }
          .player {
            border: 1px solid black;
            width: 100px;
            text-align: center;
          }
          .scores {
            padding-bottom: 10px;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
};

Scoreboard.propTypes = {
  score: PropTypes.shape({}).isRequired,
};

export default Scoreboard;
