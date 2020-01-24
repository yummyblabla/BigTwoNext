import PropTypes from 'prop-types';
import * as Color from '../../constants/colors';

const LobbyHeader = ({
  username, disconnect,
}) => (
  <div className="container">
    <h3 className="text">Big Two Lobby</h3>
    <div className="dropdown">
      <span className="text">{username}</span>
      <div className="dropdown-content">
        <button type="button" className="dropdown-button text">View Profile (doesn't work)</button>
        <button type="button" className="dropdown-button text" onClick={disconnect}>Log out</button>
      </div>
    </div>

    <style jsx>
      {`
        .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          background-color: ${Color.DARK_ONE};
        }
        .text {
          color: ${Color.DARK_FOUR};
        }
        .dropdown {
          position: relative;
          display: inline-block;
        }
        .dropdown-content {
          display: none;
          position: absolute;
          min-width: 160px;
          z-index: 1;
          right: -10px;
          border: 1px solid black;
        }
        .dropdown:hover .dropdown-content {
          display: flex;
          flex-direction: column;
        }

        .dropdown-button {
          background-color: ${Color.DARK_ONE};
          border: none;
          cursor: pointer;
        }
        .dropdown-button:hover {
          background-color: ${Color.DARK_THREE};
        }
      `}
    </style>
  </div>
);

LobbyHeader.propTypes = {
  username: PropTypes.string.isRequired,
  disconnect: PropTypes.func.isRequired,
};

export default LobbyHeader;
