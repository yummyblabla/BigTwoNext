import { useEffect } from 'react';
import PropTypes from 'prop-types';

import SmallModalHOC from '../HOC/SmallModalHOC';

const GameModal = ({
  setModalOpen, gameModal, setGameModal, gameMessage, setGameMessage,
}) => {
  useEffect(() => {
    setModalOpen(gameModal);
  }, [gameModal]);

  const handleCloseModal = () => {
    setModalOpen(false);
    setGameModal(false);
    setTimeout(() => {
      setGameMessage('');
    }, 300);
  };

  return (
    <div className="content">
      <button className="closeButton" type="button" onClick={handleCloseModal}>
        Close
      </button>
      <h1>Attention!</h1>
      <p>
        {gameMessage}
      </p>

      <style jsx>
        {`
          .closeButton {
            position: absolute;
            z-index: 1;
            top: 10px;
            right: 20px;
            border: 1px solid black;
            padding: 5px 10px;
            font-size: 1.3rem;
            cursor: pointer;
          }
          .content {
            padding: 30px 20px;
          }
        `}
      </style>
    </div>
  );
};

GameModal.propTypes = {
  setModalOpen: PropTypes.func.isRequired,
  gameModal: PropTypes.bool.isRequired,
  setGameModal: PropTypes.func.isRequired,
  gameMessage: PropTypes.string.isRequired,
  setGameMessage: PropTypes.func.isRequired,
};

export default SmallModalHOC(GameModal);
