import { useEffect } from 'react';
import PropTypes from 'prop-types';

import SmallModalHOC from '../HOC/SmallModalHOC';

const IndexErrorModal = ({
  setModalOpen, errorModal, setErrorModal, errorMessage, setErrorMessage,
}) => {
  useEffect(() => {
    setModalOpen(errorModal);
  }, [errorModal]);

  const handleCloseModal = () => {
    setModalOpen(false);
    setErrorModal(false);
    setTimeout(() => {
      setErrorMessage('');
    }, 300);
  };

  return (
    <div className="content">
      <button className="closeButton" type="button" onClick={handleCloseModal}>
        Close
      </button>
      <h1>Attention!</h1>
      <p>
        {errorMessage}
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

IndexErrorModal.propTypes = {
  setModalOpen: PropTypes.func.isRequired,
  errorModal: PropTypes.bool.isRequired,
  setErrorModal: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

export default SmallModalHOC(IndexErrorModal);
