import PropTypes from 'prop-types';
import variables from '../../styles.scss';

const LobbyHeader = ({
  username, disconnect,
}) => (
  <div className="flex-row align-center justify-space-between padding-left-20 padding-right-20 background-dark-two">
    <h3 className="color-dark-four">Big Two Lobby</h3>
    <div className="dropdown">
      <span className="color-dark-four">{username}</span>
      <div className="dropdown-content">
        <button type="button" className="dropdown-button color-dark-four">View Profile (doesn't work)</button>
        <button type="button" className="dropdown-button color-dark-four" onClick={disconnect}>Log out</button>
      </div>
    </div>

    <style jsx>
      {`
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
          background-color: ${variables.dark_two_color};
        }
        .dropdown-button:hover {
          background-color: ${variables.dark_three_color};
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
