import PropTypes from 'prop-types';

const LobbyHeader = ({
  username,
}) => (
  <div className="container">
    <h3>Big Two Lobby</h3>
    {username}
    <style jsx>
      {`
        .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      `}
    </style>
  </div>
);

LobbyHeader.propTypes = {
  username: PropTypes.string.isRequired,
};

export default LobbyHeader;
