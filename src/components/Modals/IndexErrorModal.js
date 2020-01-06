import { useEffect } from 'react';
import PropTypes from 'prop-types';

import ModalHOC from '../HOC/ModalHOC';

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
    <div>
      <button type="button" onClick={handleCloseModal}>
        Close Modal
      </button>
      <p>
        {errorMessage}
      </p>
    </div>
  )
};

IndexErrorModal.propTypes = {
  setModalOpen: PropTypes.func.isRequired,
  errorModal: PropTypes.bool.isRequired,
  setErrorModal: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

export default ModalHOC(IndexErrorModal);
