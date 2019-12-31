import PropTypes from 'prop-types';

const Scoreboard = ({ score }) => {
  const usernames = Object.keys(score);
  return (
    <div>
      Scoreboard
      <div>
        {usernames.map((username) => (
          <div key={username}>
            {username}
            <ul>
              {score[username].map((s, index) => (
                <li key={`${s}-${index}`}>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

Scoreboard.propTypes = {
  score: PropTypes.shape({}).isRequired,
};

export default Scoreboard;
